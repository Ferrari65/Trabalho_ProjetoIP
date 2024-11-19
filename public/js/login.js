document.querySelector('.login').addEventListener('submit', function (e) {
    e.preventDefault();

    // Pegando os campos
    const email = document.querySelector('input[name="email"]');
    const senha = document.querySelector('input[name="senha"]');


    // Limpar classes de erro
    [ email, senha].forEach(field => field.classList.remove('error'));

    // Mensagem de erro
    let erros = [];

    // Validação de Email para Gmail, Hotmail ou Outlook
    const emailRegex = /^[a-zA-Z0-9._-]+@(gmail\.com|hotmail\.com|outlook\.com)$/;
    if (!emailRegex.test(email.value)) {
        erros.push("Insira um e-mail válido dos provedores Gmail, Hotmail ou Outlook.");
        email.classList.add('error');
    }

    // Validação de Senha
    if (senha.value.length < 6) {
        erros.push("A senha deve ter pelo menos 6 caracteres.");
        senha.classList.add('error');
    }

    // Exibir erros ou enviar o formulário
    if (erros.length > 0) {
        alert(erros.join("\n")); 
    } else {

        e.target.submit();
    }
});
document.querySelector('.login').addEventListener('submit', function (e) {
    e.preventDefault();

    // Pegando os campos
    const email = document.querySelector('input[name="email"]');
    const senha = document.querySelector('input[name="senha"]');


    // Limpar classes de erro
    [ email, senha].forEach(field => field.classList.remove('error'));

    // Mensagem de erro
    let erros = [];

    // Validação de Email para Gmail, Hotmail ou Outlook
    const emailRegex = /^[a-zA-Z0-9._-]+@(gmail\.com|hotmail\.com|outlook\.com)$/;
    if (!emailRegex.test(email.value)) {
        erros.push("Insira um e-mail válido dos provedores Gmail, Hotmail ou Outlook.");
        email.classList.add('error');
    }

    // Validação de Senha
    if (senha.value.length < 6) {
        erros.push("A senha deve ter pelo menos 6 caracteres.");
        senha.classList.add('error');
    }

    // Exibir erros ou enviar o formulário
    if (erros.length > 0) {
        alert(erros.join("\n")); 
    } else {

        e.target.submit();
    }
});
