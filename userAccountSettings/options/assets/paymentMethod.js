function verificarLogin(){
  if (localStorage.getItem('usuario') != "logado") {
      window.location.href = 'login.html';
  }
}