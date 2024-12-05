// ==== EVENTO DE ENVIO DO FORMULÁRIO ====
document.querySelector('.login').addEventListener('submit', function (e) {
    e.preventDefault();

    // CAMPOS
    const form = e.target;
    const nome = form.querySelector('input[name="nome"]');
    const email = form.querySelector('input[name="email"]');
    const matricula = form.querySelector('input[name="matricula"]');
    const senha = form.querySelector('input[name="senha"]');
    const confirmarSenha = form.querySelector('input[name="confirmarSenha"]');

    const validacoes = getValidacoes(nome, email, matricula, senha, confirmarSenha);

    // lIMPANDO ERROS
    limparErros();

    const erros = validarCampos(validacoes);

    // MOSTRANDO OS ERROS 
    if (erros.length > 0) {
        exibirErros(erros);
    } else {
        form.submit();
    }
});

// ==== FUNÇÕES DE VALIDAÇÃO GERAL ====

/**
 * REGRAS DE VALIDAÇÃO 
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
            regra: /^[a-zA-Z0-9._-]+@(usinaaltamogiana\.com|usinaaltamogiana\.com\.br|usinaraizen\.com|usinaraizen\.com\.br|usinaguaira\.com|usinaguaira\.com\.br)$/i,
            mensagem: "Use um e-mail corporativo válido (Alta Mogiana, Raizen ou Usina Guaira)."
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
 * REMOVENDO ERROS
 */
function limparErros() {
    document.querySelectorAll('.error').forEach(field => field.classList.remove('error'));
    document.querySelectorAll('.error-message').forEach(msg => msg.remove());
}

/**
 * VALIDAÇÃO COM BASE NAS REGRAS 
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
 *  MENSAGEM DE ERRO AO LADO DO FORMULARIO
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

// ==== VALIDAÇÃO  E-MAIL POR EMPRESA ====

const dominiosPorEmpresa = {
    "1": ["@usinaaltamogiana.com.br", "@usinaaltamogiana.com"],
    "2": ["@usinaraizen.com", "@usinaraizen.com.br"],
    "3": ["@usinaguaira.com", "@usinaguaira.com.br"]
};

/**
 * Valida o e-mail com base no domínio da empresa selecionada.
 */
function validarEmailPorEmpresa() {
    const selectEmpresa = document.getElementById("opcoes");
    const emailInput = document.querySelector("input[name='email']");
    const mensagemErro = document.getElementById("mensagemErro");

    const idEmpresaSelecionada = selectEmpresa.value;
    const email = emailInput.value;

    if (dominiosPorEmpresa[idEmpresaSelecionada]) {
        const dominiosValidos = dominiosPorEmpresa[idEmpresaSelecionada];
        const emailValido = dominiosValidos.some(dominio => email.endsWith(dominio));

        if (!emailValido) {
            mensagemErro.style.display = "block";
            mensagemErro.textContent = "O e-mail deve corresponder à empresa selecionada.";
            emailInput.classList.add("input-erro");
            return false;
        } else {
            mensagemErro.style.display = "none";
            emailInput.classList.remove("input-erro");
        }
    }
    return true;
}

// ==== INICIALIZAÇÃO DA PÁGINA ====

window.onload = function () {
    const inputs = document.querySelectorAll('.login__input');
    inputs.forEach(input => input.value = '');

    const select = document.getElementById('opcoes');
    if (select) select.selectedIndex = 0;
};
