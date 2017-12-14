import psycopg2
import datetime

MOCK_DATE = '2000-01-01'
MOCK_EXP = '2000-01-08'


class GSQL:
    def __init__(self):
        self.conn = psycopg2.connect(dbname='sf', user='postgres',password='postgres',host='35.194.89.41', port='5432')

    def select_produits(self):
        cur = self.conn.cursor()
        cur.execute("""Select nom from CategorieProduit""")
        rows = cur.fetchall()
        for row in rows:
            print(row)
        cur.close()

    def insert_produit_inventorie(self, userid, date_exp, inventoryproductid,quantity):
        created_date = datetime.datetime.now()
        modified_date = created_date
        print(modified_date)

    def insert_code_modif(self,code, description):
        cur = self.conn.cursor()
        cur.execute("insert into CodeModification (code_modification, description_modification) values (%s,%s)",(code,description))
        cur.close()

    def select_produit_inventorie_usager(self, userid):
        cur = self.conn.cursor()
        cur.execure


sql = GSQL()
sql.select_produits()
#sql.insert_produit_inventorie(0,MOCK_EXP,1)
