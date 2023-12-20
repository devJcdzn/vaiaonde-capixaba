var urlAPI = "https://vaiaondecapixaba.com.br/api/restaurantes/"
let headers = new Headers();

headers.append('Content-Type', 'application/json');
headers.append('Accept', 'application/json');

headers.append('Access-Control-Allow-Credentials', 'true');

headers.append('GET', 'POST', 'OPTIONS');
headers.append('Authorization', 'Basic ');

const divSlide1 = document.getElementsByClassName('carousel-item')[0];
const divSlide2 = document.getElementsByClassName('carousel-item')[1];
const divSlide3 = document.getElementsByClassName('carousel-item')[2];
const divSlide4 = document.getElementsByClassName('carousel-item')[3];

const infoPlace = document.querySelector('.info-restaurante');

const backBtn = document.querySelector('#backBtn');
backBtn.addEventListener('click', () => window.history.back());

var data = new Date();
var dia = data.getDay();
var hora = data.toLocaleTimeString();
var userLatitude = localStorage.getItem('latitude')
var userLongitude = localStorage.getItem('longitude')

function formatarNumero(numero) {
  const numeroLimpo = String(numero).replace(/\D/g, '');

  const regex = /^(\d{2})(\d{5})(\d{4})$/;
  const resultado = numeroLimpo.replace(regex, '($1) $2-$3');

  return resultado;
}

async function getLocatioinUser() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const latitude = pos.coords.latitude;
        const longitude = pos.coords.longitude;

        const coordinates = {
          lat: latitude,
          long: longitude,
        };

        resolve(coordinates);
      },
      (error) => {
        reject(error);
      }
    );
  });
}

function distance(lat1, lon1, lat2, lon2, unit) {
  const radlat1 = Math.PI * lat1 / 180;
  const radlat2 = Math.PI * lat2 / 180;
  const radlon1 = Math.PI * lon1 / 180;
  const radlon2 = Math.PI * lon2 / 180;
  const theta = lon1 - lon2;
  const radtheta = Math.PI * theta / 180;
  let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  dist = Math.acos(dist);
  dist = dist * 180 / Math.PI;
  dist = dist * 60 * 1.1515;
  if (unit === "K") { dist = dist * 1.609344 }
  if (unit === "N") { dist = dist * 0.8684 }
  return dist.toFixed(2);
}

function getCarouselImages() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');

  fetch(urlAPI + `?id=${id}/`)
    .then(res => res.json())
    .then(restaurantes => {
      restaurantes.forEach(rest => {
        const img1 = document.createElement('img');
        img1.src = `${rest.primeiraFoto}`
        divSlide1.appendChild(img1)

        const img2 = document.createElement('img');
        img2.src = `${rest.segundaFoto}`
        divSlide2.appendChild(img2)

        const img3 = document.createElement('img');
        img3.src = `${rest.terceiraFoto}`
        divSlide3.appendChild(img3)

        const img4 = document.createElement('img');
        img4.src = `${rest.quartaFoto}`
        divSlide4.appendChild(img4)
      })
    })
}

function getPlaceName() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');

  fetch(urlAPI + `?id=${id}/`)
    .then(res => res.json())
    .then(restaurante => {

      restaurante.forEach(rest => {
        const h1 = document.createElement('h1');
        h1.textContent = `${rest.nome.toUpperCase()}`
        infoPlace.appendChild(h1);

        const p = document.createElement('p');
        p.textContent = `${rest.categoria}`
        h1.appendChild(p);
      })
    })

}

async function getDistance() {
  const coordinates = await getLocatioinUser()
  const distancia = document.querySelector('.distance');

  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');

  fetch(urlAPI + `?id=${id}/`)
    .then(res => res.json())
    .then(restaurant => {
      restaurant.forEach(rest => {
        var latitudeRestaurante = rest.latitude;
        var longitudeRestaurante = rest.longitude;
        distancia.innerHTML =
          `
          ${distance(coordinates.lat, coordinates.long, latitudeRestaurante, longitudeRestaurante, "K")}KM
        `;
      })
    })
}

function getStatus() {
  const statusSpan = document.querySelector('.status');
  const cupomSpan = document.querySelector('.cupom');

  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');

  fetch(urlAPI + `?id=${id}/`)
    .then(response => response.json())
    .then(restaurant => {
      restaurant.forEach(rest => {

        if (dia == 0) {
          if (hora > `${rest.abrirDomingo}:00` && hora < `${rest.fecharDomingo}:00`) {
            statusSpan.textContent = "Restaurante Aberto";
          } else {
            statusSpan.textContent = "Restaurante Fechado";
          }
        }

        else if (dia == 1) {
          if (hora > `${rest.abrirSegunda}:00` && hora < `${rest.fecharSegunda}:00`) {
            statusSpan.textContent = "Restaurante Aberto";
          } else {
            statusSpan.textContent = "Restaurante Fechado";
          }
        }

        else if (dia == 2) {
          if (hora > `${rest.abrirTerca}:00` && hora < `${rest.fecharTerca}:00`) {
            statusSpan.textContent = "Restaurante Aberto";
          } else {
            statusSpan.textContent = "Restaurante Fechado";
          }
        }

        else if (dia == 3) {
          if (hora > `${rest.abrirQuarta}:00` && hora < `${rest.fecharQuarta}:00`) {
            statusSpan.textContent = "Restaurante Aberto";
          } else {
            statusSpan.textContent = "Restaurante Fechado";
          }
        }

        else if (dia == 4) {
          if (hora > `${rest.abrirQuinta}:00` && hora < `${rest.fecharQuinta}:00`) {
            statusSpan.textContent = "Restaurante Aberto";
          } else {
            statusSpan.textContent = "Restaurante Fechado";
          }
        }

        else if (dia == 5) {
          if (hora > `${rest.abrirSexta}:00` && hora < `${rest.fecharSexta}:00`) {
            statusSpan.textContent = "Restaurante Aberto";
          } else {
            statusSpan.textContent = "Restaurante Fechado";
          }
        }

        else if (dia == 6) {
          if (hora > `${rest.abrirSabado}:00` && hora < `${rest.fecharSabado}:00`) {
            statusSpan.textContent = "Restaurante Aberto";
          } else {
            statusSpan.textContent = "Restaurante Fechado";
          }
        }

        if (localStorage.getItem('assinatura') == 1 && rest.temCupom ==1) {
          cupomSpan.style.display = 'flex';
          cupomSpan.textContent= 'Usar cupom';
          cupomSpan.addEventListener('click', () => {
            window.location.href = `./qrCode/index.html?id=${rest.id}`;
          })
        } else if (rest.temCupom == 1 && localStorage.getItem('assinatura') != 1) {
          cupomSpan.textContent = 'Cupom indisponível';
          cupomSpan.addEventListener('click', () => {
            window.location.href = './user/assinar.html';
          })
        } else {
          cupomSpan.style.display = 'none';
        }
      })

    })
}

