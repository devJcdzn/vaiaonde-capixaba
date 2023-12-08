const urlAPI = 'https://vaiaondecapixaba.com.br/api/';
const cardSections = document.querySelector('.cards');

var data = new Date();
var dia = data.getDay();
var hora = data.toLocaleTimeString();

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

async function exibirRestaurantes() {
  const coordinates = await getLocatioinUser();
  const data = await getRestaurantes();

  function temCupom(rest) {
    if (rest != 0) {
      return "active"
    }
  }

  data.forEach(rest => {

    if (rest.temCupom > 0) {
      cardSections.innerHTML += `
        <div class="card ${rest.categoria.toLowerCase()}" onclick="redirect(${rest.id})">
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
              <span class="status">${statusPlace(dia, hora, rest)}</span>
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
    }
  });

  const spanStatus = document.querySelectorAll('.status');
  spanStatus.forEach(span => {
    let status = span.textContent;
    if (status === 'Fechado') {
      span.classList.add('closed');
    }
  })
}

window.addEventListener('load', exibirRestaurantes);