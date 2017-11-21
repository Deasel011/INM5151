from google.cloud import storage
import os
import time


class GVC:

    def __init__(self):
        self.client = storage.Client(project='inf5151-refrigerateur')
        self.bucket = self.client.get_bucket('image_facture')
        self.tmp_path =  os.getcwd() +'/tmp'


    def sendPicture(self,userid,picturebin64):
        atomicTimestamp = time.time()
        filename = userid + '_' + atomicTimestamp
        upload = bucket.blob(filename+'.fac')
        upload.upload_from_filename(self.tmp_path+filename+'.fac')