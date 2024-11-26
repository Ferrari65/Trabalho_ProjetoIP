var express = require('express');
var router = express.Router();
const pool = require('../db/db.js')
const midleware = require('../public/functions/midleware.js');
const verificaAutenticacao = require('../public/functions/midleware.js');
const { format } = require('date-fns');

/* GET home page. */
router.get('/', verificaAutenticacao, (req, res) => {
  res.render('editar');
});

router.post('/saveIP', async (req, res) => {
  const { id_ip, utilizador, matricula_utilizador, ip } = req.body;
  const dataAtual = format(new Date(), 'yyyy/MM/dd');

  try{
    const atualizarQuery = await pool.query('UPDATE endereco_ip SET id_ip = $1, utilizador = $2, matricula_utilizador = $3, ip = $4 WHERE id_ip = $5',
      [id_ip, utilizador, matricula_utilizador, ip, id_ip]
    );

    if (atualizarQuery.rowCount > 0) {
      res.redirect('/lista'); // Redireciona para a página de lista se deu certo
    } else {
      res.status(404).json({ message: 'Nenhum registro encontrado para atualizar.' });
    }
  } catch(error) {
    res.status(401).json({ error: error.message })
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
      if (err) {
          return res.status(500).send('Erro ao fazer logout');
      }
      res.redirect('/login');
  });
});

module.exports = router;