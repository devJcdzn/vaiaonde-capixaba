let urlAPI = 'https://vaiaondecapixaba.com.br/api/';

const cardSections = document.querySelector('.cards');
const search = document.querySelector('.searchbar');
const searchBtn = document.querySelector('.searchBtn');

var data = new Date();
var dia = data.getDay();
var hora = data.toLocaleTimeString();

// checar dia hora
function statusPlace(diaAtual, horaAtual, obj) {
  let open = false
  if (diaAtual == 0) {
    if (horaAtual > `${obj.abrirDomingo}:00` && horaAtual < `${obj.fecharDomingo}:00`) {
      open = true;
      return "Aberto Agora"
    } else {
      open = false;
      return "Fechado"
    }
  }

  else if (diaAtual == 1) {
    if (horaAtual > `${obj.abrirSegunda}:00` && horaAtual < `${obj.fecharSegunda}:00`) {
      open = true;
      return "Aberto Agora"
    } else {
      open = false;
      return "Fechado"
    }
  }

  else if (diaAtual == 2) {
    if (horaAtual > `${obj.abrirTerca}:00` && horaAtual < `${obj.fecharTerca}:00`) {
      open = true;
      return "Aberto Agora"
    } else {
      open = false
      return "Fechado"
    }
  }

  else if (diaAtual == 3) {
    if (horaAtual > `${obj.abrirQuarta}:00` && horaAtual < `${obj.fecharQuarta}:00`) {
      open = true;
      return "Aberto Agora"
    } else {
      open = false;
      return "Fechado"
    }
  }

  else if (diaAtual == 4) {
    if (horaAtual > `${obj.abrirQuinta}:00` && horaAtual < `${obj.fecharQuinta}:00`) {
      open = true;
      return "Aberto Agora"
    } else {
      open = false;
      return "Fechado"
    }
  }

  else if (diaAtual == 5) {
    if (horaAtual > `${obj.abrirSexta}:00` && horaAtual < `${obj.fecharSexta}:00`) {
      open = true;
      return "Aberto Agora"
    } else {
      open = false;
      return "Fechado"
    }
  }

  else if (diaAtual == 6) {
    if (horaAtual > `${obj.abrirSabado}:00` && horaAtual < `${obj.fecharSabado}:00`) {
      open = true;
      return "Aberto Agora"
    } else {
      open = false;
      return "Fechado"
    }
  }

}

// filter Button
let filterActive = false;

function handleFilter() {
  const modal = document.querySelector('.filter-modal');

  if (filterActive == false) {
    modal.classList.add('active');
    filterActive = true;
  } else {
    modal.classList.remove('active');
    filterActive = false;
  }
}

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
// ========== //


async function getLugares() {
  const response = await fetch(urlAPI + 'lugares/');
  const data = response.json();
  return data;
}

async function getCategorias() {
  const response = await fetch(urlAPI + 'categoriasLugares/');
  const data = response.json();
  return data;
}



function redirect(res) {
  window.location.href = `lugar.html?id=${res}`;
}

async function exibirCategorias() {
  const data = await getCategorias();
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

async function exibirLugares() {
  const coordinates = await getLocatioinUser();

  const data = await getLugares();
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
  
  const categryBtn = document.querySelectorAll('.options');
  const cards = document.querySelectorAll('.card');



  function filterCards() {
    if (search != '') {
      for (let card of cards) {
        let title = card.querySelector('h2');
        title = title.textContent.toLowerCase();

        let filter = search.value.toLowerCase();

        if (!title.includes(filter)) {
          card.style.display = 'none';
          // search.value = '';
        }
        else {
          card.style.display = 'flex';
          // search.value = '';
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
        if (btn.classList[1] === card.classList[1]) {
          card.style.display = 'flex';
        } 
        else if (btn.classList[1] === 'todos') {
          card.style.display = 'flex';
        }
        else {
          card.style.display = 'none';
        }
      });
    })
  });


  const spanStatus = document.querySelectorAll('.status');
  spanStatus.forEach(span => {
    let status = span.textContent;
    if (status === 'Fechado') {
      span.classList.add('closed');
    }
  });
}


exibirCategorias();
window.addEventListener('load', exibirLugares());