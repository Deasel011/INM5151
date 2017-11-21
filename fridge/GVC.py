from google.cloud import storage

import time

from oauth2client.client import GOOGLE_APPLICATION_CREDENTIALS

class GVC:
    def __init__(self):
        client = storage.Client(credentials=GOOGLE_APPLICATION_CREDENTIALS)
        bucket = client.get_bucket('image_facture')


    def sendPicture(self,userid,picture):
        atomicTimestamp = time.time()
        filename = userid + '_' + atomicTimestamp


gvc = GVC()
gvc.client.list_buckets()