var express = require('express');
var router = express.Router();
const pool = require('../db/db.js');
const { format } = require('date-fns');

// Renderiza a página de cadastro de IP
router.get('/', function(req, res, next) {
  res.render('cadastroIP');
});

// Rota para o envio de dados para o cadastro de IP
router.post('/addIP', async (req, res) => {
  const { utilizador, matricula, ip } = req.body;
  const dataAtual = format(new Date(), 'yyyy/MM/dd');
  console.log('teste');
  
  try {
    console.log({ utilizador, matricula, ip, dataAtual });
    
    const result = await pool.query(
      "INSERT INTO endereco_ip(utilizador, matricula_utilizador, ip, data_registro) VALUES ($1, $2, $3, $4)", 
      [utilizador, matricula, ip, dataAtual]
    );
    
    res.redirect("/lista");
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
});

module.exports = router;
