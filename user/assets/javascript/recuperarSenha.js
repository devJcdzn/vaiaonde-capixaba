function verificarLogin() {
  if (localStorage.getItem('usuario') == "logado") {
    window.location.href = 'index.html';
  }
}

var data = new Date();

let headers = new Headers();

headers.append('Content-Type', 'application/json');
headers.append('Accept', 'application/json');
headers.append('Access-Control-Allow-Credentials', 'true');
headers.append('GET', 'POST', 'OPTIONS');





document.getElementById("email-form").addEventListener("submit", function (event) {
  event.preventDefault();
  const email = document.querySelector('#email').value;

  if (email) {

    const emailVal = {
      email: email
    };

    console.log(emailVal);

    fetch('https://vaiaondecapixaba.com.br/api/usuarios/esqueciasenha/', {
      method: 'POST',
      body: JSON.stringify(emailVal)
    })

      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Erro ao recuperar senha');
        }
      })

      .then(data => {
        window.alert(data['message']);
        if (data['result'] == true) {
          window.location.href = 'login.html';
        }
      })

      .catch(error => {
        console.error('Erro ao fazer requisição à API', error);
      });
  } else {
    alert('Preencha o campo de email')
  }
});