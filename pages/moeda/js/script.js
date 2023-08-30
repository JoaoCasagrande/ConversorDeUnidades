const apiKey = "ee844fb70416cae007c9d1fe";
const fromCurrency = document.querySelector(".from select");
const toCurrency = document.querySelector(".to select");
const dropList = document.querySelectorAll(".drop-list select");
const getButton = document.querySelector("form button");
const exchangeIcon = document.querySelector(".icon");

for (let i = 0; i < dropList.length; i++) {
    for(currency_list in country_list) {
        let selected;
        
        if(i == 0) {
            selected = currency_list == "BRL" ? "selected" : "";
        }
        else if (i == 1) {
            selected = currency_list == "USD" ? "selected" : "";
        }
        
        let optionTag = `<option value="${currency_list}" ${selected}>${currency_list}</option>`;

        dropList[i].insertAdjacentHTML("beforeend", optionTag);
    }

    dropList[i].addEventListener("change", e => {
        loadFlag(e.target);
    })
}

function validarNumero(input) {
    input.value = input.value.replace(/[^0-9]/g, '');
}

function loadFlag(element) {
    for(code in country_list) {
        if(code == element.value) {
            let imgTag = element.parentElement.querySelector("img");

            imgTag.src = `https://flagsapi.com/${country_list[code]}/flat/64.png`;
        }
    }
}

function getExchangeRate() {
    const amount = document.querySelector(".amount input");
    const exchangeRateTxt = document.querySelector(".exchange-rate");
    let amountValue = amount.value;

    if(amountValue == "" || amountValue == "0") {
        amount.value = "1";
        amountValue = 1;
    }

    exchangeRateTxt.innerText = `Adquirindo taxa de conversão...`;
    let url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency.value}`;
    fetch(url).then(response => response.json()).then(result => {
        let exchangeRate = result.conversion_rates[toCurrency.value];
        let totalExchangeRate = (amountValue * exchangeRate).toFixed(2);

        exchangeRateTxt.innerText = `${amountValue} ${fromCurrency.value} = ${totalExchangeRate} ${toCurrency.value}`;
    }).catch(() => {
        exchangeRateTxt.innerText = "Alguma coisa deu errado..."
    });
}

exchangeIcon.addEventListener("click", () => {
    let tempCode = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = tempCode;

    loadFlag(fromCurrency);
    loadFlag(toCurrency);
    getExchangeRate();
})

getButton.addEventListener("click", e => {
    e.preventDefault();

    getExchangeRate();
})

window.addEventListener("load", () => {
    getExchangeRate();
})