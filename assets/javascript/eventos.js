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

async function getEvents() {
  const response = await fetch(urlAPI + 'eventos/');
  const data = response.json();
  return data;
}

async function exibirEvents() {
  const coordinates = await getLocatioinUser();

  const data = await getEvents();
  console.log(data);

  if (data.length > 0) {
    data.forEach((lugares) => {
      cardSections.innerHTML += `
    <div class="card ${lugares.categoria.toLowerCase()}" onclick="redirect(${lugares.id})">
        <div class="top-card">
            <img class="card-banner" src=${lugares.capa} alt="">
        </div>
        <div class="bottom-card">
          <div class="left-infos">
            <h2 class="title">${lugares.nome}</h2>
            <span class="status">${statusPlace(dia, hora, lugares)}</span>
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
  } else {
    cardSections.innerHTML += `<span class="event-null">Nenhum evento encontrado :(</span>`;
  }
}

window.addEventListener('load', exibirEvents);