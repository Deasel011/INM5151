var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('recettes', { title: 'Recettes' });
});

router.get('/getAll', function(req, res, next) {
  res.json([{"id": 1, "nom": "Salade de haricots verts et tomates", "img":"https://www.metro.ca/userfiles/image/recipes/Salade-haricots-verts-lardons-tomates-2918.jpg"},
            {"id": 2, "nom": "Pommes de terre dauphinoises", "img": "https://www.metro.ca/userfiles/image/recipes/pommes-terre-dauphinoises-7180.jpg"},
            {"id": 3, "nom": "Garniture au poulet et aux amandes", "img": "https://www.metro.ca/userfiles/image/recipes/Garniture-poulet-amandes-94.jpg"}
          ]);
});

router.get('/:id', function(req, res, next) {
  var id = req.params.id;
  if(id == 1){
    res.json({"id": 1, 
              "nom": "Salade de haricots verts et tomates", 
              "ingredients" : [
                                {"nom":"Haricots verts", "qnt":"750 ml (3 tasses)"},
                                {"nom":"Lardons", "qnt":"120 g (4 oz)"},
                                {"nom":"Vinaigre balsamique", "qnt":"60 ml (1/4 tasse)"},
                                {"nom":"Huile d'olive", "qnt":"125 ml (1/2 tasse)"}
                              ],
              "preparation":"Dans une grande casserole, faire bouillir de l'eau et la saler légèrement. "+
                            "Ajouter les haricots verts et les faire cuire environ 5 minutes ou jusqu'à ce qu'ils commencent à être tendres mais encore croquants. "+
                            "Refroidir sous l'eau froide, égoutter et réserver."+
                            "Dans un poêlon, faire cuire les lardons à feu moyen vif pendant environ 5 minutes ou jusqu'à ce qu'ils commencent à être dorés et croustillants. Réserver."+
                            "Dans un petit bol, mélanger le vinaigre balsamique, l'huile, le sel et le poivre."+
                            "Dans un grand bol de service, combiner les haricots, les lardons et les tomates. Verser le mélange de vinaigre et d'huile sur les légumes, bien mélanger et servir."
            });
  }else if(id == 2){
    res.json({"id": 2, 
              "nom": "Pommes de terre dauphinoises", 
              "ingredients" : [
                {"nom":"Sachet de mélange à soupe crème de poireau Knorr® verts", "qnt":"1"},
                {"nom":"Lait 2 %", "qnt":"250 ml (1 tasse)"},
                {"nom":"Eau", "qnt":"125 ml (1/2 tasse)"},
                {"nom":"Feuilles de thym séchées", "qnt":"1.25 ml (1/4 c. à thé)"},
                {"nom":"Pommes de terre", "qnt":"1 kg (2 lb)"}
              ],
              "preparation": "Préchauffer le four à 190 °C (375 °F). Graisser légèrement un plat de cuisson peu profond de 2 litres (8 tasses). Réserver."+              
              "Combiner le mélange à soupe Crème de poireau Knorr®, le lait, l’eau et le thym."+              
              "Déposer une couche de pommes de terre dans le plat de cuisson. Verser 1/3 du mélange de poireau sur les pommes de terre; répéter sur 2 autres couches en terminant par le mélange."+              
              "Faire cuire au four à couvert pendant 45 minutes. Enlever le couvercle et faire cuire 15 minutes de plus ou jusqu’à ce que les pommes de terre soient tendres et dorées."
            });

  }else{
    res.json({"id": 3, 
              "nom": "Garniture au poulet et aux amandes", 
              "ingredients" : [
                {"nom":"Poulet cuit, haché", "qnt":"375 ml (1 1/2 tasse)"},
                {"nom":"Amandes grillées, hachées", "qnt":"125 ml (1/2 tasse)"},
                {"nom":"Mayonnaise", "qnt":"190 ml (3/4 tasse)"},
                {"nom":"Sel de céleri", "qnt":"1 pincée"}
              ],
              "preparation": "Dans un bol, mélanger le poulet cuit et les amandes."+              
              "Incorporer la mayonnaise et le sel de céleri."+              
              "Assaisonner de sel et poivre."
            });

  }
});

module.exports = router;