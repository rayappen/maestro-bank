'use strict';

const body = document.querySelector('body');
const colors = ['red', 'green', 'blue', 'yellow', 'orange', 'purple'];

(function () {
  console.log('test2');
  const header = document.querySelector('h1');
  header.style.color = 'white';

  body.addEventListener('click', function () {
    header.style.color = randColor(0, colors.length - 1, colors);
  });
})();

const randColor = function (min, max, colors) {
  const range = max - min + 1;
  const randomBuffer = new Uint32Array(1);
  window.crypto.getRandomValues(randomBuffer);
  const randomDecimal = randomBuffer[0] / (0xffffffff + 1);
  console.log('color');
  console.log(colors[Math.floor(randomDecimal * range) + min]);
  return colors[Math.floor(randomDecimal * range) + min];
};

console.log('Test');
// colorChange();
