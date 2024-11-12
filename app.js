const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const app = express();
const path = require('path');

var homeRouter = require('./routes/home');
var loginRouter = require('./routes/login');
const cadastroRouter = require('./routes/cadastro');
const sucessoRouter = require('./routes/sucesso');

app.set('views', [
  path.join(__dirname, 'tela_home'),
  path.join(__dirname, 'login'),   // Diretório adicional onde está Login.ejs
  path.join(__dirname, 'tela_de_cadastro'),
  path.join(__dirname, 'sucesso_cadastro')
]);

app.set('view engine', 'ejs');

// Configuração do pool de conexão com o SupaBaseSQL
const pool = new Pool({
  database: process.env.DATABASE_URL
});

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'));

app.use('/home', homeRouter);
app.use('/login', loginRouter);
app.use('/cadastro', cadastroRouter)
app.use('/sucesso', sucessoRouter)

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000 !!!");
});

module.exports = app;
