const urlAPI = 'https://vaiaondecapixaba.com.br/api/';
const favorites = JSON.parse(localStorage.getItem('favoritos')) || [];

async function exibirFavoritos() {
  const cardFavoritos = document.querySelector('.cards');

  for (let fav of favorites) {
    const cardId = `card-${fav.restauranteId || fav.lugarId || fav.eventosId || fav.rotasId}`;
    let item;

    if (fav.restauranteId) {
      item = await getRestById(fav.restauranteId);
      exibirCard('rest', item, cardFavoritos, cardId);
    } else if (fav.lugarId) {
      item = await getPlaceById(fav.lugarId);
      exibirCard('place', item, cardFavoritos, cardId);
    } else if (fav.eventosId) {
      item = await getEventById(fav.eventosId);
      exibirCard('event', item, cardFavoritos, cardId);
    } else if (fav.rotasId) {
      item = await getRouteById(fav.rotasId);
      exibirCard('route', item, cardFavoritos, cardId);
    }
  }

}

function exibirCard(category, item, parentElement, cardId) {
  if (!item) {
    console.error(`Item não encontrado para a categoria ${category} e ID: ${item.id}`);
    return;
  }

  const isFavorite = favorites.some(favorite => favorite.restauranteId === item.id);
  parentElement.innerHTML += `
    <div id=${cardId} class="card ${isFavorite ? 'favorito' : ''}">
      <div class="left-info">
        <img src="${item.capa}" alt="">
      </div>
      <div class="right-info">
        <h2 class="name" onclick="redirect('${category}', '${item.id}')">${item.nome}</h2>
        <div class="bottom-right">
          <div class="average">
          </div>
          <div class="delete">
            <button class='remove-item' onclick="removerDosFavoritos(${item.id}, '${category}')">
              <img src="./public/trash-outline.svg" height="28px" alt="delete-item">
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function getCategoryIcon(category) {
  // Mapeie categorias para ícones correspondentes
  const categoryIcons = {
    rest: './public/restaurant-icon.png',
    place: './public/place-icon.png',
    event: './public/event-icon.png',
    route: './public/route-icon.png',
  };

  return categoryIcons[category] || '';
}


async function getRestById(restId) {
  const response = await fetch(urlAPI + 'restaurantes/?id=' + restId);
  const data = await response.json();
  return data[0];
}
async function getPlaceById(lugarId) {
  const response = await fetch(urlAPI + 'lugares/?id=' + lugarId);
  const data = await response.json();
  return data[0];
}
async function getEventById(eventId) {
  const response = await fetch(urlAPI + 'eventos/?id=' + eventId);
  const data = await response.json();
  return data[0];
}
async function getRouteById(routeId) {
  const response = await fetch(urlAPI + 'rotas/?id=' + routeId);
  const data = await response.json();
  return data[0];
}

function redirect(category, cardId) {
  if (category === 'rest') {
    window.location.href = `restaurante.html?id=${cardId}`;
  } else {
    window.location.href = `lugar.html?id=${cardId}`;
  }
}

async function removerDosFavoritos(itemId, itemType) {
  let favorites = JSON.parse(localStorage.getItem('favoritos')) || [];

  const indexToRemove = favorites.findIndex(favorite => {
    if (itemType === 'rest') {
      return favorite.restauranteId === itemId;
    } else if (itemType === 'place') {
      return favorite.lugarId === itemId;
    } else if (itemType === 'event') {
      return favorite.eventosId === itemId;
    } else if (itemType === 'route') {
      return favorite.rotasId === itemId;
    }
    return false;
  });

  const popup = document.querySelector('.popup');
  const closePopup = document.querySelector('.close-popup');

  if (indexToRemove !== -1) {
    favorites.splice(indexToRemove, 1);
    localStorage.setItem('favoritos', JSON.stringify(favorites));

    const cardId = `card-${itemId}`;
    const cardRemoved = document.getElementById(cardId);

    popup.style.left = '50%';
    setTimeout(() => {
      popup.style.left = '-100%';
    }, 4000);

    closePopup.addEventListener('click', () => {
      popup.style.left = '-100%';
    });

    if (cardRemoved) {
      cardRemoved.remove();
      console.log(`Item ${itemId} removido dos favoritos.`);
    }
  } else {
    console.log(`Item ${itemId} não encontrado nos favoritos.`);
  }
}

window.addEventListener('load', exibirFavoritos);