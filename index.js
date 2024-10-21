const baseUrl = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
const dropdown = document.querySelectorAll(".dropdown select");
const btn = document.querySelector('form button');
const fromCurr = document.querySelector(".From select");
const toCurr = document.querySelector(".To select");
const msg = document.querySelector(".msg");
//     for(code in countryList)       //This is a for ... in loop . It iterate only over object.
// {
//     console.log(code , countryList[code]);
// };


for (let sele of dropdown)
{
    for(currencyCode in countryList)
    {
        let newOption = document.createElement('option');
        newOption.textContent = currencyCode;
        newOption.value= currencyCode;
        sele.append(newOption);
    }

    sele.addEventListener("change" , (evnt) =>
    {
    updateFlag(evnt.target);
    // console.log(evnt.target);
});
}

const updateFlag = (element) => 
{
    let currencyCode = element.value;
    let countryCode = countryList[currencyCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector('img');
    // console.log(img);
    img.src=newSrc;
};

const updateExchangeRate = async () =>
{
    let amount = document.querySelector('.amount input');
    let amtVal = amount.value;
    if(amtVal==="" || amtVal<1)
    {
        amtVal = 1;
        amount.value = "1";
    }

const url = `${baseUrl}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
let response = await fetch(url);
let data = await response.json();
let rate = data[toCurr.value.toLowerCase()];

let finalAmount = amtVal*rate;
msg.innerText = `${amtVal} ${fromCurr.value.toLowerCase()} = ${finalAmount} ${toCurr.value.toLowerCase()}`;
}

btn.addEventListener('click' ,(evnt) =>
{
    evnt.preventDefault();
    updateExchangeRate();
    
//     let amount = document.querySelector('.amount input');
//     let amtVal = amount.value;
//     if(amtVal==="" || amtVal<1)
//     {
//         amtVal = 1;
//         amount.value = "1";
//     }

// const url = `${baseUrl}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
// let response = await fetch(url);
// let data = await response.json();
// let rate = data[toCurr.value.toLowerCase()];

// let finalAmount = amtVal*rate;
// msg.innerText = `${amtVal} ${fromCurr.value.toLowerCase()} = ${finalAmount} ${toCurr.value.toLowerCase()}`;
});

window.querySelector('load' , ()=>
{
    updateExchangeRate();
});