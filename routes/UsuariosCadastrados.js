var express = require('express');
var router = express.Router();
const pool = require('../db/db.js');
const verificaAutenticacao = require('../public/functions/midleware.js');

router.get('/', verificaAutenticacao, async (req, res) => {
    const get_Informations = await pool.query('SELECT * FROM usuario WHERE email = $1', [req.session.usuarioLogado.nome]);
    const id_empresa = get_Informations.rows[0].id_empresa;

    const usuariosEmpresa = await pool.query('SELECT * FROM usuario WHERE id_empresa = $1', [id_empresa]);
    const usuarios = usuariosEmpresa.rows;
    res.render('UsuariosCadastrados', { usuarios });
});

module.exports = router;
