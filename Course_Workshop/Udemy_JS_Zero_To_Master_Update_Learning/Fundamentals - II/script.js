'use strict';

const currentYear = 2026;
const birthYear = 1998;

let myAge = () => currentYear - birthYear;
console.log(`My age is: ${myAge()}`);

function calculateAge(currentYear, birthYear) {
  return currentYear - birthYear;
}

const calcAge = function (currentYear, birthYear) {
  return currentYear - birthYear;
};

const arrowAge = (currentYear, birthYear) => currentYear - birthYear;

const arrowAge2 = (currentYear, birthYear) => {
  return currentYear - birthYear;
};

const json = {
  firstName: 'Mathew',
  lastName: 'Corner',
  age: 2026 - 1996,
  job: 'Waller',
  emailId: ['a@gmail.com', 'b@gmail.com', 'c@gmail.com'],
  friends: ['Corner', 'Gayson'],
};

const jsonArray = ['a', 123, [], NaN, undefined];

// const textInput = prompt('what is your name?');

// console.log(textInput);
console.log(json.friends);

const types = [];

for (let i = 0; i <= jsonArray.length; i++) {
  // types[i] = typeof jsonArray[i];
  types.push(typeof jsonArray[i]);
}

console.log(types);

console.log('Demo');
console.log(jsonArray);
console.log('demo');
