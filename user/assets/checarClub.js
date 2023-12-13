const logado = localStorage.getItem('usuario');
const temClub = localStorage.getItem('assinatura');

function checarClub(loginPage, clubPage, clubSign) {
  if(logado == 'logado') {
    if(temClub == 1) {
      window.location.href = clubPage;
    } else {
      window.location.href = clubSign;
    }
  } else {
    window.location.href = loginPage;
  }
}
