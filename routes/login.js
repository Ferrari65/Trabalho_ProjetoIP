var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const pool = require('../db/db.js');

// Renderiza a página de login
router.get('/', function(req, res) {
  res.render('login', { error: null }); 
});

router.post('/autentication', async (req, res) => {
  const { email, senha } = req.body;

  // Validação dos campos obrigatórios
  if (!email || !senha) {
    return res.render('login', { 
      error: 'Todos os campos são obrigatórios.'  
    });
  }

  try {
    // Consulta para verificar o usuário no banco de dados
    const result = await pool.query("SELECT * FROM usuario WHERE email = $1", [email]);

    // Verifica se o usuário existe
    if (result.rows.length === 0) {
      return res.render('login', { 
        error: 'Usuário não encontrado. Verifique o email ou cadastre-se.' 
      });
    }

    const usuario = result.rows[0];
    
    // Verifica se a senha está correta
    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (!senhaCorreta) {
      return res.render('login', { 
        error: 'Senha incorreta.' 
      });
    }

    // Se o login for bem-sucedido, redireciona para a página de listagem
    res.redirect('/listagem');
  } catch (error) {
    console.error("Erro ao autenticar usuário:", error);
    return res.render('login', { 
      error: 'Erro interno no servidor. Tente novamente mais tarde.' 
    });
  }
});

module.exports = router;