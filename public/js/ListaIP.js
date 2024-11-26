//FUNÇÃO MENSAGEM DE CONFIRMAÇÃO DE DELET 

function confirmDelete(id) {
    Swal.fire({
      title: 'Tem certeza que deseja excluir?',
      text: "Essa ação não pode ser desfeita!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sim, excluir',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        document.getElementById(`delete-form-${id}`).submit();
      }
    });
  }
