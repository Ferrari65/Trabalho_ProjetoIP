var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const pool = require('../db/db.js');

// RENDERIZANDO A PAGINA DE LOGIN
router.get('/', function(req, res) {
  res.render('login', { error: null });
});

router.post('/autentication', async (req, res) => {
  const { email, senha } = req.body;

  // VALIDANDO CAMPOS OBRIGATORIOS
  if (!email || !senha) {
    return res.render('login', { 
      error: 'Todos os campos são obrigatórios.' 
    });
  }

  try {
    // CONSULTA PARA VERIFICAR SE O USUARIO JA ESTA CADASTRADO NO BANCO DE DADOS
    const result = await pool.query("SELECT * FROM usuario WHERE email = $1", [email]);

    // VERIFICANDO SE O USUARIO É EXISTENTE
    if (result.rows.length === 0) {
      return res.render('login', { 
        error: 'Usuário não encontrado. Verifique o email ou cadastre-se.' 
      });
    }

    const usuario = result.rows[0];
    
    // VERIFICANDO SE A SENHA ESTA ACORRETA
    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (!senhaCorreta) {
      return res.render('login', { 
        error: 'Senha incorreta.'  
      });
    }

    res.redirect('/listagem');
  } catch (error) {

    // MENSAGEM DE ERRO
    console.error("Erro ao autenticar usuário:", error);
    return res.render('login', { 
      error: 'Erro interno no servidor. Tente novamente mais tarde.' 
    });
  }
});

module.exports = router;
