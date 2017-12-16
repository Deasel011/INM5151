var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('file_input', { title: 'Numerisation code barre' });
});

module.exports = router;
