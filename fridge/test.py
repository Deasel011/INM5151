import psycopg2
import datetime

MOCK_DATE = '2000-01-01'
MOCK_EXP = '2000-01-08'


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
        cur.execute("select * from ProduitInventorie")
        rows = cur.fetchall()
        product_dict = {}
        print('Produits:')
        for row in rows:
            print(row)
            #product_dict[]
        cur.close()

    def select_insert_produit_codebarre_usager(self, userid,code_barre):
        cbstr = str(code_barre)
        product_cur = self.conn.cursor()
        product_cur.execute("select id_produit_inventorie from ProduitInventorie where code_barre = %s ",(cbstr))
        rows = product_cur.fetch_all()
        for row in rows:
            print(row)
        product_cur.close()

sql = GSQL()
#sql.select_cat_produits()
#sql.select_produit_inventorie_usager(1);
#sql.insert_produit_inventorie(0,MOCK_EXP,1)
sql.select_insert_produit_codebarre_usager(0,14010010)
