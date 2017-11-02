const config = require('./config.json');

// Get a reference to the Pub/Sub component
const pubsub = require('@google-cloud/pubsub')();
// Get a reference to the Cloud Storage component
const storage = require('@google-cloud/storage')();
// Get a reference to the Cloud Vision API component
const vision = require('@google-cloud/vision')();
// Get a reference to the Translate API component
const translate = require('@google-cloud/translate')();

const Buffer = require('safe-buffer').Buffer;

/**
 * Cloud Function triggered by Cloud Storage when a file is uploaded.
 *
 * @param {object} event The Cloud Functions event.
 * @param {object} event.data A Google Cloud Storage File object.
 */
exports.processImage = function processImage (event) {
  let file = event.data;

  return Promise.resolve()
    .then(() => {
      if (file.resourceState === 'not_exists') {
        // This was a deletion event, we don't want to process this
        return;
      }

      if (!file.bucket) {
        throw new Error('Bucket not provided. Make sure you have a "bucket" property in your request');
      }
      if (!file.name) {
        throw new Error('Filename not provided. Make sure you have a "name" property in your request');
      }

      return detectText(file.bucket, file.name);
    })
    .then(() => {
      console.log(`File ${file.name} processed.`);
    });
};

/**
 * Detects the text in an image using the Google Vision API.
 *
 * @param {string} bucketName Cloud Storage bucket name.
 * @param {string} filename Cloud Storage file name.
 * @returns {Promise}
 */
function detectText (bucketName, filename) {
  let text;

  console.log(`Looking for text in image ${filename}`);
  return vision.textDetection({ source: { imageUri: `gs://${bucketName}/${filename}` } })
    .then(([detections]) => {
      const annotation = detections.textAnnotations[0];
      text = annotation ? annotation.description : '';
      console.log(`Extracted text from image (${text.length} chars)`);
      return translate.detect(text);
    })
    .then(([detection]) => {
      if (Array.isArray(detection)) {
        detection = detection[0];
      }
      console.log(`Detected language "${detection.language}" for ${filename}`);

      // Submit a message to the bus for each language we're going to translate to
      const tasks = config.TO_LANG.map((lang) => {
        let topicName = config.TRANSLATE_TOPIC;
        if (detection.language === lang) {
          topicName = config.RESULT_TOPIC;
        }
        const messageData = {
          text: text,
          filename: filename,
          lang: lang,
          from: detection.language
        };

        return publishResult(topicName, messageData);
      });

      return Promise.all(tasks);
    });
}
/**
 * Translates text using the Google Translate API. Triggered from a message on
 * a Pub/Sub topic.
 *
 * @param {object} event The Cloud Functions event.
 * @param {object} event.data The Cloud Pub/Sub Message object.
 * @param {string} event.data.data The "data" property of the Cloud Pub/Sub
 * Message. This property will be a base64-encoded string that you must decode.
 */
exports.translateText = function translateText (event) {
  const pubsubMessage = event.data;
  const jsonStr = Buffer.from(pubsubMessage.data, 'base64').toString();
  const payload = JSON.parse(jsonStr);

  return Promise.resolve()
    .then(() => {
      if (!payload.text) {
        throw new Error('Text not provided. Make sure you have a "text" property in your request');
      }
      if (!payload.filename) {
        throw new Error('Filename not provided. Make sure you have a "filename" property in your request');
      }
      if (!payload.lang) {
        throw new Error('Language not provided. Make sure you have a "lang" property in your request');
      }

      const options = {
        from: payload.from,
        to: payload.lang
      };

      console.log(`Translating text into ${payload.lang}`);
      return translate.translate(payload.text, options);
    })
    .then(([translation]) => {
      const messageData = {
        text: translation,
        filename: payload.filename,
        lang: payload.lang
      };

      return publishResult(config.RESULT_TOPIC, messageData);
    })
    .then(() => {
      console.log(`Text translated to ${payload.lang}`);
    });
};
/**
 * Saves the data packet to a file in GCS. Triggered from a message on a Pub/Sub
 * topic.
 *
 * @param {object} event The Cloud Functions event.
 * @param {object} event.data The Cloud Pub/Sub Message object.
 * @param {string} event.data.data The "data" property of the Cloud Pub/Sub
 * Message. This property will be a base64-encoded string that you must decode.
 */
exports.saveResult = function saveResult (event) {
  const pubsubMessage = event.data;
  const jsonStr = Buffer.from(pubsubMessage.data, 'base64').toString();
  const payload = JSON.parse(jsonStr);

  return Promise.resolve()
    .then(() => {
      if (!payload.text) {
        throw new Error('Text not provided. Make sure you have a "text" property in your request');
      }
      if (!payload.filename) {
        throw new Error('Filename not provided. Make sure you have a "filename" property in your request');
      }
      if (!payload.lang) {
        throw new Error('Language not provided. Make sure you have a "lang" property in your request');
      }

      console.log(`Received request to save file ${payload.filename}`);

      const bucketName = config.RESULT_BUCKET;
      const filename = renameImageForSave(payload.filename, payload.lang);
      const file = storage.bucket(bucketName).file(filename);

      console.log(`Saving result to ${filename} in bucket ${bucketName}`);

      return file.save(payload.text);
    })
    .then(() => {
      console.log(`File saved.`);
    });
};