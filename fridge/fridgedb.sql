drop table if EXISTS h_produitinventorie;
drop table if EXISTS codemodification;
drop table if EXISTS produitinventorie;
drop table if EXISTS produit;
drop table if EXISTS categorieparent;
drop table if EXISTS categorieproduit;

create table CategorieProduit (
id_categorie_produit SERIAL PRIMARY KEY
,nom varchar(200)
);


create table CategorieParent (
id_categorie_parent int,
 Constraint FK_CategorieProduit_parent FOREIGN Key (id_categorie_parent) REFERENCES CategorieProduit(id_categorie_produit)
,id_categorie_enfant int,
 CONSTRAINT FK_CategorieProduit_enfant FOREIGN key (id_categorie_enfant) REFERENCES CategorieProduit(id_categorie_produit)
,Constraint BK_CategorieParentUnique UNIQUE (id_categorie_enfant,id_categorie_parent)
);


create table Produit (
id_produit serial PRIMARY key
,id_categorie_produit int
,CONSTRAINT FK_Produit_CategorieProduit FOREIGN key (id_categorie_produit) REFERENCES CategorieProduit(id_categorie_produit)
,nom varchar(250)
,delais_expiration_jours int
,code_image int
);


create table ProduitInventorie (
id_produit_inventorie serial primary KEY
,id_produit Int
,CONSTRAINT FK_ProduitInventorie_Produit FOREIGN key (id_produit) REFERENCES Produit(id_produit)
,code_usager varchar(15)
,date_exp DATE
,cree_le DATE
, modifie_le DATE
);


create table CodeModification(
id_code_modification serial PRIMARY KEY
,code_modification varchar(15)
,description_modification varchar(500)
);


create table h_ProduitInventorie (
id_produit_inventorie int
, CONSTRAINT FK_ProduitInventorieHisto_ProduitInventorie FOREIGN key (id_produit_inventorie)REFERENCES ProduitInventorie(id_produit_inventorie)
,id_h_prod_inv serial PRIMARY KEY
,quantite varchar(10)
,id_code_modification int
, CONSTRAINT FK_ProduitInventorie_CodeModification FOREIGN key (id_code_modification) REFERENCES CodeModification(id_code_modification)
);
