delete from categorieparent;

insert into categorieparent (id_categorie_parent,id_categorie_enfant) values
((select id_categorie_produit from categorieproduit where nom = 'Vegetable')
, (select id_categorie_produit  from categorieproduit where nom = 'Tomato'));

insert into categorieparent (id_categorie_parent,id_categorie_enfant) values
((select id_categorie_produit from categorieproduit where nom = 'Vegetable')
, (select id_categorie_produit  from categorieproduit where nom = 'Potato'));

insert into categorieparent (id_categorie_parent,id_categorie_enfant) values
((select id_categorie_produit from categorieproduit where nom = 'Fruit')
, (select id_categorie_produit  from categorieproduit where nom = 'Apple'));

insert into categorieparent (id_categorie_parent,id_categorie_enfant) values
((select id_categorie_produit from categorieproduit where nom = 'Fruit')
, (select id_categorie_produit  from categorieproduit where nom = 'Pineapple'));

insert into categorieparent (id_categorie_parent,id_categorie_enfant) values
((select id_categorie_produit from categorieproduit where nom = 'Fruit')
, (select id_categorie_produit  from categorieproduit where nom = 'Orange'));
