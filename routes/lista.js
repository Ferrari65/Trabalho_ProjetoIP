var express = require("express");
var router = express.Router();
const pool = require("../db/db");
const { format } = require("date-fns");
const verificaAutenticacao = require("../public/functions/midleware");

router.get("/", verificaAutenticacao, async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM endereco_ip");
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
    
    res.render('editar', { result: getIP.rows[0] });
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
