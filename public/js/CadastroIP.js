  document.addEventListener('DOMContentLoaded', function () {

  // Funções de validação para IPv4 e IPv6
  const ipv4Regex = /^(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}$/;
  const ipv6Regex = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;

  // componentes
  const ipInput = document.querySelector('input[name="ip"]');
  const ipTypeSelect = document.querySelector('select[name="ipType"]');

  // Validação no envio do formulário
  formIP.addEventListener('submit', function (e) {

    //Para estudo: O preventDefault é utilizado para validar os dados do form antes de envia-los.
      e.preventDefault(); 

      // Limpa mensagens de erro anteriores
      document.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
      document.querySelectorAll('.error-message').forEach(msg => msg.remove());


      const utilizador = document.querySelector('input[name="utilizador"]');
      const matricula = document.querySelector('input[name="matricula"]');
      const ip = ipInput.value.trim();
      const ipType = ipTypeSelect.value;

      let erros = [];


      //TODAS AS VALIDAÇÕES

      console.log('Validação do formulário iniciada');
      console.log('IP:', ip);
      console.log('Tipo de IP:', ipType);

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

      // Validação do IP
      if (ipType === 'IPv4') {
          if (!ipv4Regex.test(ip)) {
              erros.push({ field: ipInput, message: "Por favor, insira um endereço IPv4 válido." });
          }
      } else if (ipType === 'IPv6') {
          if (!ipv6Regex.test(ip)) {
              erros.push({ field: ipInput, message: "Por favor, insira um endereço IPv6 válido." });
          }
      } else {
          erros.push({ field: ipInput, message: "Por favor, selecione o tipo de IP." });
      }

      // Exibe os erros ou envia o formulário
      if (erros.length > 0) {
          erros.forEach(erro => {
              erro.field.classList.add('error');

              const errorMessage = document.createElement('div');
              errorMessage.classList.add('error-message');
              errorMessage.textContent = erro.message;

              erro.field.parentNode.appendChild(errorMessage);
          });
      } else {
          console.log('Nenhum erro, enviando o formulário.');
          formIP.submit(); 
      }
  });
});
