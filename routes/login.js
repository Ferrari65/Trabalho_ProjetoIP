var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const pool = require('../db/db.js');

// Renderiza a página de login
router.get('/', function(req, res) {
  res.render('login');
});

router.post('/autentication', async (req, res) => {
  const { email, senha } = req.body;
  try {
    const result = await pool.query("SELECT * FROM usuario WHERE email = $1", [email]);
    if (result.rows.length === 0) {
      return res.render('login', { error: 'Usuário Não Encontrado' });
    }

    const usuario = result.rows[0];
    const hashedPassword = await bcrypt.compare(senha, usuario.senha);
    if (!hashedPassword) {
      return res.render('login', { error: 'Senha incorreta.' });
    }

    res.redirect('/listagem');
  } catch (error) {
    return res.render('login', { error: 'Erro interno no servidor.' });
  }
});

module.exports = router;
