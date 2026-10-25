'use strict';

//Ways to create a new instance of a class

const personOne = function (firstName, lastName, birthYear) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.birthYear = birthYear;
};

function PersonTwo(firstName, lastName, birthYear) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.birthYear = birthYear;
}

class PersonThree {
  constructor(firstName, lastName, birthYear) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthYear = birthYear;
  }
}

/*
Flow
- New {} is created
- function is called, this = {}
- {} linked to prototype
- function automatically return {}
*/

const personOneTest = new personOne('a', 'b', 1998);
console.log(personOneTest);
const personTwoTest = new PersonTwo('c', 'd', 1995);
console.log(personTwoTest);
const personThreeTest = new PersonThree('e', 'f', 1999);
console.log(personThreeTest);

//prototypes
personOne.prototype.calcAge = function () {
  console.log('test');
  console.log(2026 - this.birthYear);
};
PersonTwo.prototype.calcAge = function () {
  console.log('test');
  console.log(2026 - this.birthYear);
};
PersonThree.prototype.calcAge = function () {
  console.log('test');
  console.log(2026 - this.birthYear);
};

console.log(PersonThree.prototype);
personOneTest.calcAge();
personTwoTest.calcAge();
personThreeTest.calcAge();

console.log(personOneTest.__proto__);
console.log(personOneTest.__proto__ === personOne.prototype);
console.log(personOne.prototype.isPrototypeOf(personOneTest));

personOne.prototype.species = 'Homo Sapiens';
console.log(personOneTest);
console.log(personOneTest.hasOwnProperty('firstName'));

console.log(personOne.__proto__.constructor);

const array = [3, 6, 6, 5, 6, 9, 9];
Array.prototype.unique = function () {
  return [...new Set(this)];
};

console.log(array.unique());

const Person = function (firstName, lastName, birthYear) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.birthYear = birthYear;
};

Person.prototype.calcAge = function () {
  return 2026 - this.birthYear;
};

const Student = function (firstName, lastName, birthYear, course) {
  Person.call(this, firstName, lastName, birthYear);
  this.course = course;
};

Student.prototype = Object.create(Person.prototype);
Student.prototype.constructor = Student;

const mike = new Student('mike', 'peterson', 1997, 'BIT');

console.log(mike);
console.log(mike.constructor === Person);
console.log(mike.constructor === Student);
console.log(mike.calcAge());
