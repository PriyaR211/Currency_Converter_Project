const API_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const selects = document.querySelectorAll("select");
const btn = document.querySelector(".submit-btn");
const fromEle = document.querySelector(".from select");
const toEle = document.querySelector(".to select");
const input = document.querySelector(".amount input");
const msgContainer = document.querySelector(".msg");
const flipper = document.querySelector("#flip");
const fromImg = document.querySelector(".from img");
const toImg = document.querySelector(".to img");
const fromSelect = document.querySelector("#fromSel");
const toSelect = document.querySelector("#toSel");


for (let select of selects) {
    for (let countryCode in countryList) {
        const newOption = document.createElement("option");
        newOption.innerText = countryCode;
        select.append(newOption);
        // default conversion - USD to INR
        if (select.name == "from" && countryCode == "USD") {
            newOption.selected = "selected";
        }
        else if (select.name == "to" && countryCode == "INR") {
            newOption.selected = "selected";
        }
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
        msgContainer.innerText = "";
    })
}

const updateFlag = (element) => {
    countryCode = element.value;
    let countryName = countryList[countryCode];
    let img = element.parentElement.querySelector("img");
    img.src = `https://flagsapi.com/${countryName}/flat/64.png`;
}


let amt;
btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updatedExchangeRate();
})

updatedExchangeRate = async () => {
    amt = Number(input.value);
    if ((amt < 1)) {
        amt = 1;
        input.value = 1;
    }

    let url = `${API_URL}/${fromEle.value.toLowerCase()}/${toEle.value.toLowerCase()}.json`;
    let response = await fetch(url);
    let data = await response.json();
    let rate = data[toEle.value.toLowerCase()];
    let totalAmt = amt * rate;
    msgContainer.innerText = `${amt} ${fromEle.value} = ${totalAmt} ${toEle.value}`;
    msgContainer.style.fontWeight = "bold";

    if (isNaN(amt)) {
        msgContainer.innerText = "Wrong Data Format";
        msgContainer.style.color = "red";
        console.log("done");
    }
}

input.addEventListener("click", () => {
    msgContainer.innerText = "";
})

window.addEventListener("load", () => {
    updatedExchangeRate();
})


flipper.addEventListener("click", () => {
    let countryCodeFrom = fromEle.value;
    let countryCodeTo = toEle.value;
    msgContainer.innerText = "";
    flipFlag(countryCodeFrom, countryCodeTo)

})

flipFlag = (countryCodeFrom, countryCodeTo) => {
    let countryNameFrom = countryList[countryCodeFrom];
    let countryNameTo = countryList[countryCodeTo];
    fromImg.src = `https://flagsapi.com/${countryNameTo}/flat/64.png`;
    toImg.src = `https://flagsapi.com/${countryNameFrom}/flat/64.png`;
    fromSelect.value = countryCodeTo;
    toSelect.value = countryCodeFrom;
}
