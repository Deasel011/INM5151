# Copyright 2015 Google Inc. All Rights Reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

# [START app]
import logging

from flask import Flask


app = Flask(__name__)


@app.route('/')
def home():
    """Return a friendly HTTP greeting."""
    return 'Smarter Fridge Back-end website\n' \
           'MOCK API\n' \
           'URL:\n' \
           '\tPOST: /snd_fact/<userid>_<image_id>\n' \
           '\n' \
           'JSON EXAMPLE:\n' \
           '{"text": "Bar Ho\n391 King Street West\nToronto, Ontario\nTel:\nCheck #: 386111\nServer: Phil\nTabie: 16\nDate: 10/21/2017\nTime: 18:59\nClient1\n:\nin us on an e\nrror me\n7.50\n13oz Fruit Helmet\n1 13oz Grimace''s Tears\n14oz Cask 1\n6.75\n2.50\n. . . on an\nerror -\nDe\n-\n-\n-\nSUB-TOTAL:\nHST:\n16.75\n2. 18\nS HE Dr S DO NOPD GOOD\nTOTAL:\n18.93\np, as more\nHST# 830210308RTO001\nFollow us on Untappd &amp; Twitter\nObarhopbar\n"}'


@app.errorhandler(500)
def server_error(e):
    logging.exception('An error occurred during a request.')
    return """
    An internal error occurred: <pre>{}</pre>
    See logs for full stacktrace.
    """.format(e), 500


if __name__ == '__main__':
    # This is used when running locally. Gunicorn is used to run the
    # application on Google App Engine. See entrypoint in app.yaml.
    app.run(host='127.0.0.1', port=8080, debug=True)
# [END app]
