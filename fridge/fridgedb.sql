drop table if EXISTS Substitution;
drop table if EXISTS Ingredient;
drop table if EXISTS h_produitinventorie;
drop table if EXISTS codemodification;
drop table if EXISTS produitinventorie;
drop table if EXISTS produit;
drop table if EXISTS categorieparent;
drop table if EXISTS categorieproduit;
drop table if EXISTS recette;

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
,code_barre BIGINT
 ,quantite varchar(15)
,CONSTRAINT FK_ProduitInventorie_Produit FOREIGN key (id_produit) REFERENCES Produit(id_produit)
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
,cree_le DATE
,code_usager INT
, CONSTRAINT FK_ProduitInventorie_CodeModification FOREIGN key (id_code_modification) REFERENCES CodeModification(id_code_modification)
);

create table Recette (
id_recette INT
, nom varchar(250)
, description varchar(200)
, preparation varchar(max)
)

create table Ingredient (
  id_recette INT
, constraint FK_ingredient_recette FOREIGN KEY (id_recette) REFERENCES  Recette (id_recette)
, id_produit int
, constraint FK_ingredient_produit FOREIGN key (id_produit) REFERENCES Produit(id_produit)
, quantite varchar(25)
, constraint BK_ingredient UNIQUE (id_produit,id_recette)
)

create table Substitution (
  id_produit_original int
, constraint FK_substition_produit FOREIGN key (id_produit_original) REFERENCES Produit(id_produit)
, id_categorie_substitue int
, id_produit_substitue int
, constraint FK_substitution_produit_sub FOREIGN key (id_produit_substitue)
, constraint FK_substitution_cat_sub FOREIGN key (id_categorie_substitue)
)