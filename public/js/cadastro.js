document.querySelector('.login').addEventListener('submit', function (e) {
    e.preventDefault();

    // Pegando os campos
    const nome = document.querySelector('input[name="nome"]');
    const email = document.querySelector('input[name="email"]');
    const matricula = document.querySelector('input[name="matricula"]');
    const senha = document.querySelector('input[name="senha"]');
    const confirmarSenha = document.querySelector('input[name="confirmarSenha"]');

    // Limpar classes de erro e mensagens anteriores
    document.querySelectorAll('.error').forEach(field => field.classList.remove('error'));
    document.querySelectorAll('.error-message').forEach(msg => msg.remove());

    // Mensagens de erro
    let erros = [];

    // Validação de Nome completo
    
    const nomeRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;
    if (!nomeRegex.test(nome.value)) {
        erros.push({ field: nome, message: "O nome completo deve conter apenas letras e espaços." });
    }

    // Validação de Email (Gmail, Hotmail ou Outlook)
    const emailRegex = /^[a-zA-Z0-9._-]+@(gmail\.com|hotmail\.com|outlook\.com)$/;
    if (!emailRegex.test(email.value)) {
        erros.push({ field: email, message: "Insira um e-mail válido dos provedores Gmail, Hotmail ou Outlook." });
    }

    // Validação de Matrícula
    if (matricula.value.trim() === "") {
        erros.push({ field: matricula, message: "O campo Matrícula é obrigatório." });
    } else if (!/^\d{5}$/.test(matricula.value.trim())) {
        erros.push({ 
            field: matricula, 
            message: "A Matrícula deve conter exatamente 5 números." 
        });
    }


    // Validação de Senha
    if (senha.value.length < 6) {
        erros.push({ field: senha, message: "A senha deve ter pelo menos 6 caracteres." });
    }

    // Verificação de senhas coincidentes
    if (senha.value !== confirmarSenha.value) {
        erros.push({ field: confirmarSenha, message: "As senhas não coincidem." });
    }

    // Exibir erros
    if (erros.length > 0) {
        erros.forEach(erro => {
            // Destacar campo com erro
            erro.field.classList.add('error');

            // Criar mensagem de erro
            const errorMessage = document.createElement('div');
            errorMessage.classList.add('error-message');
            errorMessage.textContent = erro.message;

            // Inserir mensagem após o campo com erro
            erro.field.parentNode.appendChild(errorMessage);
        });
    } else {
        // Se tudo estiver correto, envia o formulário
        e.target.submit();
    }
});