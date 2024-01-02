const cardSections = document.querySelector('.cards');
let urlAPI = 'https://vaiaondecapixaba.com.br/api/';

const backBtn = document.querySelector('#backBtn');
backBtn.addEventListener('click', () => window.history.back());

// Geolocation and distance
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

async function getRotas() {
  const response = await fetch(urlAPI + 'rotas/');
  const data = response.json();
  return data;
}

function redirect(res) {
  window.location.href = `rota.html?id=${res}`;
}

async function getGategorias() {
  const response = await fetch(urlAPI + 'categoriasLugares/');
  const data = response.json();
  return data;
}

async function exibirCategorias() {
  const data = await getGategorias();
  const categoryList = document.querySelector('.options-category');
  data.forEach(categoria => {
    categoryList.innerHTML += `
    <ul>
        <li class="options ${categoria.nome.toLowerCase()}">
          ${categoria.nome}
        </li>
        
      </ul>
    `
  })
}

async function exibirRotas() {
  const coordinates = await getLocatioinUser();

  const data = await getRotas();

  if (data.length > 0) {
    data.forEach((lugares) => {

      let primeiraEstrela = lugares.primeiraEstrela;
      let segundaEstrela = lugares.segundaEstrela;
      let terceiraEstrela = lugares.terceiraEstrela;
      let quartaEstrela = lugares.quartaEstrela;
      let quintaEstrela = lugares.quintaEstrela;

      let total = primeiraEstrela + segundaEstrela + terceiraEstrela + quartaEstrela + quintaEstrela;

      let media = (primeiraEstrela + (segundaEstrela * 2) + (terceiraEstrela * 3) + (quartaEstrela * 4) + (quintaEstrela * 5)) / total;

      let nota = Math.round(media);

      cardSections.innerHTML += `
    <div class="card" onclick="redirect(${lugares.id})">
        <div class="top-card">
            <img class="card-banner" src=${lugares.capa} alt="">
        </div>
        <div class="bottom-card">
          <div class="left-infos">
            <h2 class="title">${lugares.nome}</h2>
            <span class="status">${lugares.cidade}</span>
            <div class="average ${nota}">
            </div>
          </div>
          <div class="right-infos">
            <span class="distan">${distance(
        coordinates.lat,
        coordinates.long,
        lugares.latitude,
        lugares.longitude, "K")}KM
              </span>
            <img src="./public/location-sharp.svg" alt="">
            <img src="./public/heart-outline.svg" alt="">
            </div>
            </div>
            </div>`
    });

    const cards = document.querySelectorAll('.card');
    const categryBtn = document.querySelectorAll('.options');

    categryBtn.forEach(btn => {
      btn.addEventListener('click', () => {
        cards.forEach(card => {
          if (btn.classList[1].includes(card.classList[1])) {
            card.style.display = 'flex';
          }
          else if (btn.classList[1] === 'todos') {
            card.style.display = 'flex';
          }
          else {
            card.style.display = 'none';
          }
        });
      });
    });

    const average = document.querySelectorAll('.average');
    average.forEach(stars => {
      const nota = stars.classList[1];
      for (let i = 0; i < nota; i++) {
        const star = document.createElement('img');
        star.src = './public/star-fill.svg';
        star.style.height = '18px';
        stars.appendChild(star);
      }
      for (let i = 0; i < 5 - nota; i++) {
        const star = document.createElement('img');
        star.src = './public/star-not-av.svg';
        star.style.height = '18px';
        stars.appendChild(star);
      }
    });

  } else {
    cardSections.innerHTML += `<span class="event-null">Nenhuma rota disponível :(</span>`;
  }
}

window.addEventListener('load', exibirCategorias);
window.addEventListener('load', exibirRotas);