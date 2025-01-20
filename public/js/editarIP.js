document.addEventListener('DOMContentLoaded', function () {
    
    const ipv4Regex = /^(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}$/;
    const ipv6Regex = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;
  
    // Referências aos elementos do formulário
    const formIP = document.querySelector('#formIP');
    const utilizador = document.querySelector('input[name="utilizador"]');
    const matriculaUtilizador = document.querySelector('input[name="matricula_utilizador"]');
    const ipTypeSelect = document.querySelector('#ipType');
    const ipInput = document.querySelector('input[name="ip"]');
    const ipErrorDiv = document.querySelector('#ipError');
  
    formIP.addEventListener('submit', function (e) {
      e.preventDefault(); 
  
      // Limpa mensagens de erro anteriores
      document.querySelectorAll('.error-message').forEach((msg) => (msg.style.display = 'none'));
      ipErrorDiv.innerText = '';
      let hasError = false;
  
      //  Nome do Utilizador
      const utilizadorRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;
      if (!utilizadorRegex.test(utilizador.value.trim())) {
        utilizador.classList.add('error');
        exibirErro(utilizador, 'O nome do utilizador deve conter apenas letras e espaços.');
        hasError = true;
      } else {
        utilizador.classList.remove('error');
      }
  
      // Matrícula do Utilizador
      if (!/^\d{5}$/.test(matriculaUtilizador.value.trim())) {
        matriculaUtilizador.classList.add('error');
        exibirErro(matriculaUtilizador, 'A matrícula deve conter exatamente 5 números.');
        hasError = true;
      } else {
        matriculaUtilizador.classList.remove('error');
      }
  
      // Validação do IP
      const ipValue = ipInput.value.trim();
      const ipType = ipTypeSelect.value;
  
      if (ipType === 'IPv4' && !ipv4Regex.test(ipValue)) {
        ipInput.classList.add('error');
        ipErrorDiv.innerText = 'Por favor, insira um endereço IPv4 válido.';
        ipErrorDiv.style.display = 'block';
        hasError = true;
      } else if (ipType === 'IPv6' && !ipv6Regex.test(ipValue)) {
        ipInput.classList.add('error');
        ipErrorDiv.innerText = 'Por favor, insira um endereço IPv6 válido.';
        ipErrorDiv.style.display = 'block';
        hasError = true;
      } else if (!ipType) {
        ipInput.classList.add('error');
        ipErrorDiv.innerText = 'Por favor, selecione o tipo de IP.';
        ipErrorDiv.style.display = 'block';
        hasError = true;
      } else {
        ipInput.classList.remove('error');
      }
  
      //  envio de formulário
      if (!hasError) {
        console.log('Formulário enviado com sucesso!');
        console.log({
          utilizador: utilizador.value.trim(),
          matricula_utilizador: matriculaUtilizador.value.trim(),
          ipType,
          ip: ipValue,
        });
        formIP.submit(); 
    });
  
    // mensagens de erro
    function exibirErro(input, mensagem) {
      const errorDiv = document.createElement('div');
      errorDiv.classList.add('error-message');
      errorDiv.innerText = mensagem;
      input.parentNode.appendChild(errorDiv);
    }
  });
  