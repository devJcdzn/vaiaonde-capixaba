const urlAPI = 'https://vaiaondecapixaba.com.br/api/restaurantes/';
const cardSections = document.querySelector('.cards');

// LoacationUser

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

// CalculateDistance

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

// ========== //

async function getRestaurantes() {
  const response = await fetch(urlAPI);
  const data = response.json();
  return data;
}

async function exibirRestaurantes() {
  const coordinates = await getLocatioinUser();
  const data = await getRestaurantes();

  function temCupom(rest) {
    if (rest != 0) {
      return "active"
    }
  }

  data.forEach(rest => {

    cardSections.innerHTML += `
    <div class="card ${rest.categoria.toLowerCase()}">
    <div class="top-card">
        <div class="voucher ${temCupom(rest.temCupom)} ">
          <img class="voucher-img" src="./public/bookmark-svgrepo-com.svg" alt="">
          <span class="voucher-span">Cupom On</span>
        </div>
        <img class="card-banner" src=${rest.capa} alt="">
    </div>
    <div class="bottom-card">
      <div class="left-infos">
        <h2 class="title">${rest.nome}</h2>
        <span class="status">Aberto agora</span>
      </div>
      <div class="right-infos">
        <span class="distance">${distance(
      coordinates.lat,
      coordinates.long,
      rest.latitude,
      rest.longitude, "K")}KM
        </span>
        <img src="./public/location-sharp.svg" alt="">
        <img src="./public/heart-outline.svg" alt="">
      </div>
    </div>
  </div>
    `
  });

  const cards = document.querySelectorAll('.card');
  const search = document.querySelector('.searchbar');
  const searchBtn = document.querySelector('.searchBtn');
  const categryBtn = document.querySelectorAll('.options');

  function filterCards() {
    if (search != '') {
      for (let card of cards) {
        let title = card.querySelector('h2');
        title = title.textContent.toLowerCase();

        let filter = search.value.toLowerCase();

        if (!title.includes(filter)) {
          card.style.display = 'none';
        }
        else {
          card.style.display = 'flex'
        }
      }
    } else {

    }
  }

  document.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      filterCards();
    }
  })
  searchBtn.addEventListener('click', filterCards);

  // filter buttons

  categryBtn.forEach(btn => {
    btn.addEventListener('click', () => {
      cards.forEach(card => {
        if (btn.classList[1].includes(card.classList[1])) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    })
  })
}

window.addEventListener('load', exibirRestaurantes);