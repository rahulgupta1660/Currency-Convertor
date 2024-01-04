const BASE_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");

let amount = document.querySelector(".amount input");

const from = document.querySelector(".from select");

const to = document.querySelector(".to select");

const btn = document.querySelector("form button");

let msg = document.querySelector(".msg");

window.addEventListener("load", () => {
  updateExchangeRate();
});

for (let select of dropdowns) {
  for (let currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    select.append(newOption);
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
  }

  select.addEventListener("change", (e) => {
    updateFlag(e.target);
  });
}

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.previousElementSibling;
  img.src = newSrc;
};

btn.addEventListener("click", (e) => {
  e.preventDefault();
  updateExchangeRate();
});

const updateExchangeRate = async () => {
  if (amount.value == "" || amount.value < 1) {
    amount.value = "1";
  }
  const URL = `${BASE_URL}/${from.value.toLowerCase()}/${to.value.toLowerCase()}.json`;
  let response = await fetch(URL);
  let data = await response.json();
  let rate = data[to.value.toLowerCase()];
  let finalAmount = amount.value * rate;
  msg.innerText = `${amount.value} ${from.value} = ${finalAmount} ${to.value}`;
};
