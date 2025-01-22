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
    const result = getIP.rows[0]
    
    res.render('editar', { result, error: null });
  } catch (error) {
    res.status(404).json({ error: error.message })
  }
});

/* POST para salvar o IP */
router.post('/edit/saveIP', async (req, res) => {
  const { id_ip, id_empresa_cadastro, utilizador, matricula_utilizador, ip } = req.body;
  const dataAtual = format(new Date(), 'yyyy/MM/dd');

  console.log('Dados recebidos:', { id_ip, id_empresa_cadastro, utilizador, matricula_utilizador, ip });

  try {
    // Verificar se o id_ip existe
    const verificaId = await pool.query('SELECT * FROM endereco_ip WHERE id_ip = $1 AND id_empresa_cadastro = $2', [id_ip, id_empresa_cadastro]);
    const verificaIp = await pool.query('SELECT * FROM endereco_ip WHERE id_empresa_cadastro = $1 AND ip = $2', [id_empresa_cadastro, ip]);
    const result = verificaIp.rows[0];
    if (verificaId.rowCount === 0) {
      console.log('ID do IP não encontrado.');
      return res.render('editar', { result, error: 'ID do IP não encontrado.' });
    } else if (verificaId.rowCount > 0) {
      if (verificaIp.rowCount > 0) {
        console.log('IP já existente.');
        return res.render('editar', { result, error: 'IP já existente.' });
      }
    }

    // Atualizar o IP
    const atualizarQuery = await pool.query(
      'UPDATE endereco_ip SET utilizador = $1, matricula_utilizador = $2, ip = $3, data_registro = $4 WHERE id_ip = $5',
      [utilizador, matricula_utilizador, ip, dataAtual, id_ip]
    );

    console.log('Resultado da atualização:', atualizarQuery);

    if (atualizarQuery.rowCount > 0) {
      console.log('IP atualizado com sucesso:', ip);
      return res.redirect('/lista'); 
    } else {
      console.log('Nenhuma linha foi atualizada.');
      return res.render('editar', { result, error: 'Nenhuma linha foi atualizada. Verifique o ID do IP.' });
    }
  } catch (error) {
    const verificaIp = await pool.query('SELECT * FROM endereco_ip WHERE id_empresa_cadastro = $1 AND ip = $2', [id_empresa_cadastro, ip]);
    const result = verificaIp.rows[0];
    console.error("Erro ao atualizar o IP:", error);
    return res.render('editar', { result, error: 'Erro interno do servidor. Tente novamente.' });
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
