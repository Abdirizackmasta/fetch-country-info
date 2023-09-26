"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");
const countryInput = document.querySelector('.country-value');

// A PROMISE
// const request = fetch('https://restcountries.com/v2/name/kenya')
// console.log(request);
const renderError = function (msg) {
    countriesContainer.insertAdjacentText("beforeend", msg);
    countriesContainer.style.opacity = 1;
};
const renderCountry = function (data, className = '') {
    const html = ` <article class="country  ${className}">
            <img class="country__img" src="${data.flag}" />
            <div class="country__data">
                <h3 class="country__name">${data.name}</h3>
                <h4 class="country__region">${data.region}</h4>
                <p class="country__row"><span>👫</span>${(
            +data.population / 1000000
        ).toFixed(1)} people</p>
                <p class="country__row"><span>🗣️</span>${data.languages[0].name
        }</p>
                <p class="country__row"><span>💰</span>${data.currencies[0].name
        }</p>
                 <p class="country__row"><span>🌆</span>Capital City: ${data.capital
        }</p>
            </div>
            </article>`;
    countriesContainer.insertAdjacentHTML("beforeend", html);
    // countriesContainer.style.opacity = 1;

}
const getJSON = function (url, errorMsg = 'something went wromg!') {
    return fetch(url).then((response) => {
        console.log(response);
        if (!response.ok) throw new Error(`${errorMsg} ${response.status}`);
        return response.json();
    })
}
const getCountryData = function (country) {
    // country1
    getJSON(`https://countries-api-836d.onrender.com/countries/name/${country}`
        , 'Country not found! ')
        .then(data => {
            renderCountry(data[0]);
            const neighbor = data[0].borders?.[0];
            if (!neighbor) throw new Error('No neighbor found!');
            console.log(neighbor);
            // country 2 /Neighbor
            return getJSON(`https://countries-api-836d.onrender.com/countries/alpha/${neighbor}`, 'Country not found! ')
        }).then(data => {
            renderCountry(data, 'neighbour')
            // console.log(data)
        }
        )
        .catch(err => {
            console.error(`${err}`)
            renderError(`something went wrong💥 ${err.message}.Try again`)
        })
        .finally(() => {
            countriesContainer.style.opacity = 1;

        });
}
btn.addEventListener('click', function () {
    getCountryData(countryInput.value)
    countryInput.value = '';
    // countriesContainer.insertAdjacentHTML("beforeend", '')
})
btn.addEventListener('key', function (e) {
    if (e.key === 'enter') {
        getCountryData(countryInput.value)
        countryInput.value = '';
    }
    getCountryData(countryInput.value)
    countryInput.value = '';
    // countriesContainer.insertAdjacentHTML("beforeend", '')
})