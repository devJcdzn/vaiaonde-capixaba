const urlAPI = 'https://vaiaondecapixaba.com.br/api/';

async function exibirFavoritos() {
  const favorites = JSON.parse(localStorage.getItem('favoritos')) || [];
  const cardFavoritos = document.querySelector('.cards');


  for (let fav of favorites) {
    const cardId = `card-${fav.restauranteId || fav.lugarId}`;

    const item = fav.restauranteId ? await getRestById(fav.restauranteId) : await getPlaceById(fav.lugarId);
    const category = fav.restauranteId ? 'rest' : 'place';


    let primeiraEstrela = item.primeiraEstrela;
    let segundaEstrela = item.segundaEstrela;
    let terceiraEstrela = item.terceiraEstrela;
    let quartaEstrela = item.quartaEstrela;
    let quintaEstrela = item.quintaEstrela;

    let total = primeiraEstrela + segundaEstrela + terceiraEstrela + quartaEstrela + quintaEstrela;

    let media = (primeiraEstrela + (segundaEstrela * 2) + (terceiraEstrela * 3) + (quartaEstrela * 4) + (quintaEstrela * 5)) / total;

    let nota = Math.round(media);

    if (!item) {
      console.error(`Item não encontrado para ID: ${fav.restauranteId || fav.lugarId}`);
      continue;
    }

    cardFavoritos.innerHTML += `
      <div id=${cardId} class="card">
        <div class="left-info">
          <img src="${item.capa}" alt="">
        </div>
        <div class="right-info">
          <h2 class="name" onclick="redirect('${category}', '${item.id}')">${item.nome}</h2>
          <div class="bottom-right">
            <div class="average ${nota}">
            </div>
            <div class="delete">
              <button class='remove-item' onclick="removerDosFavoritos(${item.id})">
                <img src="./public/trash-outline.svg" height="28px" alt="delete-item">
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

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
};


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

function redirect(category, cardId) {
  if (category === 'rest') {
    window.location.href = `restaurante.html?id=${cardId}`;
  } else {
    window.location.href = `lugar.html?id=${cardId}`;
  }
}

async function removerDosFavoritos(restauranteId) {
  let favorites = JSON.parse(localStorage.getItem('favoritos')) || [];

  const indexToRemove = favorites.findIndex(favorite => favorite.restauranteId || favorite.lugarId === restauranteId);
  const popup = document.querySelector('.popup');
  const closePopup = document.querySelector('.close-popup');

  if (indexToRemove !== -1) {
    favorites.splice(indexToRemove, 1);
    localStorage.setItem('favoritos', JSON.stringify(favorites));

    const cardId = `card-${restauranteId}`;
    const cardRemoved = document.getElementById(cardId);

    popup.style.left = '50%';
    setTimeout(() => {
      popup.style.left = '-100%';
    }, 4000);

    closePopup.addEventListener('click', () => {
      popup.style.left = '-100%';
    })

    if (cardRemoved) {
      cardRemoved.remove();
      console.log(`Restaurante ${restauranteId} removido dos favoritos.`);
    }
  } else {
    console.log(`Restaurante ${restauranteId} não encontrado nos favoritos.`);
  }
}

window.addEventListener('load', exibirFavoritos);