function verificarLogin(){
  if (localStorage.getItem('usuario') != "logado") {
      window.location.href = 'login.html';
  }
}

function logout() {
    
  const confirmacao = confirm("Tem certeza de que deseja sair da conta?");

  if (confirmacao) {
      localStorage.setItem('usuario', 'deslogado');
      window.location.href = "../../user/login.html";
  }
}

function accountSettings() {
  window.location.href = "./account/index.html"
}
function paymentsSettings() {
  window.location.href = "./payments/index.html"
}
function clubSettings() {
  window.location.href = "./club/index.html"
}