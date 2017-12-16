create or replace view v_inventaire (nom, quantite, code_usager) AS select p.nom
  ,cast(sum(cast(left(h.quantite,length(h.quantite)-3) as int)) as varchar(15))|| ' ' || max(right(h.quantite,2))
  ,h.code_usager
  from h_produitinventorie h
  join produitinventorie pi on pi.id_produit_inventorie = h.id_produit_inventorie
  join produit p on pi.id_produit = p.id_produit
  group by p.nom, h.code_usager;

create or replace view v_recette_disponible (nom) as select r.nom
from recette r
join ingredient i on r.id_recette = i.id_recette
join produitInventorie pi on  i.id_produit = pi.id_produit
join h_produitinventorie hpi on pi.id_produit_inventorie = hpi.id_produit_inventorie
group by hpi.code_usager
where cast(sum(cast(left(hpi.quantite,length(hpi.quantite)-3) as int)) as varchar(15))|| ' ' || max(right(hpi.quantite,2)) >= i.quantite