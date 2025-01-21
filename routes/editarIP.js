var express = require('express');
var router = express.Router();
const pool = require('../db/db.js');
const verificaAutenticacao = require('../public/functions/midleware.js'); // Importando uma única vez
const { format } = require('date-fns');

/* GET home page */
router.get('/', verificaAutenticacao, (req, res) => {
  res.render('editar'); 
});

/* POST para salvar o IP */
router.post('/saveIP', async (req, res) => {
  const { id_ip, utilizador, matricula_utilizador, ip } = req.body;
  const dataAtual = format(new Date(), 'yyyy/MM/dd');

  console.log('Dados recebidos:', { id_ip, utilizador, matricula_utilizador, ip });

  try {
    // Verificar se o id_ip existe
    const verificaId = await pool.query('SELECT * FROM endereco_ip WHERE id_ip = $1', [id_ip]);
    if (verificaId.rowCount === 0) {
      console.log('ID do IP não encontrado.');
      return res.render('editar', { error: 'ID do IP não encontrado.' });
    }

    if (verificaIP.rowCount > 0) {
      console.log('IP já existente.');
      return res.render('cadastroIP', { error: 'IP já existente.' });
    }

    // Atualizar o IP
    const atualizarQuery = await pool.query(
      'UPDATE endereco_ip SET utilizador = $1, matricula_utilizador = $2, ip = $3, data_atualizacao = $4 WHERE id_ip = $5',
      [utilizador, matricula_utilizador, ip, dataAtual, id_ip]
    );

    console.log('Resultado da atualização:', atualizarQuery);

    if (atualizarQuery.rowCount > 0) {
      console.log('IP atualizado com sucesso:', ip);
      return res.redirect('/lista'); 
    } else {
      console.log('Nenhuma linha foi atualizada.');
      return res.render('cadastroIP', { error: 'Nenhuma linha foi atualizada. Verifique o ID do IP.' });
    }
  } catch (error) {
    console.error("Erro ao atualizar o IP:", error);
    return res.render('cadastroIP', { error: 'Erro interno do servidor. Tente novamente.' });
  }
});

/* Logout */
router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send('Erro ao fazer logout');
    }
    res.redirect('/login');
  });
});

module.exports = router;