
function gridOnclick(page) {
  window.location = `./${page}.html`;
}

function back() {
  window.history.back();
}

function verificarLogin(){
  if (localStorage.getItem('usuario') != "logado") {
      window.location.href = 'login.html';
  }
}

// FAV SYS
