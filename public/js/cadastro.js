
document.querySelector('.login').addEventListener('submit', function (e) {
    e.preventDefault();

    // CAMPOS CHAMADOS
    const form = e.target;
    const nome = form.querySelector('input[name="nome"]');
    const email = form.querySelector('input[name="email"]');
    const matricula = form.querySelector('input[name="matricula"]');
    const senha = form.querySelector('input[name="senha"]');
    const confirmarSenha = form.querySelector('input[name="confirmarSenha"]');
    const selectEmpresa = form.querySelector('#opcoes');

    const validacoes = getValidacoes(nome, email, matricula, senha, confirmarSenha);

    // LIMPANDO ERROS
    limparErros();

    const erros = validarCampos(validacoes);

    // VALIDAÇÃO POR EMAIL EMPRESA
    if (!validarEmailPorEmpresa(selectEmpresa, email)) {
        erros.push({ campo: email, mensagem: "O e-mail deve corresponder à empresa selecionada." });
    }

    // MOSTRANDO OS ERROS 
    if (erros.length > 0) {
        exibirErros(erros);
    } else {
        form.submit();
    }
});

// ==== FUNÇÕES DE VALIDAÇÃO GERAL ====


                /**
                 REGRAS DE VALIDAÇÃO 
                */
    function getValidacoes(nome, email, matricula, senha, confirmarSenha) {
    return [
        {
            campo: nome,
            regra: /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/,
            mensagem: "O nome deve conter apenas letras e espaços."
        },
        {
            campo: email,
            regra: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            mensagem: "O e-mail deve ser válido."
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
}

                /**
                 REMOVENDO ERROS
                */
function limparErros() {
    document.querySelectorAll('.error').forEach(field => field.classList.remove('error'));
    document.querySelectorAll('.error-message').forEach(msg => msg.remove());
}

                /**
                 VALIDAÇÃO COM BASE NAS REGRAS 
                */
function validarCampos(validacoes) {
    const erros = [];
    validacoes.forEach(({ campo, regra, mensagem, comparar }) => {
        const valor = campo.value.trim();

        if (comparar) {
            if (valor !== regra) {
                erros.push({ campo, mensagem });
            }
        } else if (!regra.test(valor)) {
            erros.push({ campo, mensagem });
        }
    });
    return erros;
}

    /**
        FUNÇÃO PARA EXIBIR MENSAGEM DE ERRO AO LADO DO FORMULÁRIO
     */
function exibirErros(erros) {
    erros.forEach(({ campo, mensagem }) => {
        campo.classList.add('error');

        const errorMessage = document.createElement('div');
        errorMessage.classList.add('error-message');
        errorMessage.textContent = mensagem;

        campo.parentNode.appendChild(errorMessage);
    });
}

// ==== VALIDAÇÃO DE E-MAIL POR EMPRESA ====

        /**
         DOMÍNIOS POR EMPRESA
        */
const dominiosPorEmpresa = {
    "1": ["@usinaaltamogiana.com.br", "@usinaaltamogiana.com"],
    "2": ["@usinaraizen.com", "@usinaraizen.com.br"],
    "3": ["@usinaguaira.com", "@usinaguaira.com.br"]
};

/**
  Valida o e-mail com base no domínio da empresa selecionada.
 */
function validarEmailPorEmpresa(selectEmpresa, emailInput) {
    const idEmpresaSelecionada = selectEmpresa.value;
    const email = emailInput.value.trim();

    if (dominiosPorEmpresa[idEmpresaSelecionada]) {
        const dominiosValidos = dominiosPorEmpresa[idEmpresaSelecionada];
        return dominiosValidos.some(dominio => email.endsWith(dominio));
    }
    return false;
}

// ==== INICIALIZAÇÃO DA PÁGINA ====

window.onload = function () {
    const inputs = document.querySelectorAll('.login__input');
    inputs.forEach(input => input.value = '');

    const select = document.getElementById('opcoes');
    if (select) select.selectedIndex = 0;
};
