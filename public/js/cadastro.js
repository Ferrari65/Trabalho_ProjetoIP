// Middleware para processar dados do formulário
app.use(express.urlencoded({ extended: true }));

app.post('/cadastro', (req, res) => {

    const { nome, email, matricula, senha, confirmarSenha } = req.body;

    if (senha !== confirmarSenha) {
        return res.send('As senhas não coincidem!');
    }

    console.log(`Cadastro realizado com sucesso para: ${nome}, ${email}, ${matricula}`);

    res.redirect('/SucessoCadastro');
});
