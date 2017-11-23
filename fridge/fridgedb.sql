create table CategorieProduit (
id_categorie_produit int PRIMARY KEY
,nom varchar(200)
)

create table CategorieParent (
id_categorie_parent int FOREIGN Key REFERENCES CategorieProduit(id_categorie)
,id_categorie_enfant int FOREIGN key REFERENCES CategorieProduit(id_categorie)
,Constraint BK_CategorieParentUnique UNIQUE (id_categorie_enfant,id_categorie_parent)
)

create table Produit (
id_produit int PRIMARY key
,id_categorie_produit int FOREIGN key REFERENCES CategorieProduit(id_categorie)
,nom varchar(250)
,delais_expiration_jours int
)

create table ProduitInventorie (
id_produit_inventorie int primary KEY
,id_produit int FOREIGN key REFERENCES Produit(id_produit)
,code_usager varchar(15)
,date_exp DATE
,cree_le DATE
, modifie_le DATE
)

create table h_ProduitInventorie (
id_produit_inventorie int FOREIGN key ProduitInventorie(id_produit_inventorie)
,id_h_prod_inv int PRIMARY KEY
,quantite varchar(10)
,id_code_modification int FOREIGN key CodeModification(id_code_modification)
)

create table CodeModification(
id_code_modification int PRIMARY KEY
,code_modification varchar(15)
,description_modification varchar(500)
)
