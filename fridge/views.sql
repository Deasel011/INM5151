create or replace view v_inventaire (nom, quantite, code_usager) AS select p.nom
  ,cast(sum(cast(left(h.quantite,length(h.quantite)-3) as int)) as varchar(15))|| ' ' || max(right(h.quantite,2))
  ,h.code_usager
  from h_produitinventorie h
  join produitinventorie pi on pi.id_produit_inventorie = h.id_produit_inventorie
  join produit p on pi.id_produit = p.id_produit
  group by p.nom, h.code_usager;
