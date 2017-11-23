var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('produits', { title: 'Mon Frigo' });
});

module.exports = router;