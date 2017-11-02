## Deploiement
gcloud beta functions deploy ocr-extract --stage-bucket staging_facture --trigger-bucket image_facture --entry-point processImage