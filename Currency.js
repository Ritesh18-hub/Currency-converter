// const BASE_URL = "https://api.freecurrencyapi.com/v1/latest";
// const API_KEY = "fca_live_OddXJP6TWmFkPHKxZDm0odVZbyMY48P3EHT4O05A";


// const dropdowns = document.querySelectorAll(".dropdown select");
// const btn = document.querySelector("form button");
// const fromCurr = document.querySelector(".from select");
// const tocurr = document.querySelector(".to select");
// const msg = document.querySelector(".msg");


// let i=0;
// for (let select of dropdowns) {
//   for (currCode in countryList) {
//     let newOption = document.createElement("option");
//     newOption.innerText = currCode;
//     newOption.value = currCode;
//     if (select.name === "from" && currCode === "USD") {
//       newOption.selected = "selected";
//     } else if (select.name === "to" && currCode === "INR") {
//       newOption.selected = "selected";
//     }
//     select.append(newOption);
//   }

//   select.addEventListener("change", (evt) =>{
//     updateFlag(evt.target);
//   })
// }

// const updateFlag = (element) => {
//   let currCode = element.value;
//   let countryCode = countryList[currCode];
//   let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
//   let img = element.parentElement.querySelector("img");
//   img.src = newSrc;
// };

// btn.addEventListener("click", async (evt) => {
//   evt.preventDefault();
//   let amount = document.querySelector(".amount input");
//   let amtVal = amount.value;
//   if (amtVal === "" || amtVal < 1) {
//     amtVal = 1;
//     amount.value = "1";
//   }

//   // console.log(fromCurr,tocurr)
//   const URL = `${BASE_URL}?apikey=${API_KEY}&base_currency=${fromCurr.value}&currencies=${tocurr.value}`;
//   let response = await fetch(URL);
//   let data = await response.json();
//   let rate = data.data[tocurr.value];
  
//   let finalAmount = amtVal * rate;
//   msg.innerText = `${amtVal} ${fromCurr.value} =  ${finalAmount} ${tocurr.value}`;
// });

const BASE_URL = "https://api.freecurrencyapi.com/v1/latest";
const API_KEY = "fca_live_OddXJP6TWmFkPHKxZDm0odVZbyMY48P3EHT4O05A";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const tocurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of dropdowns) {
  for (let currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

const getExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }

  const URL = `${BASE_URL}?apikey=${API_KEY}&base_currency=${fromCurr.value}&currencies=${tocurr.value}`;
  
  try {
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data.data[tocurr.value];
    let finalAmount = amtVal * rate;
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount.toFixed(2)} ${tocurr.value}`;
  } catch (error) {
    msg.innerText = "Error fetching exchange rate!";
    console.error("API Error:", error);
  }
};

// Run on button click
btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  getExchangeRate();
});

// Auto-run once when the page loads
window.addEventListener("load", () => {
  getExchangeRate();
});
