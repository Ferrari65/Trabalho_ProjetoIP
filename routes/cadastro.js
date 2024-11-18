var express = require('express');
var router = express.Router();
const pool = require('../db/db.js');
const bcrypt = require('bcrypt');

/* Renderiza a página de login */
router.get('/', function(req, res, next) {
  res.render('cadastro');
});

router.post('/addClient', async (req, res, next) => {
  const { matricula, nome, email, senha } = req.body
  try{
    console.log({matricula, nome, email, senha});
    const round = 10;
    const hashedPassword = await bcrypt.hash(senha, round);
    console.log({matricula, nome, email, hashedPassword});
    const result = await pool.query(
      "INSERT INTO usuario(matricula, nome, email, senha) VALUES ($1, $2, $3, $4)", [matricula, nome, email, hashedPassword]
    );
    res.redirect("/sucesso");
  } catch(error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/sucesso', function(req, res, next) {
  res.render('SucessoCadastro');
});

module.exports = router;
