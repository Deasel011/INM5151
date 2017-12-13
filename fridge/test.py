import psycopg2

class GSQL:
    def __init__(self):
        self.conn = psycopg2.connect(dbname='sf', user='postgres',password='postgres',host='35.194.89.41', port='5432')

    def select_produits(self):
        cur = self.conn.cursor()
        cur.execute("""Select nom from CategorieProduit""")
        rows = cur.fetchall()
        for row in rows:
            print(row)





sql = GSQL()
sql.select_produits()