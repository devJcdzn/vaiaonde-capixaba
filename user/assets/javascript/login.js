let submitButton = document.getElementById('submit_button');
const messageError = document.querySelector('.error-login');

function showPassword() {
  const inputPassword = document.getElementById('input-password');
  const buttonShowPassword = document.getElementById('button-password');

  if(inputPassword.type === 'password') {
    inputPassword.setAttribute('type', 'text');
    buttonShowPassword.classList.replace('bi-eye-fill', 'bi-eye-slash-fill');
  } else {
    inputPassword.setAttribute('type', 'password');
    buttonShowPassword.classList.replace('bi-eye-slash-fill', 'bi-eye-fill');
  }
}

function verificarLogin() {
  if (localStorage.getItem('usuario') == "logado") {
    window.location.href = 'index.html';
  }
}

let headers = new Headers();

headers.append('Content-Type', 'application/json');
headers.append('Accept', 'application/json');
headers.append('Access-Control-Allow-Credentials', 'true');
headers.append('GET', 'POST', 'OPTIONS');

function entrar() {

  var email = document.getElementById("input-email").value;
  var senha = document.getElementById("input-password").value;

  const loginData = {
    email: email,
    senha: senha
  };

  fetch('https://vaiaondecapixaba.com.br/api/usuarios/login/', {
    method: 'POST',
    body: JSON.stringify(loginData)
  })
    .then(response => response.json())

    .then(data => {
      if (data.success) {
        localStorage.setItem('usuario', "logado");
        localStorage.setItem('senha', data.usuario.senha);
        localStorage.setItem('id', data.usuario.id);
        localStorage.setItem('nome', data.usuario.nome);
        localStorage.setItem('idade', data.usuario.idade);
        localStorage.setItem('genero', data.usuario.genero);
        localStorage.setItem('moradia', data.usuario.moradia);
        localStorage.setItem('genero', data.usuario.genero);
        localStorage.setItem('telefone', data.usuario.telefone);
        localStorage.setItem('email', data.usuario.email);
        localStorage.setItem('assinatura', data.usuario.assinatura);
        window.location.href = "index.html"
      } else {
        const input = document.querySelector('input');

        messageError.style.display = 'block';
        input.addEventListener('focus', () => messageError.style.display = 'none');
      }
    })

    .catch(error => {
      console.error('Erro:', error);
    });
}

window.addEventListener('load', verificarLogin);