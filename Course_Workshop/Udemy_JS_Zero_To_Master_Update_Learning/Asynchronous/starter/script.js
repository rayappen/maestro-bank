'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
const token = 'rc_live_5a74cbc003664da792dc2b945585555d';

// NEW COUNTRIES API URL (use instead of the URL shown in videos):
// https://restcountries.com/v2/name/portugal

// NEW REVERSE GEOCODING API URL (use instead of the URL shown in videos):
// https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}

// Updated API endpoint
// https://countries-api-836d.onrender.com/countries/

// API Key: rc_live_5a74cbc003664da792dc2b945585555d

///////////////////////////////////////

const renderCountry = function (country, className = '') {
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

// const getCountryData = function (country) {
//   const initialRequest = new XMLHttpRequest();
//   initialRequest.open(
//     'GET',
//     `https://api.restcountries.com/countries/v5/names.common/${country}`,
//   );
//   initialRequest.setRequestHeader(
//     'Authorization',
//     'Bearer rc_live_5a74cbc003664da792dc2b945585555d',
//   );

//   initialRequest.addEventListener('load', function () {
//     const { data } = JSON.parse(this.responseText);
//     const [mainCountry] = data.objects;
//     console.log('country: ', mainCountry);
//     renderCountry(mainCountry);

//     if (!mainCountry.borders || mainCountry.borders.length === 0) return;
//     console.log('Border: ', mainCountry.borders);

//     const fetchNeighborSequentially = function (index) {
//       console.log(
//         'index: ' +
//           index +
//           ', mainCountry.borders.length: ,' +
//           mainCountry.borders.length,
//       );
//       if (index >= mainCountry.borders.length) return;
//       const neighbourRequest = new XMLHttpRequest();
//       //   console.log('Border ::: ', mainCountry.borders[0]);
//       neighbourRequest.open(
//         'GET',
//         `https://api.restcountries.com/countries/v5/codes.alpha_3/${mainCountry.borders[index]}`,
//       );
//       neighbourRequest.setRequestHeader(
//         'Authorization',
//         'Bearer rc_live_5a74cbc003664da792dc2b945585555d',
//       );

//       console.log(
//         `https://api.restcountries.com/countries/v5/codes.alpha_3/${mainCountry.borders[index]}`,
//       );

//       neighbourRequest.addEventListener('load', function () {
//         const neighbourData = JSON.parse(this.responseText);
//         console.log(`neighbourData: `, neighbourData);
//         const neighbourCountry = neighbourData.data
//           ? neighbourData.data.objects[0]
//           : neighbourData[0];

//         console.log(neighbourCountry);
//         renderCountry(neighbourCountry, 'neighbour');
//         fetchNeighborSequentially(++index);
//       });
//       neighbourRequest.send();
//     };
//     fetchNeighborSequentially(0);
//   });

//   initialRequest.send();
// };

const getJSON = function (
  url,
  errMsg = 'No country objects found in the database.',
) {
  console.log('test');
  return fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(response => {
      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);
      return response.json();
    })
    .then(payload => {
      if (!payload.data?.objects || payload.data.objects.length === 0) {
        throw new Error(errMsg);
      }
      return payload.data.objects[0];
    });
};

const getCountryData = function (country) {
  getJSON(`https://api.restcountries.com/countries/v5/names.common/${country}`)
    .then(payload => {
      renderCountry(payload);

      const neighbour = payload.borders[0];
      console.log('neighpur', neighbour);
      if (!neighbour) throw new Error('No neighbour found');

      return getJSON(
        `https://api.restcountries.com/countries/v5/codes.alpha_3/${neighbour}`,
      );
    })
    .then(neigh => {
      renderCountry(neigh, 'neighbour');
    })
    .catch(err => {
      renderError(err.message);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

// const getCountryData = function (country) {
//   fetch(`https://api.restcountries.com/countries/v5/names.common/${country}`, {
//     method: 'GET',
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   })
//     .then(response => {
//       if (!response.ok)
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       return response.json();
//     })
//     .then(payload => {
//       if (!payload.data?.objects || payload.data.objects.length === 0) {
//         throw new Error('No country objects found in the database.');
//       }

//       renderCountry(payload.data.objects[0]);
//       const neighbour = payload.data.objects[0].borders[0];

//       if (!neighbour) return;

//       return fetch(
//         `https://api.restcountries.com/countries/v5/codes.alpha_3/${neighbour}`,
//         {
//           method: 'GET',
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         },
//       );
//     })
//     .then(response => {
//       if (!response.ok)
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       return response.json();
//     })
//     .then(neigh => {
//       if (!payload.data?.objects || payload.data.objects.length === 0) {
//         throw new Error('No country objects found in the database.');
//       }
//       renderCountry(neigh.data.objects[0], 'neighbour');
//     })
//     .catch(err => {
//       renderError(err.message);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

