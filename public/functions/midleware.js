function verificaAutenticacao(req, res, next) {
    console.log('Verificando autenticação:', req.session.usuarioLogado);
    if (req.session && req.session.usuarioLogado) {
        // O usuário está autenticado
        next(); // Permite que a execução continue para a rota
    } else {
        // Redireciona para a página de login
        res.redirect('/login');
    }
}

module.exports = verificaAutenticacao;