var express = require('express');
var router = express.Router();
const pool = require('../db/db.js');
const bcrypt = require('bcrypt');

/* Renderiza a página de cadastro */
router.get('/', function(req, res, next) {
  res.render('cadastro', { error: null });  
});

router.post('/addClient', async (req, res, next) => {
  const { matricula, nome, email, senha } = req.body;

  // LOGICA VERIFICANDO SE campos obrigatórios foram preenchidos
  if (!matricula || !nome || !email || !senha) {
    return res.render('cadastro', { 
      error: 'Todos os campos são obrigatórios.'  
    });
  }

  try {
    // LOGICA PARA VERIFICAR SE O EMAIL  ESTA EM USO
    const emailExistente = await pool.query("SELECT * FROM usuario WHERE email = $1", [email]);
    if (emailExistente.rows.length > 0) {
      return res.render('cadastro', { 
        error: 'Este e-mail já está registrado. Tente outro.'  
      });
    }

    //  LOGICA PARA VERIFICAR SE  A MATRICULA  ESTA EM USO
    const matriculaExistente = await pool.query("SELECT * FROM usuario WHERE matricula = $1", [matricula]);
    if (matriculaExistente.rows.length > 0) {
      return res.render('cadastro', { 
        error: 'Esta matrícula já está registrada. Tente outra.'  
      });
    }

    // GERANDO SENHA CRIPTOGRAFADA
    const round = 10;
    const hashedPassword = await bcrypt.hash(senha, round);

    // INSERT DO NOVO USUARIO NA TABELA USUARIO
    await pool.query(
      "INSERT INTO usuario (matricula, nome, email, senha) VALUES ($1, $2, $3, $4)", 
      [matricula, nome, email, hashedPassword]
    );

    // REDIRECIONANDO PARA A PAGINA DE SUCESSO 
    res.redirect("/sucesso");
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ error: error.message });  
  }
});


router.get('/sucesso', function(req, res, next) {
  res.render('SucessoCadastro');
});

module.exports = router;
