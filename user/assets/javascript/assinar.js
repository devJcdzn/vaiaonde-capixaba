function verificarLogin() {
  if (localStorage.getItem('usuario') != "logado") {
      window.location.href = 'login.html';
  }
}

function backHistory() {
  window.history.back();
}