'use strict';

const calcAverageHumanAge = (dogAgeArray) => {
  return dogAgeArray
    .map((age) => (age <= 2 ? 2 * age : 16 + age * 4))
    .filter((age) => age > 17)
    .reduce((acc, curr, i, arr) => acc + curr / arr.length, 0);
};

console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));

const array = [5, 2, 4, 1, 15, 8, 3];

console.log(array.find((mov) => mov > 10));
