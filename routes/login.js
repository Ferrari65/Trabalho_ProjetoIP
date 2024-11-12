var express = require('express');
var router = express.Router();

/* Renderiza a página de login */
router.get('/', function(req, res, next) {
  res.render('Login');
});

module.exports = router;
