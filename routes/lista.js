var express = require("express");
var router = express.Router();
const pool = require("../db/db");
const { format } = require("date-fns");
const verificaAutenticacao = require("../public/functions/midleware");

router.get("/", verificaAutenticacao, async (req, res) => {
  try {
    const get_Idempresa = await pool.query('SELECT * FROM usuario WHERE email = $1', [req.session.usuarioLogado.nome]);
    const Id_empresa = get_Idempresa.rows[0].id_empresa;
    const result = await pool.query("SELECT * FROM endereco_ip A, usuario B, empresa C WHERE A.id_usuario_cadastro = B.id_usuario AND A.id_empresa_cadastro = C.id_empresa AND A.id_empresa_cadastro = $1", [Id_empresa]);
    let ips = result.rows;
    res.render("listaIP", { ips, format, usuario: req.session.usuarioLogado });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/deletar/:id_ip", async (req, res) => {
  const id_ip = req.params.id_ip;
  try {
    const deletarQuery = await pool.query(
      "DELETE FROM endereco_ip WHERE id_ip = $1",
      [id_ip]
    );
    const verificar = await pool.query(
      "SELECT * FROM endereco_ip WHERE id_ip = $1",
      [id_ip]
    );
    if (verificar.rowCount === 0) {
      res.status(200).redirect("/lista");
    } else {
      res.status(500).send("O cadastro não foi removido, tente novamente!");
    }
  } catch (error) {
    res.status(500).send(`Erro ao excluir o item: ${error.message}`);
  }
});

router.get('/edit/:id_ip', async (req, res) => {
  const id_ip = req.params.id_ip;
  try{
    const getIP = await pool.query('SELECT * FROM endereco_ip WHERE id_ip = $1', [id_ip]);
    const result = getIP.rows
    
    res.render('editar', { result: getIP.rows[0], error: null });
  } catch (error) {
    res.status(404).json({ error: error.message })
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
