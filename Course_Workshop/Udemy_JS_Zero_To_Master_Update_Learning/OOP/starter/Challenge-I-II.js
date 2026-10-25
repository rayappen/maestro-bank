'use strict';

class Car {
  constructor(carMake, speed, owner) {
    this.carMake = carMake;
    this.speed = speed;
    this.owner = owner;
  }

  set owner(owner) {
    console.log(owner);
    this._owner = owner;
  }

  get owner() {
    return this._owner;
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.speed}km/h`);
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.speed}km/h`);
};

const bmw = new Car('BMW', 120, 'Jenkins');
// const mercedes = new Car('Mercedes', 95);

console.log(bmw);
console.log(bmw.speed);
bmw.accelerate();
bmw.brake();
bmw.speedUS = 50;
console.log(bmw);

// Car.process(bmw);

const CarProto = {
  getCarBrand() {
    console.log(`This is a ${this.carMake} car`);
  },

  init(carMake, owner) {
    this.carMake = carMake;
    this.owner = owner;
  },
};

const toyota = Object.create(CarProto);
toyota.init('Toyota', 'joe');

toyota.getCarBrand();
console.log(toyota);

class ElectricCar extends Car {
  constructor(carMake, speed, owner, currentBatteryCharge) {
    super(carMake, speed, owner);
    this.currentBatteryCharge = currentBatteryCharge;
  }

  set currentBatteryCharge(currentBatteryCharge) {
    this._currentBatteryCharge = currentBatteryCharge;
  }

  get currentBatteryCharge() {
    return this._currentBatteryCharge;
  }

  chargeBattery(chargeTo) {
    this.currentBatteryCharge = chargeTo;
    console.log(`Your car has charged to ${this.currentBatteryCharge}%`);
  }

  accelerate() {
    this.speed += 20;
    this.currentBatteryCharge -= 1;
    console.log(
      `${this.carMake} going at ${this.speed}km/h, with a charge of ${this.currentBatteryCharge}%`,
    );
  }

  brake() {
    super.brake();
    console.log(
      `${this.carMake} going at ${this.speed}km/h, with a charge of ${this.currentBatteryCharge}%`,
    );
  }
}

// ElectricCar.prototype = Object.create(Car.prototype);

// const hyndai = new ElectricCar('Hyndai', 80, 'jeffery', 'TVS');
const tesla = new ElectricCar('Tesla', 120, 'mark', 23);
console.log(tesla);
tesla.chargeBattery(100);
tesla.accelerate();
tesla.accelerate();
tesla.brake();

console.log(tesla.constructor.name);
console.log(tesla instanceof Car);

console.log(navigator.language);

class Human {
  constructor(firstName, lastName, age, nationality) {
    this._firstName = firstName;
    this._lastName = lastName;
    this._age = age;
    this._nationality = nationality;
  }

  set firstName(firstName) {
    this._firstName = firstName;
  }

  get firstName() {
    return this._firstName;
  }

  set lastName(lastName) {
    this._lastName = lastName;
  }

  get lastName() {
    return this._lastName;
  }

  set age(age) {
    this._age = age;
  }

  get age() {
    return this._age;
  }

  set nationality(nationality) {
    this._nationality = nationality;
  }

  get nationality() {
    return this._nationality;
  }
}

class Asian extends Human {
  #motherTongue;
  knowsKungFu;

  constructor(firstName, lastName, age, nationality, motherTongue) {
    super(firstName, lastName, age, nationality);
    this.#motherTongue = motherTongue;
    this.#doesThisHumanKnowsKungFu();
  }

  set motherTongue(motherTongue) {
    this.#motherTongue = motherTongue;
  }

  get motherTongue() {
    return this.#motherTongue;
  }

  set nationality(nationality) {
    this._nationality = nationality;
    this.#doesThisHumanKnowsKungFu();
  }

  get nationality() {
    return this._nationality;
  }

  #doesThisHumanKnowsKungFu() {
    this.knowsKungFu = ['chinese', 'japanese', 'korean'].includes(
      this.nationality.toLowerCase(),
    );
  }
}

const lee = new Asian('Lee', 'Kua', 32, 'chinese', 'Madarin');
console.log(lee);
console.log(
  `${lee._firstName} ${lee.knowsKungFu === true ? 'does' : "doesn't"} kungFu`,
);

lee.nationality = 'cantonese';
console.log(
  `${lee._firstName} ${lee.knowsKungFu === true ? 'does' : "doesn't"} kungFu`,
);
