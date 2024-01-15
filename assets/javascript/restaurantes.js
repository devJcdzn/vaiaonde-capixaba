const urlAPI = 'https://vaiaondecapixaba.com.br/api/';
const cardSections = document.querySelector('.cards');

var data = new Date();
var dia = data.getDay();
var hora = data.toLocaleTimeString();
var favorite = false;

const backBtn = document.querySelector('#backBtn');
backBtn.addEventListener('click', () => window.history.back());

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
  const response = await fetch(urlAPI + 'restaurantes/');
  const data = response.json();
  return data;
}

async function getGategorias() {
  const response = await fetch(urlAPI + 'categoriasRestaurantes/');
  const data = response.json();
  return data;
}

function redirect(res) {
  window.location.href = `restaurante.html?id=${res}`;
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

async function setFavorites(restauranteId) {
  let favorites = JSON.parse(localStorage.getItem('favoritos')) || [];
  const restauranteExistente = favorites.find(favorite => favorite.restauranteId === restauranteId);

  const popup = document.querySelector('.popup');
  const closePopup = document.querySelector('.close-popup');

  if (!restauranteExistente) {
    favorites.push({ restauranteId });
    localStorage.setItem('favoritos', JSON.stringify(favorites));


    popup.style.left = '50%';
    setTimeout(() => {
      popup.style.left = '-100%';
    }, 4000);

    closePopup.addEventListener('click', () => {
      popup.style.left = '-100%';
    });

  } else {
    favorites = favorites.filter(favorite => favorite.restauranteId !== restauranteId);
    localStorage.setItem('favoritos', JSON.stringify(favorites));

    popup.style.left = '50%';
    popup.textContent = "Item removido dos Favoritos."
    setTimeout(() => {
      popup.style.left = '-100%';
    }, 4000);

    closePopup.addEventListener('click', () => {
      popup.style.left = '-100%';
    });

    console.log(`Restaurante ${restauranteId} removido dos favoritos!`);
  }

  const favoriteButton = document.querySelector(`.favorite-${restauranteId}`);
  if (favoriteButton) {
    const isFavorite = favorites.some(favorite => favorite.restauranteId === restauranteId);
    favoriteButton.src = `./public/heart-${isFavorite ? 'filled' : 'outline'}.svg`;
  }
}

async function exibirRestaurantes() {
  const coordinates = await getLocatioinUser();
  const data = await getRestaurantes();

  const favorites = JSON.parse(localStorage.getItem('favoritos')) || [];

  function temCupom(rest) {
    if (rest != 0) {
      return "active"
    }
  }

  data.forEach(rest => {

    const isFavorite = favorites.some(favorite => favorite.restauranteId === rest.id);

    let primeiraEstrela = rest.primeiraEstrela;
    let segundaEstrela = rest.segundaEstrela;
    let terceiraEstrela = rest.terceiraEstrela;
    let quartaEstrela = rest.quartaEstrela;
    let quintaEstrela = rest.quintaEstrela;

    let total = primeiraEstrela + segundaEstrela + terceiraEstrela + quartaEstrela + quintaEstrela;

    let media = (primeiraEstrela + (segundaEstrela * 2) + (terceiraEstrela * 3) + (quartaEstrela * 4) + (quintaEstrela * 5)) / total;

    let nota = Math.round(media);

    cardSections.innerHTML += `
      <div class="card ${rest.categoria.toLowerCase()}">
        <div class="top-card" onclick="redirect(${rest.id})">
            <div class="voucher ${temCupom(rest.temCupom)} ">
              <img class="voucher-img" src="./public/bookmark-svgrepo-com.svg" alt="">
              <span class="voucher-span">Cupom On</span>
            </div>
            <img class="card-banner" src=${rest.capa} alt="">
        </div>
        <div class="bottom-card">
          <div class="left-infos">
            <h2 class="title">${rest.nome}</h2>
            <span class="status">${statusPlace(dia, hora, rest)}</span>
            <div class="average ${nota}">
            </div>
          </div>
          <div class="right-infos">
            <span class="distance">${distance(
      coordinates.lat,
      coordinates.long,
      rest.latitude,
      rest.longitude, "K")}KM
            </span>
            <img src="./public/location-sharp.svg" alt="">
            <img class="favorite-${rest.id}" onclick="setFavorites(${rest.id})" src= ${isFavorite ? "./public/heart-filled.svg" : "./public/heart-outline.svg"} alt="">
            </div>
        </div>
      </div>
    `


  });


  const cards = document.querySelectorAll('.card');
  const search = document.querySelector('.searchbar');
  const searchBtn = document.querySelector('.searchBtn');
  const categryBtn = document.querySelectorAll('.options');
  const favBtns = document.querySelectorAll('.favorite-button');




  function filterCards() {
    if (search != '') {
      for (let card of cards) {
        let title = card.querySelector('h2');
        title = title.textContent.toLowerCase();

        let filter = search.value.toLowerCase();

        if (!title.includes(filter)) {
          card.style.display = 'none';
          search.value = '';
        }
        else {
          card.style.display = 'flex';
          search.value = '';
        }
      }
    } else { }
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
        }
        else if (btn.classList[1] === 'todos') {
          card.style.display = 'flex';
        }
        else {
          card.style.display = 'none';
        }
      });
    })
  })

  const spanStatus = document.querySelectorAll('.status');
  spanStatus.forEach(span => {
    let status = span.textContent;
    if (status === 'Fechado') {
      span.classList.add('closed');
    }
  })

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

}

// checkFavorites();
exibirCategorias();
window.addEventListener('load', exibirRestaurantes);