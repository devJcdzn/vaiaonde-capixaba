function verificarLogin() {
    if (localStorage.getItem('usuario') != "logado") {
        window.location.href = 'login.html';
    }
}

function verificarAssinatura() {
    const loginData = {
        email: localStorage.getItem('email'),
        senha: localStorage.getItem('senha')
    };

    fetch('https://vaiaondecapixaba.com.br/api/usuarios/login/', {
        method: 'POST',
        body: JSON.stringify(loginData)
    })
        .then(response => response.json())

        .then(data => {
            if (data.success) {
                localStorage.setItem('assinatura', data.usuario.assinatura);
            } else {
                window.alert("Credenciais incorretas!");
            }
        })

        .catch(error => {
            console.error('Erro:', error);
        });
}

function logout() {

    const confirmacao = confirm("Tem certeza de que deseja sair da conta?");

    if (confirmacao) {
        localStorage.setItem('usuario', 'deslogado');
        window.location.href = "login.html";
    }
}

function deletarConta() {
    const confirmacao = confirm("Tem certeza de que deseja excluir sua conta? Essa ação não pode ser desfeita.");

    if (confirmacao) {
        const userId = localStorage.getItem('id');

        fetch(`https://vaiaondecapixaba.com.br/api/usuarios/remover/?id=${userId}/`, {
            method: 'DELETE',
        })

            .then(response => response.json())

            .then(data => {
                if (data.result) {
                    window.location.href = "login.html";
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



async function getUser() {
    const userId = localStorage.getItem('id');
    const response = await fetch(`https://vaiaondecapixaba.com.br/api/usuarios/?id=${userId}`);
    const data = await response.json();

    return data;
};



let date = new Date();
let headers = new Headers();
var perfil = document.getElementById("user-img");
var nome = document.getElementById("name-user");
var idade = document.getElementById("data-nascimento");
var email = document.getElementById("email-user");
var telefone = document.getElementById("telefone-user");
var cupons = document.getElementById("voucher-user");
var botaoAssinatura = document.getElementById("assinaturaButton");

headers.append('Content-Type', 'application/json');
headers.append('Accept', 'application/json');
headers.append('Access-Control-Allow-Credentials', 'true');
headers.append('GET', 'POST', 'OPTIONS', 'DELETE');

let age = localStorage.getItem('idade');
let tel = localStorage.getItem('telefone');

function formatAge(age) {
    if (age) {

        let formatedAge = age.replace(/\-/g, '');

        const year = formatedAge.slice(0, 4);
        const month = formatedAge.slice(4, 6);
        const day = formatedAge.slice(6, 9);

        formatedAge = `${day}/${month}/${year}`;

        return formatedAge;
    }
}

function formatTel(tel) {
    if (tel && tel.indexOf('null')) {
        let ddd = tel.slice(0, 2);
        let firstPart = tel.slice(2, 7);
        let secondPart = tel.slice(7, 11);

        let formatedTel = `(${ddd}) ${firstPart}-${secondPart}`;
        return formatedTel;
    } else {
        return 'Sem telefone.';
    }
}

async function getCupons() {
    const data = await getUser();
    console.log(data[0])
    cupons.textContent = data[0].quantidade_cupons;
}

nome.textContent = localStorage.getItem('nome');

idade.textContent = formatAge(age);

email.textContent = localStorage.getItem('email');

telefone.textContent = formatTel(tel);

getCupons();

window.addEventListener('load', verificarLogin);
window.addEventListener('load', verificarAssinatura);