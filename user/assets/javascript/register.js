let valuePassword = document.getElementById('passwordUser')
let confirmPasswowrd = document.getElementById('confirmPassword')
let btnShowPass = document.getElementById('buttonPassword');
let nameUser = document.getElementById('name_user');
let cityUser = document.getElementById('city_user');
let emailUser = document.getElementById('email_user');
let phoneUser = document.getElementById('phone_user');
let dataUSer = document.getElementById('data_user')

  // Aplica a máscara ao campo de telefone
  $('#phone_user').mask("(99) 99999-9999");

function showPassword() {
  if (valuePassword.type === 'password') { 
    valuePassword.setAttribute('type', 'text');
    btnShowPass.classList.replace('bi-eye-fill', 'bi-eye-slash-fill')
  } else {
    valuePassword.type = 'password';
    btnShowPass.classList.replace('bi-eye-slash-fill', 'bi-eye-fill');
  }
}

function validateCampos() {
  const datauser = dataUSer.value
  const valueData = datauser.split('-')
  const dataAtual = new Date()
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (nameUser.value === '') {
      alert('Digite um nome válido')
      nameUser.style.border = "2px solid #e63946"
  }

 if (valueData[0] > 2011 || valueData[0] < 1940 || dataUSer.value === '') {
    alert('DIgite uma data válida')
    dataUSer.style.border = "2px solid #e63946"
 }

  if (cityUser.value === '') {
      alert('Digite Uma cidade válida')
     cityUser.style.border = "2px solid #e63946"
  }

  if (emailUser === '') {
    alert('Este campo não pode ficar vazio')
    emailUser.style.border = "2px solid #e63946"

  } else if (!emailPattern.test(emailUser.value)) {
    alert('Digite um e-mail válido')
    emailUser.style.border = "2px solid #e63946"
    emailUser.textContent = ''
  }

  if (phoneUser.value.length -4 !== 11) {
      alert('Digite um número válido')
      phoneUser.style.border = "2px solid #e63946"
  }

  if (valuePassword.value === '') {
    alert('Forneça uma senha')
    valuePassword.style.border = "2px solid #e63946"
  }

  if (valuePassword.value !== confirmPasswowrd.value) {
       alert('As senhas não se coincidem')
       valuePassword.style.border = "2px solid #e63946"
  };

  
}

valuePassword.addEventListener('focus', () => valuePassword.style.border = 'none')
dataUSer.addEventListener('focus', () => dataUSer.style.border = 'none')
phoneUser.addEventListener('focus', () => phoneUser.style.border = 'none')
cityUser.addEventListener('focus', () => cityUser.style.border = 'none')
emailUser.addEventListener('focus', () => emailUser.style.border = 'none')
nameUser.addEventListener('focus', () => nameUser.style.border = 'none')