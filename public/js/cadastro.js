document.querySelector('.login').addEventListener('submit', function (e) {
    e.preventDefault();

    // Pegando os campos
    const form = e.target;
    const nome = form.querySelector('input[name="nome"]');
    const email = form.querySelector('input[name="email"]');
    const matricula = form.querySelector('input[name="matricula"]');
    const senha = form.querySelector('input[name="senha"]');
    const confirmarSenha = form.querySelector('input[name="confirmarSenha"]');

    // Objeto de validações
    const validacoes = [
        {
            campo: nome,
            regra: /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/,
            mensagem: "O nome deve conter apenas letras e espaços."
        },
        {
            campo: email,
            regra: /^[a-zA-Z0-9._-]+@(gmail\.com|Gmail\.com|hotmail\.com|Hotmail\.com|outlook\.com|Outlook\.com)$/i,
            mensagem: "Use um e-mail válido (Gmail, Hotmail ou Outlook)."
        },
        {
            campo: matricula,
            regra: /^\d{5}$/,
            mensagem: "A matrícula deve conter exatamente 5 números."
        },
        {
            campo: senha,
            regra: /^.{6,}$/,
            mensagem: "A senha deve ter pelo menos 6 caracteres."
        },
        {
            campo: confirmarSenha,
            regra: senha.value,
            mensagem: "As senhas não coincidem.",
            comparar: true
        }
    ];

    // Limpar erros anteriores
    limparErros();

    // Validar campos
    const erros = validarCampos(validacoes);

    // Exibir erros ou submeter o formulário
    if (erros.length > 0) {
        exibirErros(erros);
    } else {
        form.submit();
    }
});

// Função para limpar erros
function limparErros() {
    document.querySelectorAll('.error').forEach(field => field.classList.remove('error'));
    document.querySelectorAll('.error-message').forEach(msg => msg.remove());
}

// Função para validar os campos
function validarCampos(validacoes) {
    const erros = [];

    validacoes.forEach(({ campo, regra, mensagem, comparar }) => {
        const valor = campo.value.trim();

        if (comparar) {
            // Validação de confirmação de senha
            if (valor !== regra) {
                erros.push({ campo, mensagem });
            }
        } else if (!regra.test(valor)) {
            erros.push({ campo, mensagem });
        }
    });

    return erros;
}

// Função para exibir erros
function exibirErros(erros) {
    erros.forEach(({ campo, mensagem }) => {
        // Adicionar classe de erro
        campo.classList.add('error');

        // Criar mensagem de erro
        const errorMessage = document.createElement('div');
        errorMessage.classList.add('error-message');
        errorMessage.textContent = mensagem;

        // Inserir mensagem no DOM
        campo.parentNode.appendChild(errorMessage);
    });
}
