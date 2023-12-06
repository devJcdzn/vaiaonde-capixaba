function verificarLogin() {
  if (localStorage.getItem('usuario') != "logado") {
    window.location.href = 'login.html';
  }
}

function changeAccountInfo() {
  window.location.href = "./alterarinfo.html"
}

function logout() {
  localStorage.setItem('usuario', 'deslogado');
  window.location.href = "../../../index.html";
}

function deleteAccount() {
  const confirmacao = confirm("Tem certeza de que deseja excluir sua conta? Essa ação não pode ser desfeita.");

  if (confirmacao) {
    const userId = localStorage.getItem('id');

    fetch(`https://vaiaondecapixaba.com.br/api/usuarios/remover/?id=${userId}/`, {
      method: 'DELETE',
    })

      .then(response => response.json())

      .then(data => {
        if (data.result) {
          window.location.href = "../../../index.html";
        } else {
          console.error(data.message);
        }
      })
      .catch(error => {
        console.error('Erro:', error);
      });

    logout();
  }
}