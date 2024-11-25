var express = require('express');
var router = express.Router();
const pool = require('../db/db.js');
const { format } = require('date-fns');
const verificaAutenticacao = require('../public/functions/midleware.js');

// Renderiza a página de cadastro de IP
router.get('/', verificaAutenticacao, function(req, res, next) {
  res.render('cadastroIP');
});


// LÓGICAS DE VALIDAÇÃO


// Rota para o envio de dados para o cadastro de IP
router.post('/addIP', async (req, res) => {
  const { utilizador, matricula, ip } = req.body;
  const dataAtual = format(new Date(), 'yyyy/MM/dd');



  try {
    console.log({ utilizador, matricula, ip, dataAtual });

      // VALIDAÇÃO IP JÁ CADASTRADO
    const existingIP = await pool.query("SELECT * FROM endereco_ip WHERE ip = $1", [ip]);

    if (existingIP.rows.length > 0) {
      return res.render('cadastroIP', {
        error: 'IP já cadastrado.'
      });
    }

    console.log('IP disponível para registro:', ip);
    res.redirect('/lista');

    await pool.query(
      "INSERT INTO endereco_ip(utilizador, matricula_utilizador, ip, data_registro) VALUES ($1, $2, $3, $4)", 
      [utilizador, matricula, ip, dataAtual]
    );

    res.redirect("/lista");
  } catch (error) {
    console.error("Erro ao cadastrar IP:", error);
    return res.render('cadastroIP', { 
      error: 'Não foi possível cadastrar o IP. Por favor, tente novamente.'
    });
  }
});

// Rota para autenticação
router.post('/autentication', async (req, res) => {
  const { utilizador, matricula, ip } = req.body;

  // VALIDANDO CAMPOS OBRIGATÓRIOS
  if (!utilizador || !matricula || !ip) {
    return res.render('cadastroIP', { 
      error: 'Todos os campos são obrigatórios.'});
  }
})

router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
      if (err) {
          return res.status(500).send('Erro ao fazer logout');
      }
      res.redirect('/login');
  });
});


module.exports = router;
