var express = require('express');
var router = express.Router();
const pool = require('../db/db.js');
const { format } = require('date-fns');
const verificaAutenticacao = require('../public/functions/midleware.js');

// Renderiza a página de cadastro de IP
router.get('/', verificaAutenticacao, function(req, res, next) {
  res.render('cadastroIP');
});

// LOGICAS DE VALIDAÇÃO

// Rota para o envio de dados para o cadastro de IP
router.post('/addIP', async (req, res) => {
  const { utilizador, matricula, ip } = req.body;
  const dataAtual = format(new Date(), 'yyyy/MM/dd');

  try {
    console.log({ utilizador, matricula, ip, dataAtual });
    
    await pool.query(
      "INSERT INTO endereco_ip(utilizador, matricula_utilizador, ip, data_registro) VALUES ($1, $2, $3, $4)", 
      [utilizador, matricula, ip, dataAtual]
    );
    
    res.redirect("/lista");
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
});

// Rota para autenticação
router.post('/autentication', async (req, res) => {
  const { utilizador, matricula, ip } = req.body;

  // VALIDANDO CAMPOS OBRIGATORIOS
  if (!utilizador || !matricula || !ip) {
    return res.render('cadastroIP', { 
      error: 'Todos os campos são obrigatórios.' }
    )}

    try {
      const existigIP = await pool.query("SELECT * FROM endereco_ip WHERE ip = $1", [ip]);
    
      if (result.rows.length > 0) {
        return res.render('cadastroIP', {
          error: 'IP já cadastrado.'
        });
      }
    
      const ipData = result.rows[0]; 
      console.log(ipData);
    
      res.redirect("/lista");
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

  //  VALIDAÇÃO IP JÁ CADASTRADO


module.exports = router;
