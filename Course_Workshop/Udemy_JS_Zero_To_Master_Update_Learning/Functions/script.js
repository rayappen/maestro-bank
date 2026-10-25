'use script';

const bookings = [];

const createBooking = function (
  flightNum,
  numPassengers = 1,
  price = 199 * numPassengers,
) {
  const booking = {
    flightNum,
    numPassengers,
    price,
  };
  bookings.push(booking);
  console.log(bookings);
};

createBooking('LH123');

const oneWord = function (str) {
  return str.replace(/ /g, '').toLowerCase();
};

const upperFirstWord = function (str) {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
};

const transformer = function (str, fn) {
  console.log(`Original string: ${str}`);
  console.log(`Transformed string: ${fn(str)}`);
  console.log(`Tranformed by ${fn.name}`);
};

transformer('js mew meow', upperFirstWord);
transformer('js mew meow', oneWord);

const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};

// const greeterHey = greet('Hey'); //in java it is similar to create instance of greet with 'Hey' as value and returns the function itself as output
// greeterHey('Mark');
// greeterHey('Jio');

// greet('Hello')('Giggity'); //1st ()  runs the factory and returns us with instance - function and 2nd triggers the instance - function

const greetArr = (greeting) => (nme) => console.log(`${greeting} ${nme}`);
greetArr('Hi')('Peter');

const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  book(flightNum, name) {
    // console.log(
    //   `${name} booked a seat on ${this.airline}
    //     flight ${this.iataCode}${flightNum}`,
    // );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
  },
};

lufthansa.book(239, 'Jonas Schmedtmann');
lufthansa.book(635, 'John Smith');
console.log(lufthansa);

const eurowings = {
  name: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

const book = lufthansa.book;
book.call(eurowings, 145, 'Meow don');
console.log(eurowings);
book.call(lufthansa, 179, 'Dally');

const flightData = [583, 'Copper'];
book.apply(eurowings, flightData);

//Bind method
const euroBook = book.bind(eurowings);
euroBook(903, 'stephen hawk');

// With Event Listeners
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log(this);
  this.planes++;
  console.log(this.planes);
};
// lufthansa.buyPlne();
document.body.append(document.createElement('button'));
document
  .querySelector('button')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

// Partial application
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

const addVAT = addTax.bind(null, 0.23);
// addVAT = value => value + value * 0.23;

// console.log(addVAT(100));
// console.log(addVAT(23));

const addVATf = function (rate) {
  return function (value) {
    return value + value * rate;
  };
};

const calVAT = addVATf(1);
console.log(calVAT(220));
