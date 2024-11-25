// Adiciona a funcionalidade de adicionar pontos automaticamente ao campo de IP
document.querySelector('input[name="ip"]').addEventListener('input', function (e) {
    let input = e.target.value;

    //REMOVE CARACTERES NÃO VALIDOS
    input = input.replace(/[^0-9.:]/g, ''); 

    // Detecta se é IPv4 ou IPv6 conforme o número de pontos ou dois-pontos
    if (input.includes(':')) {

        e.target.dataset.ipType = 'IPv6';
    } else {
        // Caso seja IPv4, insere pontos automaticamente
        input = input.replace(/[^0-9]/g, '').slice(0, 12);
        if (input.length > 3 && input.length <= 6) {
            input = input.replace(/^(\d{3})(\d+)/, '$1.$2');
        } else if (input.length > 6 && input.length <= 9) {
            input = input.replace(/^(\d{3})(\d{3})(\d+)/, '$1.$2.$3');
        } else if (input.length > 9) {
            input = input.replace(/^(\d{3})(\d{3})(\d{3})(\d+)/, '$1.$2.$3.$4');
        }
        e.target.dataset.ipType = 'IPv4';
    }

    // Atualiza o valor do campo
    e.target.value = input;
});

// Validação no envio do formulário
document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault(); 

    const utilizador = document.querySelector('input[name="utilizador"]');
    const matricula = document.querySelector('input[name="matricula"]');
    const ipInput = document.querySelector('input[name="ip"]');
    const ip = ipInput.value.trim();
    const ipType = ipInput.dataset.ipType || 'Desconhecido';

    // Limpar classes de erro e mensagens anteriores
    document.querySelectorAll('.error').forEach(field => field.classList.remove('error'));
    document.querySelectorAll('.error-message').forEach(msg => msg.remove());

    // Lista de erros
    let erros = [];

    // Validação de Nome completo
    const utilizadorRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;
    if (!utilizadorRegex.test(utilizador.value.trim())) {
        erros.push({ field: utilizador, message: "O nome do utilizador deve conter apenas letras e espaços." });
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

    // Validação de IP
    const ipv4Regex = /^(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}$/;
    const ipv6Regex = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;

    if (ipType === 'IPv4' && !ipv4Regex.test(ip)) {
        erros.push({ field: ipInput, message: "Por favor, insira um endereço IPv4 válido." });
    } else if (ipType === 'IPv6' && !ipv6Regex.test(ip)) {
        erros.push({ field: ipInput, message: "Por favor, insira um endereço IPv6 válido." });
    } else if (ipType === 'Desconhecido') {
        erros.push({ field: ipInput, message: "Endereço de IP inválido. Use IPv4 ou IPv6." });
    }


    if (erros.length > 0) {
        erros.forEach(erro => {
            erro.field.classList.add('error');

            const errorMessage = document.createElement('div');
            errorMessage.classList.add('error-message');
            errorMessage.textContent = erro.message;

            erro.field.parentNode.appendChild(errorMessage);
        });
    } else {
        //IRA EXIBIR O TIPO DE IP
        console.log(`Tipo de IP detectado: ${ipType}`);

        // Se tudo estiver correto, envia o formulário
        e.target.submit();
    }
});
