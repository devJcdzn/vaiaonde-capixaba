var urlAPI = "https://vaiaondecapixaba.com.br/api/"

let headers = new Headers();

headers.append('Content-Type', 'application/json');
headers.append('Accept', 'application/json');
headers.append('Access-Control-Allow-Credentials', 'true');
headers.append('GET', 'POST', 'OPTIONS');
headers.append('Authorization', 'Basic ');

// Get restaurant and User id

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
const userId = localStorage.getItem('id');

//Check Voucher 

async function checkVoucher(voucher) {
    const restId = id;

    fetch("https://vaiaondecapixaba.com.br/api/cupons/usar/", {
        method: 'POST',
        body: JSON.stringify({
            "codigo": voucher,
            "usuarioID": userId,
            "restauranteID": restId
        })
    }).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Erro ao utilizar cupom, cupom inválido.')
        }
    })
        .then(async (data) => {
            const message = await data["mensagem"];
            if(data["result"]) {
                window.location.href = '/sucesso.html';
            } else {
                alert(message)
            }
        })
}


// Qr action reader

function domLoaded(fn) {
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        setTimeout(fn, 1);
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}

const html5QrCode = new Html5Qrcode("my-reader");
const qrCodeSuccessCallback = (decodedText, decodedResult) => {
    let myqr = document.getElementById('my-result');
    let lastResult, countResults = 0;

    if (decodedText !== lastResult) {
        ++countResults;
        lastResult = decodedText;

        console.log(decodedText);
        checkVoucher(decodedText);
    }
};

const config = { fps: 10, qrbox: 350 };

// Caso faça um botão de alterar a câmera
let camback = false
function changeCam() {
    camback = !camback
}

// Camera de preferência
html5QrCode.start({ facingMode: `${camback ? "user" : "environment"}` }, config, qrCodeSuccessCallback);