btn.addEventListener('click', function () {
  // getCountryData('india');
});

// getCountryData('australia');

/*Testing 
(Event Loop
CallBack Queue
MicroTask Queue
CallStack)
*/

// console.log('test start');
// setTimeout(() => console.log('0 sec timer'), 0);
// Promise.resolve('Promise resolved').then(res => console.log(res));
// console.log('test end');

// const lotteryPromise = new Promise(function (resolve, reject) {
//   if (Math.random() >= 0.5) {
//     resolve('Win');
//   } else {
//     reject('Loose');
//   }
// });

// lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

// const wait = function (seconds) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, seconds * 1000);
//   });
// };

// wait(2)
//   .then(() => {
//     console.log('I waited for 2 seconds');
//     return wait(1);
//   })
//   .then(() => console.log('I waited for 1 seconds'));

// wait(2);

// const whereAmI = async function (country) {
//   const res = await fetch(url, {
//     method: 'GET',
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   await (res => console.log(res.json()));
// };

const get3Countries = async function (c1, c2, c3) {
  try {
    // const data1 = await getJSON(
    //   `https://api.restcountries.com/countries/v5/names.common/${c1}`,
    // );
    // const data2 = await getJSON(
    //   `https://api.restcountries.com/countries/v5/names.common/${c2}`,
    // );
    // const data3 = await getJSON(
    //   `https://api.restcountries.com/countries/v5/names.common/${c3}`,
    // );
    // console.log(data1);
    // console.log([
    //   data1.capitals[0].name,
    //   data2.capitals[0].name,
    //   data3.capitals[0].name,
    // ]);

    //short circuits when one fails
    const data = await Promise.all([
      getJSON(`https://api.restcountries.com/countries/v5/names.common/${c1}`),
      getJSON(`https://api.restcountries.com/countries/v5/names.common/${c2}`),
      getJSON(`https://api.restcountries.com/countries/v5/names.common/${c3}`),
    ]);
    console.log(data.map(country => country.capitals[0].name));
  } catch (err) {
    console.log(err);
  }
};

// const data = await Promise.all([
//   getJSON(`https://api.restcountries.com/countries/v5/names.common/${c1}`),
//   getJSON(`https://api.restcountries.com/countries/v5/names.common/${c2}`),
//   getJSON(`https://api.restcountries.com/countries/v5/names.common/${c3}`),
// ]);

// console.log(data('india', 'japan', 'russia'));
// get3Countries('india', 'japan', 'russia');

// (async function () {
//   const res = await Promise.race([
//     getJSON(`https://api.restcountries.com/countries/v5/names.common/italy`),
//     getJSON(`https://api.restcountries.com/countries/v5/names.common/france`),
//     // prettier-ignore
//     getJSON(`https://api.restcountries.com/countries/v5/names.common/australia`),
//   ]);
//   console.log(res);
// })();

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error('Request took too long!'));
    }, s * 1000);
  });
};

//fetches the first settling promise
// Promise.race([
//   getJSON(`https://api.restcountries.com/countries/v5/names.common/germany`),
//   timeout(0.1),
// ])
//   .then(res => console.log(res))
//   .catch(error => console.error(error));

//fetches all the the promise whether it is settled or not
// Promise.allSettled([
//   getJSON(`https://api.restcountries.com/countries/v5/names.common/germany`),
//   timeout(0.1),
// ])
//   .then(res => console.log(res))
//   .catch(error => console.error(error));

//Takes all the promise and rejected promises are ignored
Promise.any([
  getJSON(`https://api.restcountries.com/countries/v5/names.common/germany`),
  timeout(0.1),
])
  .then(res => console.log(res))
  .catch(error => console.error(error));
