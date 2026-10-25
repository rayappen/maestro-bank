'use strict';

const dogsJulia = [3, 5, 2, 12, 7];
const dogsKate = [4, 1, 15, 8, 3];

const checkDogs = function (dogsJulia, dogsKate) {
  const dogsJuliaActual = dogsJulia.slice(1, -2);
  const dogArray = [...dogsJuliaActual, ...dogsKate];

  dogArray.forEach((dogAge, i) => {
    console.log(
      `Dog number ${i + 1} is ${dogAge >= 3 ? 'an adult' : 'a puppy'}`,
    );
  });
};

checkDogs(dogsJulia, dogsKate);

const test = dogsJulia.map((dog, i) => {
  return `dog number ${i + 1} age is ${dog}`;
});

console.log(test);

const demArr = [10, 20, 30];
const sum = demArr.reduce((acc, curr) => acc + curr, 0);