function getInfo() {
  const p1 = document.getElementsByClassName('dias')[0];
  const p2 = document.getElementsByClassName('dias')[1];
  const p3 = document.getElementsByClassName('dias')[2];
  const p4 = document.getElementsByClassName('dias')[3];
  const p5 = document.getElementsByClassName('dias')[4];
  const p6 = document.getElementsByClassName('dias')[5];
  const p7 = document.getElementsByClassName('dias')[6];

  const pReview = document.querySelector('.review');

  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');

  fetch(urlAPI + `?id=${id}/`)
    .then(response => response.json())
    .then(restaurant => {
      restaurant.forEach(rest => {
        if (rest.fecharSegunda == "00:01") {
          p1.textContent = `Segunda - Não Abre`;
        } else {
          p1.textContent = `Segunda - ${rest.abrirSegunda} - ${rest.fecharSegunda}`;
        }

        if (rest.fecharTerca == "00:01") {
          p2.textContent = `Terça - Não Abre`;
        } else {
          p2.textContent = `Terça - ${rest.abrirTerca} - ${rest.fecharTerca}`;
        }

        if (rest.fecharQuarta == "00:01") {
          p3.textContent = `Quarta - Não Abre`;
        } else {
          p3.textContent = `Quarta - ${rest.abrirQuarta} - ${rest.fecharQuarta}`;
        }

        if (rest.fecharQuinta == "00:01") {
          p4.textContent = `Quinta - Não Abre`;
        } else {
          p4.textContent = `Quinta - ${rest.abrirQuinta} - ${rest.fecharQuinta}`;
        }

        if (rest.fecharSexta == "00:01") {
          p5.textContent = `Sexta - Não Abre`;
        } else {
          p5.textContent = `Sexta - ${rest.abrirSexta} - ${rest.fecharSexta}`;
        }

        if (rest.fecharSabado == "00:01") {
          p6.textContent = `Sabado - Não Abre`;
        } else {
          p6.textContent = `Sabado - ${rest.abrirSabado} - ${rest.fecharSabado}`;
        }

        if (rest.fecharDomingo == "00:01") {
          p7.textContent = `Domingo - Não Abre`;
        } else {
          p7.textContent = `Domingo - ${rest.abrirDomingo} - ${rest.fecharDomingo}`;
        }

        pReview.textContent = `${rest.review}`;
      })

    })
}

function getContact() {
  const aInstagram = document.querySelector('.link-instagram');
  const txtInstagram = document.querySelector('.text-instagram');
  const aPhone = document.querySelector('.link-phone');
  const txtPhone = document.querySelector('.text-phone');
  const reelsBtn = document.querySelector('.reels');

  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');

  fetch(urlAPI + `?id=${id}/`)
    .then(response => response.json())
    .then(restaurant => {
      restaurant.forEach(rest => {
        aInstagram.href = `${rest.instagramURL}`;
        txtInstagram.textContent = `${rest.instagram}`;
        aPhone.href = `tel:+55${rest.telefone}`;

        const numeroFormatado = formatarNumero(rest.telefone);
        txtPhone.textContent = numeroFormatado;

        if (rest.temReels == 1) {
          reelsBtn.addEventListener('click', () => window.location.href = `${rest.linkReels}`)
        } else {
          reelsBtn.style.display = "none"
        }
      })
    })
}

function getAdress() {
  const address = document.querySelector('.adress-place');
  const mapView = document.querySelector('.map-view');
  const uberView = document.querySelector('.uber-view');

  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');

  fetch(urlAPI + `?id=${id}/`)
    .then(response => response.json())
    .then(restaurant => {
      restaurant.forEach(rest => {
        address.href = `${rest.linkLocal}`;
        address.textContent = `${rest.local}`;


        mapView.addEventListener('click',() => window.location.href = `${rest.linkLocal}`);
        uberView.addEventListener('click', () => window.location.href = `${rest.linkUber}`);
      })
    })
}


window.addEventListener('load', getCarouselImages);
window.addEventListener('load', getPlaceName);
window.addEventListener('load', getDistance);
window.addEventListener('load', getStatus);
window.addEventListener('load', getInfo);
window.addEventListener('load', getContact);
window.addEventListener('load', getAdress);