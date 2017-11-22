var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('produit', { title: 'Produit' });
});

module.exports = router;