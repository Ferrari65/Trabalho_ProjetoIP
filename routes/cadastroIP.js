var express = require('express');
var router = express.Router();
const pool = require('../db/db.js');
const { format } = require('date-fns');
const verificaAutenticacao = require('../public/functions/midleware.js');

// Renderiza a página de cadastro de IP
router.get('/', verificaAutenticacao, (req, res) => {
  res.render('cadastroIP', { error: null });
});

// Rota para o envio de dados para o cadastro de IP
router.post('/addIP', verificaAutenticacao, async (req, res) => {
  const { utilizador, matricula, ip } = req.body;
  const dataAtual = format(new Date(), 'yyyy/MM/dd');

  try {
    // Valida se todos os campos foram preenchidos
    if (!utilizador || !matricula || !ip) {
      return res.render('cadastroIP', { error: 'Todos os campos são obrigatórios.' });
    }

    // Pega o id_empresa e o id_usuario do usuário logado
    const get_Informations = await pool.query('SELECT * FROM usuario WHERE email = $1', [req.session.usuarioLogado.nome]);
    const id_empresa = get_Informations.rows[0].id_empresa;
    let id_usuario = get_Informations.rows[0].id_usuario;


    // Verifica se o IP já está cadastrado na empresa
    const existingIP = await pool.query("SELECT * FROM endereco_ip WHERE ip = $1 AND id_empresa_cadastro = $2", [ip, id_empresa]);
    if (existingIP.rowCount > 0) {
      return res.render('cadastroIP', { error: 'IP já existente.' });
    }

    // Insere o novo IP no banco
    await pool.query(
      "INSERT INTO endereco_ip(utilizador, matricula_utilizador, ip, data_registro, id_usuario_cadastro, id_empresa_cadastro) VALUES ($1, $2, $3, $4, $5, $6)", 
      [utilizador, matricula, ip, dataAtual, id_usuario, id_empresa]
    );

    console.log('IP registrado com sucesso:', ip);
    res.redirect('/lista'); 
  } catch (error) {
    console.error("Erro ao cadastrar IP:", error);
    res.render('cadastroIP', { error: 'Erro ao cadastrar o IP. Tente novamente.' });
  }
});

// Rota para autenticação
router.post('/autentication', async (req, res) => {
  const { utilizador, matricula, ip } = req.body;

  try {
    // Valida os campos obrigatórios
    if (!utilizador || !matricula || !ip) {
      return res.render('cadastroIP', { error: 'Todos os campos são obrigatórios.' });
    }

    // Simula lógica de autenticação 
    console.log('Usuário autenticado:', { utilizador, matricula, ip });
    res.redirect('/success');
  } catch (error) {
    console.error("Erro na autenticação:", error);
    res.render('cadastroIP', { error: 'Erro na autenticação. Tente novamente.' });
  }
});

// Rota para logout
router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send('Erro ao fazer logout');
    }
    res.redirect('/login');
  });
});

module.exports = router;
