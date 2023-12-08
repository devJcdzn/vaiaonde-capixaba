var urlAPI = "https://vaiaondecapixaba.com.br/api/eventos/"
let headers = new Headers();

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

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
var userLatitude = localStorage.getItem('latitude');
var userLongitude = localStorage.getItem('longitude');

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
        img1.src = `${rest.capa}`
        divSlide1.appendChild(img1);
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
        distancia.innerHTML = `${rest.cidade}`;
      })
    })
}

function getDay() {
  const statusSpan = document.querySelector('.status');

  fetch(urlAPI + `?id=${id}/`)
    .then(res => res.json())
    .then(events => {
      events.forEach(event => {
        statusSpan.textContent = `Dia: ${event.dia}`;
      })
    })
}

function getTime() {
  const inicio = document.getElementsByClassName('dias')[0];
  const terminio = document.getElementsByClassName('dias')[1];

  fetch(urlAPI + `?id=${id}/`)
    .then(res => res.json())
    .then(events => {
      events.forEach(event => {
        inicio.textContent = `Abertura: ${event.horarioAbertura}`;
        terminio.textContent = `Fechamento: ${event.horarioFechamento}`;
      })
    })
}

function getContact() {
  const aInstagram = document.querySelector('.link-instagram');
  const txtInstagram = document.querySelector('.text-instagram');
  const aPhone = document.querySelector('.link-phone');
  const txtPhone = document.querySelector('.text-phone');


  fetch(urlAPI + `?id=${id}/`)
    .then(response => response.json())
    .then(restaurant => {
      restaurant.forEach(rest => {
        if (rest.instagramURL != '') {
          aInstagram.href = `${rest.instagramURL}`;
        } else {
          aInstagram.style.display = 'none';
        }
        if (rest.instagram != '') {
          txtInstagram.textContent = `${rest.instagram}`;
        } else {
          txtInstagram.textContent = 'Instagram';
        }
        if (rest.telefone != '') {
          aPhone.href = `tel:+55${rest.telefone}`;
          const numeroFormatado = formatarNumero(rest.telefone);
          txtPhone.textContent = numeroFormatado;
        } else {
          txtPhone.textContent = 'Não possui telefone de contato';
        }

      })
    })
}

function getAdress() {
  const address = document.querySelector('.adress-place');
  const mapView = document.querySelector('.map-view');
  const siteView = document.querySelector('.site-view');

  const pReview = document.querySelector('.review');

  fetch(urlAPI + `?id=${id}/`)
    .then(response => response.json())
    .then(restaurant => {
      restaurant.forEach(rest => {
        address.href = `https://${rest.linkLocal}`;
        address.textContent = `${rest.cidade}`;

        siteView.addEventListener('click', () => window.location.href = `https://${rest.linkLocal}`);
        pReview.textContent = rest.review;
      })
    })
}

window.addEventListener('load', getCarouselImages);
window.addEventListener('load', getPlaceName);
window.addEventListener('load', getDistance);
window.addEventListener('load', getDay);
window.addEventListener('load', getTime);
window.addEventListener('load', getContact);
window.addEventListener('load', getAdress);