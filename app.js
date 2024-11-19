const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');

var homeRouter = require('./routes/home');
var loginRouter = require('./routes/login');
const cadastroRouter = require('./routes/cadastro');
const sucessoRouter = require('./routes/sucesso');
const listaRouter = require('./routes/lista');
const IPRouter = require('./routes/cadastroIP');

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'));

app.use('/home', homeRouter);
app.use('/login', loginRouter);
app.use('/cadastro', cadastroRouter)
app.use('/sucesso', sucessoRouter)
app.use('/listagem', listaRouter)
app.use('/cadastroIP', IPRouter)

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000 !!!");
});

module.exports = app;
