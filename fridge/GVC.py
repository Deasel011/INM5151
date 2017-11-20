import googleapiclient.sample_tools
import time

class GVC:
    def __init__(self):
        connection_string = 'https://<YOUR_REGION>-<YOUR_PROJECT_ID>.cloudfunctions.net/helloHttp -H "Content-Type:application/json"' +' --data ' +'''{"name":"Keyboard Cat"}'''

    def sendPicture(self,userid,picture):
        atomicTimestamp = time.time()
        data = {'data':picture
                ,'name':userid+atomicTimestamp}
