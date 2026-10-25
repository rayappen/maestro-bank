'use strict';

const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  answers: new Array(4).fill(0),

  registerNewAnswer() {
    let valid = false;
    while (!valid) {
      const ans = Number(
        prompt(`${this.question}\n${this.options.join('\n')}`),
      );

      if (ans >= 0 && ans < this.answers.length) {
        this.answers[ans]++;
        this.valid = true;
        this.displayResults('string');
      } else {
        alert('wrong input, try again !!!');
      }
    }
  },

  displayResults(type) {
    if (type == 'array') {
      console.log(this.answers);
    } else {
      console.log(this.answers.join(', '));
    }
  },
};

/*
poll.registerNewAnswer - reference call would break 'this' keyword and points to DOM element 
which is poll DOM element not the object which returns the same and thus 'this' keyword would break.
document
  .querySelector('.poll')
  .addEventListener('click', poll.registerNewAnswer);
*/

// document
//   .querySelector('.poll')
//   .addEventListener('click', poll.registerNewAnswer.bind(poll));

const customDisplay = poll.displayResults.bind({ answers: [1, 5, 3, 9, 6, 1] });
customDisplay('string');

poll.displayResults.call({ answers: [5, 2, 3] }, 'string');

const runOnce = function () {
  console.log('This will run once');
};

runOnce();

(function () {
  console.log('This will run once - I');
})();

(() => console.log('This will run once - II'))();

console.dir(runOnce);

const closureMain = function () {
  let counter = 0;
  return function () {
    counter++;
    console.log(counter);
  };
};

let nun = 11;
const closureVariable = closureMain();

closureVariable(nun);
closureVariable(nun);
closureVariable(nun);

let f;

const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};

const h = function () {
  const b = 445;
  f = function () {
    console.log(b * 2);
  };
};

g();
f();
h();
f();

console.dir(f);

const boardPassengers = function (n, wait) {
  const perGroup = n / 3;

  setTimeout(function () {
    console.log(`We are all boarding all ${n} passengers`);
    console.log(`There are 3 groups, each with ${perGroup} passengers`);
  }, wait * 10000);

  console.log(`will start boarding in ${wait} seconds`);
};

boardPassengers(180, 3);
