'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
const restCountryToken = 'rc_live_5a74cbc003664da792dc2b945585555d';
const geoCodeToken = '114591083432384549558x127053';

//https://geocode.xyz/51.50354,-0.12768?geoit=xml&auth=114591083432384549558x127053
//https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=51.50354&longitude=0.12768

const renderCountry = function (country, className = '') {
  console.log('test');
  const formatter = new Intl.NumberFormat('en-US');
  const html = `
        <article class="country ${className}">
          <img class="country__img" src="${country.flag.url_svg}" />
          <div class="country__data">
            <h3 class="country__name">${country.names.common}</h3>
            <h4 class="country__region">${country.region}</h4>
            <p class="country__row"><span>👫</span>${formatter.format(country.population)}</p>
            <p class="country__row"><span>🗣️</span>${country.languages[0].native_name}</p>
            <p class="country__row"><span>💰</span>${country.currencies[0].name}</p>
          </div>
        </article>`;
  countriesContainer.insertAdjacentHTML('beforeend', html);
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
};

const getCountryInfo = function (url) {
  fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${restCountryToken}`,
    },
  })
    .then(response => {
      console.log('response: ', response);
      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);
      return response.json();
    })
    .then(payload => {
      console.log('payload: ', payload);
      if (!payload.data?.objects || payload.data.objects.length === 0) {
        throw new Error(errMsg);
      }
      console.log('payload :: ', payload.data.objects[0]);
      renderCountry(payload.data.objects[0]);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

function whereAmI(lat, long) {
  const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${long}`;
  let resp;
  return fetch(url, {
    method: 'GET',
  })
    .then(response => {
      console.log('response: ', response);
      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);
      return response.json();
    })
    .then(payload => {
      console.log('payload: ', payload);
      if (!payload) {
        throw new Error('Invalid Reponse');
      }
      return payload.countryCode;
    })
    .then(currentLocation => {
      const url =
        currentLocation.length == 2
          ? `https://api.restcountries.com/countries/v5/codes.alpha_2/${currentLocation}`
          : `https://api.restcountries.com/countries/v5/codes.alpha_3/${currentLocation}`;
      return getCountryInfo(url);
    });
}

function confirm(lat, long) {
  let url;
  const currentLocation = whereAmI(lat, long);
}

confirm(51.50354, 0.12768);
