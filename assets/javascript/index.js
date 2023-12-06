var urlAPI = 'https://vaiaondecapixaba.com.br/api/';
let headers = new Headers();
let userName = document.getElementById("user-name");
let buttonNav = document.getElementById('button-navbar');

let menuLateralItens = document.getElementById('itens-menu-lateral');
let menuLateral = document.querySelectorAll('nav');
let buttonBackNav = document.getElementById('button-back_menu');
let fechaModal = document.getElementById('chefamodal');

const menuLateralInfos = document.querySelector('.menu-lateral-infos');

buttonNav.onclick = () => {
  menuLateral[1].style.display = 'block';
  menuLateral[1].style.position = 'fixed';
  fechaModal.style.display = 'block';
}

fechaModal.onclick = () => {
  menuLateral[1].style.display = 'none';
  fechaModal.style.display = 'none';

}

function logout() {
  const confirmacao = confirm("Tem certeza de que deseja sair da conta?");

  if (confirmacao) {
    localStorage.setItem('usuario', 'deslogado');
    window.location.href = "/";
  }
}


function verificarLogin() {

  if (localStorage.getItem('usuario') == "logado") {
    userName.textContent = localStorage.getItem("nome");

    const li = document.createElement('li');
    li.className = 'options-menu';

    const img = document.createElement('img');
    img.src = 'public/box-arrow-right.svg';

    const a = document.createElement('a');
    a.href = "#";
    a.textContent = 'SAIR';
    a.addEventListener('click', logout);

    li.appendChild(img);
    li.appendChild(a);

    menuLateralInfos.appendChild(li);
  } else {
    userName.textContent = "Visitante";
  }
}

headers.append('Content-Type', 'application/json');
headers.append('Accept', 'application/json');
headers.append('Access-Control-Allow-Credentials', 'true');
headers.append('GET', 'POST', 'OPTIONS');
headers.append('Authorization', 'Basic ');

function redirect(link) {
  window.location.href = `${link}`;
}

function getBanner() {
  fetch(urlAPI + "banner/")
    .then(response => response.json())
    .then(banners => {
      let banner1 = document.getElementById("image-banner1");
      let banner2 = document.getElementById("image-banner2");
      let banner3 = document.getElementById("image-banner3");

      banner1.src = banners[0].imagem;
      banner2.src = banners[1].imagem;
      banner3.src = banners[2].imagem;
    })
    .catch(error => console.error('Erro ao obter Banner da API:', error));
}

function getDestaques() {
  fetch(urlAPI + "destaques/")
    .then(response => response.json())
    .then(destaques => {
      const destaquesList = document.getElementsByClassName('info-destaque-cards')[0];

      destaques.forEach(destaque => {
        const div = document.createElement('div');
        div.className = "cards";
        div.addEventListener('click', () => redirect(destaque.link));


        const img = document.createElement('img');
        img.src = destaque.imagem;

        const div1 = document.createElement('div');
        div1.className = "info-card";

        const span = document.createElement('span');
        span.textContent = destaque.titulo;

        const p = document.createElement('p');
        p.textContent = destaque.descricao;

        div1.appendChild(span);
        div1.appendChild(p);
        div.appendChild(img);
        div.appendChild(div1);
        destaquesList.appendChild(div);
      });
    })
    .catch(error => console.error('Erro ao obter destaques da API:', error));
}

window.addEventListener('load', verificarLogin);
window.addEventListener('load', getDestaques);
window.addEventListener('load', getBanner);