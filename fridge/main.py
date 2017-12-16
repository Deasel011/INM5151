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
import base64
import logging
import psycopg2
import json


from flask import Flask
from flask import request
from flask import Response

from google.cloud import storage
import os
import time
import datetime

TEST_USER = 0

class GVC:

    def __init__(self):
        self.client = storage.Client(project='inf5151-refrigerateur')
        self.bucket = self.client.get_bucket('image_facture')
        self.tmp_path =  os.getcwd() +'/tmp/'


    def sendPicture(self,userid,picturebin64):
        atomicTimestamp = time.time()
        filename = userid + '_' + str(atomicTimestamp)

        with open(self.tmp_path+filename+'.jpg', 'wb') as fh:
           fh.write(picturebin64)

        upload = self.bucket.blob(filename+'.jpg')
        upload.upload_from_filename(self.tmp_path+filename+'.jpg')

        os.remove(self.tmp_path+filename+'.jpg')

        return 'no error'


class GSQL:
    def __init__(self):
        self.conn = psycopg2.connect(dbname='sf', user='postgres',password='postgres',host='35.194.89.41', port='5432')

    def select_cat_produits(self):
        cur = self.conn.cursor()
        cur.execute("""Select id_categorie_produit, nom from CategorieProduit""")
        rows = cur.fetchall()
        for row in rows:
            print(str(row[0])+' '+str(row[1]))
        cur.close()

    def insert_produit_inventorie(self, userid, productid,quantity):
        created_date = datetime.datetime.now()
        modified_date = created_date
        print(modified_date)

    def insert_code_modif(self,code, description):
        cur = self.conn.cursor()
        cur.execute("insert into CodeModification (code_modification, description_modification) values (%s,%s)",(code,description))
        cur.close()

    def select_inventaire_usager(self, userid):
        cur = self.conn.cursor()
        cur.execute("select nom, quantite from v_inventaire where code_usager = %s",(TEST_USER,))
        rows = cur.fetchall()
        product_dict = []
        for row in rows:
            product_dict.append({"nom":row[0],"quantite":row[1]})
        cur.close()
        return product_dict

    def select_recettes_usager(self, userid):
        cur = self.conn.cursor()
        cur.execute("select nom from v_recette_disponible where code_usager = %s",(TEST_USER,))
        rows = cur.fetchall()
        product_dict = []
        for row in rows:
            product_dict.append({"nom":row[0]})
        cur.close()
        return product_dict

    def insert_produit_codebarre_usager(self, userid,code_barre):
        product_cur = self.conn.cursor()
        product_cur.execute("select id_produit_inventorie, quantite from ProduitInventorie where code_barre = %s::bigint ",(code_barre,))
        rows = product_cur.fetchall()
        id = None
        quant = None
        for row in rows:
            id = row[0]
            quant = row[1]
        product_cur.close()
        cur = self.conn.cursor()
        cur.execute("insert into h_produitinventorie (id_produit_inventorie, id_code_modification, quantite, cree_le, code_usager) values (%s,2,%s,%s,%s);",(id,quant,datetime.datetime.now(),TEST_USER))
        self.conn.commit()
        cur.close()

















## Start of script application


app = Flask(__name__)
gvc = GVC()

@app.route('/')
def home():
    """Return a friendly HTTP greeting."""
    return app.send_static_file('home.html')

@app.errorhandler(500)
def server_error(e):
    logging.exception('An error occurred during a request.')
    return """
    An internal error occurred: <pre>{}</pre>
    See logs for full stacktrace.
    """.format(e), 500

@app.route('/inventaire/<userid>',methods=['GET'])
def get_inventaire(userid):
    sql = GSQL()
    res = sql.select_inventaire_usager(userid)
    return Response(json.dumps(res), mimetype='application/json')

@app.route('/recette/<userid>', methods=['GET'])
def get_recettes(userid):
    sql = GSQL()
    res = sql.select_recettes_usager(userid)
    return Response(json.dumps(res), mimetype='application/json')

@app.route('/snd_produit_man/<userid>/<produit>/<quantite>/<date>',methods=['POST'])
def upload_manuel_produit(userid,produit,quantite,date):
    return "{'nom':'hello'}"

@app.route('/ajout/<userid>/<codebarre>', methods=['POST'])
def upload_code_barre(userid,codebarre):
    try:
        sql = GSQL()
        sql.insert_produit_codebarre_usager(userid,codebarre)
    except BaseException as e:
        return Response(json.dumps({'success':'false'}),mimetype='application/json')
    return Response(json.dumps({'success':'true'}),mimetype='application/json')




if __name__ == '__main__':
    # This is used when running locally. Gunicorn is used to run the
    # application on Google App Engine. See entrypoint in app.yaml.
    app.run(host='127.0.0.1', port=8080, debug=True)
# [END app]







