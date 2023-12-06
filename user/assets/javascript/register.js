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

const btnShowPass = document.getElementById('buttonPassword');
let passwordVal = document.getElementById('password_user');
let confirmPasswordVal = document.getElementById('confirmPassword');
let visible = false;

btnShowPass.addEventListener('click', () => {
  if (passwordVal.type == 'password') {
    passwordVal.type = 'text';
    confirmPasswordVal.type = 'text';
    btnShowPass.classList.replace('bi-eye-fill', 'bi-eye-slash-fill');
  } else {
    passwordVal.type = 'password';
    confirmPasswordVal.type = 'password';
    btnShowPass.classList.replace('bi-eye-slash-fill', 'bi-eye-fill');
  }
})


$('#phone_user').mask('(99) 99999-9999');

document.getElementById('form-user').addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('name_user').value;
  const age = document.getElementById('data_user').value;
  const gender = document.getElementById('gender_user').value;
  const city = document.getElementById('city_user').value;
  let phone = document.getElementById('phone_user').value;
  const email = document.getElementById('email_user').value;
  let password = document.getElementById('password_user').value;
  let confirmPassword = document.getElementById('confirmPassword').value;

  function removerMascara(tel) {
    let newPhone = tel.replace(/\-/g, '').replace(/\(/g, '').replace(/\)/g, '').replace(/\ /g, '');
    newPhone = parseInt(newPhone);
    return newPhone;
  }

  let data_format = new Date(age).toLocaleDateString('pt-br', { timeZone: 'UTC' });

  const userData = {
    nome: name,
    idade: data_format,
    genero: gender,
    moradia: city,
    email: email,
    telefone: removerMascara(phone),
    senha: password,
  }

  let data_user = new Date(age);

  if (password != confirmPassword) {
    alert(' As senhas não coincidem.');
  } else if (data.getFullYear() - data_user.getFullYear() < 15) {
    alert('Sentimos muito, mas não é possível realizar o cadastro.')
  } else {
    fetch('https://vaiaondecapixaba.com.br/api/usuarios/cadastro/', {
      method: 'POST',
      body: JSON.stringify(userData)
    })

      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Erro ao cadastrar usuário');
        }
      })

      .then(data => {
        window.alert(data['message']);
        if (data['result'] == true) {
          window.location.href = 'index.html';
        }
      })

      .catch(error => {
        console.error('Erro ao fazer requisição à API', error);
      });
  }
})