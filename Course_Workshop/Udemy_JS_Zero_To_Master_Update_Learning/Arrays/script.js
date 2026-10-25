'use strict';

const currencies = new Map([
  ['USD', 'United States Dollars'],
  ['EUR', 'EURO'],
  ['GBP', 'Great British Pound'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////

let arr = ['a', 'b', 'c', 'd', 'e'];

console.log(arr.slice(2));
console.log(arr.slice(2, 4));
console.log(arr.slice(-2));
console.log(arr.slice(1, -2)); //does not modify the original array

// console.log(arr.splice(2)); //does modify the original array
console.log([...arr]);

const arr2 = ['j', 'i', 'h', 'g', 'f'];

console.log(arr2.reverse());
console.log([...arr2]);

const letters = arr.concat(arr2);
console.log(letters);
console.log(letters.join(' - '));
console.log([...letters]);

const numArr = [12, 231, 23];
console.log(numArr[0]);
console.log(numArr.at(2));

console.log(numArr[numArr.length - 1]);
console.log(numArr.slice(-1)[0]);

console.log(numArr.at(-1));

console.log('bank'.at(-1));

// for (const cont of movements) {
//   if (cont > 0) {
//     console.log('great: ', cont);
//   } else {
//     console.log('less: ', Math.abs(cont));
//   }
// }

console.log([...movements]);

movements.forEach(function (value, idx, array) {
  console.log('i: ', idx);
  console.log('value: ', value);
  console.log('array: ', array);
});

for (const [i, value] of movements.entries()) {
  console.log('i: ', i, 'depo: ', value);
}

currencies.forEach(function (v, k, map) {
  console.log('k: ', k);
  //   console.log('v: ', v);
  console.log('map: ', map);
});

for (const entry of currencies.entries()) {
  console.log('entry: ', entry);
}
