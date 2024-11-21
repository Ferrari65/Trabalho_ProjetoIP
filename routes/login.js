var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const pool = require('../db/db.js');

// RENDERIZANDO A PAGINA DE LOGIN
router.get('/', function(req, res) {
<<<<<<< HEAD
  res.render('login', { error: null });
=======
  res.render('login', { error: null }); 
>>>>>>> 3c9387157fe9826447be61677fb9d40dbd4e83bd
});

router.post('/autentication', async (req, res) => {
  const { email, senha } = req.body;

<<<<<<< HEAD
  // VALIDANDO CAMPOS OBRIGATORIOS
  if (!email || !senha) {
    return res.render('login', { 
      error: 'Todos os campos são obrigatórios.' 
=======
  // Validação dos campos obrigatórios
  if (!email || !senha) {
    return res.render('login', { 
      error: 'Todos os campos são obrigatórios.'  
>>>>>>> 3c9387157fe9826447be61677fb9d40dbd4e83bd
    });
  }

  try {
<<<<<<< HEAD
    // CONSULTA PARA VERIFICAR SE O USUARIO JA ESTA CADASTRADO NO BANCO DE DADOS
    const result = await pool.query("SELECT * FROM usuario WHERE email = $1", [email]);

    // VERIFICANDO SE O USUARIO É EXISTENTE
=======
    // Consulta para verificar o usuário no banco de dados
    const result = await pool.query("SELECT * FROM usuario WHERE email = $1", [email]);

    // Verifica se o usuário existe
>>>>>>> 3c9387157fe9826447be61677fb9d40dbd4e83bd
    if (result.rows.length === 0) {
      return res.render('login', { 
        error: 'Usuário não encontrado. Verifique o email ou cadastre-se.' 
      });
    }

    const usuario = result.rows[0];
    
<<<<<<< HEAD
    // VERIFICANDO SE A SENHA ESTA ACORRETA
    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (!senhaCorreta) {
      return res.render('login', { 
        error: 'Senha incorreta.'  
=======
    // Verifica se a senha está correta
    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (!senhaCorreta) {
      return res.render('login', { 
        error: 'Senha incorreta.' 
>>>>>>> 3c9387157fe9826447be61677fb9d40dbd4e83bd
      });
    }

    // Se o login for bem-sucedido, redireciona para a página de listagem
    res.redirect('/listagem');
  } catch (error) {
<<<<<<< HEAD

    // MENSAGEM DE ERRO
=======
>>>>>>> 3c9387157fe9826447be61677fb9d40dbd4e83bd
    console.error("Erro ao autenticar usuário:", error);
    return res.render('login', { 
      error: 'Erro interno no servidor. Tente novamente mais tarde.' 
    });
  }
});

module.exports = router;