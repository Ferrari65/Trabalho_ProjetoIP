var express = require('express');
var router = express.Router();
const pool = require('../db/db.js');
const bcrypt = require('bcrypt');

/* RENDERIZANDO PAGINA */
router.get('/', async (req, res, next) => {
  try {
    const getEmpresa = await pool.query('SELECT * FROM empresa');
    const empresas = getEmpresa.rows;

    res.render('cadastro', { error: null, empresas });
  } catch (error) {
    console.error('Erro ao buscar empresas:', error);
    res.status(500).send('Erro ao carregar a página de cadastro.');
  }
});

/* LOGICA DE CADASTRO */
router.post('/addClient', async (req, res, next) => {
  const { matricula, nome, option, email, senha } = req.body;

  // VERIFICANDO SE TODOS OS CAMPOS FORAM PREENCHIDOS
  if (!matricula || !nome || !option || !email || !senha) {
    try {
      const getEmpresa = await pool.query('SELECT * FROM empresa');
      const empresas = getEmpresa.rows;

      return res.render('cadastro', { 
        error: 'Todos os campos são obrigatórios.', 
        empresas 
      });
    } catch (error) {
      console.error('Erro ao buscar empresas:', error);
      return res.status(500).send('Erro ao processar o formulário.');
    }
  }

  try {
    // VERIFICANDO SE O EMAIL ESTA EM USO
    const emailExistente = await pool.query("SELECT * FROM usuario WHERE email = $1", [email]);
    if (emailExistente.rows.length > 0) {
      const getEmpresa = await pool.query('SELECT * FROM empresa');
      const empresas = getEmpresa.rows;

      return res.render('cadastro', { 
        error: 'Este e-mail já está registrado. Tente outro.', 
        empresas 
      });
    }

    // VERIFICA SE A MATRICULA ESTA EM USO
    const matriculaExistente = await pool.query("SELECT * FROM usuario WHERE matricula = $1", [matricula]);
    if (matriculaExistente.rows.length > 0) {
      const getEmpresa = await pool.query('SELECT * FROM empresa');
      const empresas = getEmpresa.rows;

      return res.render('cadastro', { 
        error: 'Esta matrícula já está registrada. Tente outra.', 
        empresas 
      });
    }

    // GERANDO SENHA CRIPTOGRAFADA
    const round = 10;
    const hashedPassword = await bcrypt.hash(senha, round);

    // INSERT DE NOVO USUARIO NA TABELA
    await pool.query(
      "INSERT INTO usuario (matricula, nome, id_empresa, email, senha) VALUES ($1, $2, $3, $4, $5)", 
      [matricula, nome, option, email, hashedPassword]
    );

    // REDIRECIONANDO PARA A PAGINA DE SUCESSO
    res.redirect("/sucesso");
  } catch (error) {
    console.error('Erro no cadastro:', error.message);

    // EM CASO DE ERRO RETORNA AO FORMULARIO
    try {
      const getEmpresa = await pool.query('SELECT * FROM empresa');
      const empresas = getEmpresa.rows;

      return res.render('cadastro', { 
        error: 'Erro no processamento. Tente novamente.', 
        empresas 
      });
    } catch (innerError) {
      console.error('Erro ao buscar empresas:', innerError);
      res.status(500).send('Erro ao processar o formulário.');
    }
  }
});

/* Página de sucesso */
router.get('/sucesso', function(req, res, next) {
  res.render('SucessoCadastro');
});

module.exports = router;
