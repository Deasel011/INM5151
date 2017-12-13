var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('capture', { title: 'Capture' });
});

module.exports = router;
