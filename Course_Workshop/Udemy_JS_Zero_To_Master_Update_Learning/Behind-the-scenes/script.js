'use strict';

function calcAge(birthYear) {
  const age = 2026 - birthYear;
  console.log(firstName);

  function printAge() {
    const output = `You are ${age}. born in ${birthYear}`;
    console.log(output);

    if (birthYear >= 1981 && birthYear <= 1996) {
      var juju = 'juju bubu';
      const str = `Oh you're a millenlial, ${firstName}`;
      console.log(str);
    }
    // console.log(str);
    console.log(juju);
  }

  printAge();
  console.log(juju);
  return age;
}

// console.log(firstName);

// var firstName = 'Mathew';
// calcAge(1995);
// printAge();

// console.log(firstName);

// console.log(nameDum);
// console.log(nameDum);
// console.log(nameDum);

let nameDum = 'mathew'; //ReferenceError
const pen = 'no pen'; //ReferenceError
var bun = 'yes bun'; //undefined

// console.log(calcium(1, 2)); //hoisted so it works
// console.log(calBum); //ReferenceError coz of const since not hoisted
// console.log(varBar(1, 2)); //ReferenceError
// console.log(gummyBar(2, 4)); //TypeError it's like calling undefined(2, 4) since it's hoisted with undefined as value

function calcium(a, b) {
  return a + b;
}

const calBum = function () {
  return 'yes bum';
};

const varBar = (a, b) => {
  return a + b;
};

var gummyBar = (a, b) => {
  return a + b;
};

// console.log(varBar(1, 2));
// console.log(gummyBar(2, 4));

const start = function () {
  console.log(this);
};

const end = () => {
  console.log(this);
};

const master = {
  firstName: 'dark',
  nameFun: function () {
    console.log(this);
    console.log(this.firstName);
  },
};

// console.log(start);
// console.log(end());
master.nameFun();

const malinda = {
  firstName: 'light',
};

malinda.nameFun = master.nameFun; //copy function
malinda.nameFun();
var kermit = 'the dog';

const jonas = {
  firstName: 'Jonas',
  year: 1991,
  calcAge: function () {
    // console.log(this);
    console.log(2037 - this.year);

    const isMillenial = function () {
      console.log(this);
      console.log(this.year >= 1981 && this.year <= 1996);
    };
    isMillenial();
  },
  greet: () => {
    console.log(this);
    console.log(`Hey ${this.firstName}`);
  },

  demo: function () {
    let firstName = 'meoe';
    const greet = () => {
      console.log(this);
      console.log(`Hey ${this.firstName}`);
    };

    const shop = function () {
      console.log(this);
      console.log(`Hey ${this.firstName}`);
    };
    greet();
    shop();
  },
};
// jonas.greet();
// jonas.demo();
// jonas.calcAge();

const user = {
  name: 'Alex',
  hobbies: ['Coding', 'Gaming', 'Cooking'],

  showWelcome: function () {
    console.log(`Hey, I am ${this.name}`);
  },

  printHobbies: function () {
    this.hobbies.forEach(hobby => {
      console.log(`${this.name} loves ${hobby}`);
    });
  },
};

// Test your fixes:
// user.showWelcome();
// user.printHobbies();

const json = {
  key: 'value',
  spot: {
    name: 'bango',
  },
};

// console.log(json.spot);
json.spot.name = 'lango';
const spotII = json.spot;
// console.log(spotII);
json.dame = json.spot;
// console.log(json);

//Shallow Copy
const newJson = { ...json };
newJson.key = 'dup value';
console.log(json);
console.log(newJson);

const cloneJson = structuredClone(json);
console.log(cloneJson);
