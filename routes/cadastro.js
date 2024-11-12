var express = require('express');
var router = express.Router();
const pool = require('../db/db.js')

/* Renderiza a página de login */
router.get('/', function(req, res, next) {
  res.render('TelaDeCadastro');
});

router.post('/addClient', (req, res, next) => {
  const { nome, email, senha, matricula } = req.body
  try{
    
  } catch(error) {

  }
});

router.get('/sucesso', function(req, res, next) {
  res.render('SucessoCadastro');
});

module.exports = router;
