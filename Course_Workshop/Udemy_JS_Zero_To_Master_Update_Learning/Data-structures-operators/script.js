'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

const italianFoods = new Set([
  'pasta',
  'gnocchi',
  'tomatoes',
  'olive oil',
  'garlic',
  'basil',
]);

const mexicanFoods = new Set([
  'tortillas',
  'beans',
  'rice',
  'tomatoes',
  'avocado',
  'garlic',
]);

const job = {
  department: 'IT',
};

const weekday = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],
  openingHours: {
    [weekday[3]]: {
      open: 12,
      close: 22,
    },
    [weekday[4]]: {
      open: 11,
      close: 23,
    },
    [weekday[5]]: {
      //ES6 enhanced object literal needs [<name || calculation || anything>]
      open: 0,
      close: 24,
    },
    sun: {
      open: 12,
      close: 18,
    },
  },
  job,

  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  orderDelivery: function ({ starterIndex = 0, mainIndex, time, address }) {
    console.log(starterIndex + '\n' + mainIndex + '\n' + time + '\n' + address);
  },

  preparePasta(ing1, ing2, ing3, ing4) {
    console.log(`ing1: ${ing1} ing2: ${ing2} ing3: ${ing3} ing4: ${ing4}`);
  },
};

let arr = [];

for (let i = 0; i <= 10; i++) {
  arr[i] = i;
}

// console.log(arr);
let [x, y] = restaurant.categories;
// console.log(x, y);

// const temp = x;
// x = y;
// y = temp;
// console.log(x, y);

[x, y] = [y, x];
// console.log(x, y);

// console.log("TTT");
// console.log(restaurant.order(1, 2));

// console.log("PPP");
const { name, openingHours, categories } = restaurant;
// console.log(name, openingHours, categories);

// const {
//   name: restaurantName,
//   openingHours: hours,
//   categories: tags,
// } = restaurant;
// console.log(restaurantName);
// console.log(hours);
// console.log(tags);
// console.log(restaurantName, hours, tags);

// const { menu = [], starterMenu: starters = [] } = restaurant;
// console.log(menu, starters);

//Value manipulation
// let a = 15;
// let b = 16;

// const obj = { a: 90, b: 80, c: 70 };
// ({ a, b } = obj);

// console.log(a, b);

const {
  fri: { open, close },
} = openingHours;
console.log(open, close);

restaurant.orderDelivery({
  time: '22:30',
  address: 'Vivala viva',
  mainIndex: 2,
  starterIndex: 2,
});

const arrT = [7, { name: 'pete' }, 9];

const newArrT = [1, 2, ...arrT];

console.log(arrT);

newArrT[2] = 999;
newArrT[3].name = 'Gey';
console.log(arrT);
console.log(newArrT);

const ingredients = ['pasta', 'ginger', 'potato'];

restaurant.preparePasta(...ingredients);

const arrA = [1, 2, 3, 4, 5];
const [a, b, ...c] = arrA; //Note rest operator should be placed last.

console.log('kkk');
console.log(arrA);
console.log(a, b, c);

const sum = function (...value) {
  let val = 0;
  return value.reduce((acc, cur) => acc + cur, 0);
};

console.log(sum(1, 2, 3, 4, 5));

//short circuting when 1st value is truthy - || - OR
console.log(3 || 'more');
console.log('' || 'ko');
console.log(true || 0);
console.log(undefined || NaN);
console.log(undefined || '' || 0 || 3);

//short circuting when 1st value is false - && - AND
console.log(undefined && 2);
console.log();

console.log('hellow' && 23 && null && 'poopies'); //order of precdence same coz all same operator
//'hellow' && 23 == true
//true && null == null because looks for falsy value
//null && 'poopies' == null never reaches this point since it already found a falsy value

const trueBool = true;
const falseBool = false;

if (trueBool && falseBool) {
  console.log('this executed even tho it had false in it');
}

if (trueBool && 'meow' === true) {
  console.log('this executed even tho it had false in it');
}

//Nullish values - only if the 1st is null or undefind 2nd value is executed
const sampleTest = null;
const output = sampleTest ?? 10;
console.log(output);

const rest1 = {
  name: 'Capri',
  numGuests: 20,
};

const rest2 = {
  name: 'La Pizza',
  owner: 'Giovanni Rossi',
};

rest1.numGuests = rest1.numGuests || 10;
rest2.numGuests = rest2.numGuests || 10;

// rest1.numGuests ||= 10;
// rest2.numGuests ||= 10;

// rest1.numGuests &&= 10;
// rest2.numGuests &&= 10;

// rest1.numGuests ??= 10;
// rest2.numGuests ??= 10;

// console.log(rest1.numGuests);
// console.log(rest2.numGuests);

rest1.owner &&= 'meow';
rest2.owner &&= 'sano';

// console.log(rest1.owner);
// console.log(rest2.owner);

rest2.owner = rest2.owner && 'anna' && 'dope';
// console.log(rest2.owner);

const menu = [...restaurant.starterMenu, ...restaurant.starterMenu];

// for (const item of menu) {
//   console.log(item);
// }

// for (const item of menu.entries()) {
//   console.log(item);
// }

// console.log(...menu);

// for (const [i, el] of menu.entries()) {
//   console.log(`${i + 1}: ${el}`);
// }

// console.log(restaurant);

console.log(restaurant.openingHours.mon?.open);
console.log(restaurant.openingHours?.mon?.open); //optional opertor helps us to find out if object is null or undefined

const weekdatII = [...weekday];
// console.log(weekdatII);

for (const day of weekdatII) {
  const open = restaurant.openingHours[day]?.open || 'closed';
  //   console.log(open);

  console.log(
    `On ${day}, ` + (open === 'closed' ? "we're closed" : `we open at ${open}`),
  );
}

console.log(restaurant.order?.(0, 1) ?? 'Method does not exist');

const properties = Object.keys(openingHours);
console.log(properties);

for (const day of Object.keys(openingHours)) {
  console.log(day);
}

const values = Object.values(openingHours);

const entries = Object.entries(openingHours);
// console.log(entries);

for (const [key, ele] of entries) {
  console.log(ele);
}

const menuII = ['Pizza', 'Pasta', 'Salad'];
console.log(menuII.entries());

const sampleSet = new Set(['pasta', 'noodle', 'pasta']);

console.log(sampleSet);
console.log(sampleSet.has('pan'));
console.log(sampleSet.has('pasta'));

sampleSet.add('pan');
sampleSet.delete('noodle');
console.log(sampleSet.size);
console.log(sampleSet);

const tes = [...sampleSet];
console.log(tes);

const staff = ['waiter', 'waiter', 'waiter', 'manager', 'chef'];
const set = [...new Set(staff)];
console.log(set);

console.log(new Set('abba').size);
console.log(new Set('abba'));

//italianFoods,mexicanFoods
console.log('Set test');
const commonFoods = italianFoods.intersection(mexicanFoods); //inner join
// console.log(commonFoods);

const italianMexicanFusion = italianFoods.union(mexicanFoods); //union
// console.log(italianMexicanFusion);
console.log([...new Set([italianFoods, ...mexicanFoods])]);

const uniqueItalian = italianFoods.difference(mexicanFoods); //finds only unqic elements from 1st object while comparing with 2nd object
// console.log(uniqueItalian);

const uniqueItalianAndMexianFoods =
  italianFoods.symmetricDifference(mexicanFoods);
console.log(uniqueItalianAndMexianFoods); //Removes every duplicate values from both objects

console.log(italianFoods.isDisjointFrom(mexicanFoods)); //If both 1st object and 2nd elements unique against each other then it is disjoint

const map = new Map();
map.set('name', 'prada');
map.set('job', 'IT');
map.set('open', 11);
map.set('close', '20');
map.set(true, 'we are open');
map.set(false, 'we are closed');
console.log(map.get('name'));

const time = 12;
console.log(map.get(time > map.get('open') && time < map.get('close'))); //map allows to comupte within map function

const mapArr = [1, 2];
map.set(mapArr, 'text');

console.log(map.get([1, 2])); // need to pass the object itself to retive the value - mapped based on reference and on string value
console.log(map.get(mapArr));

map.set(document.querySelector('h1'), 'heading');
console.log(map.get(document.querySelector('h1')));

const mapII = new Map([
  ['name', 'prada'],
  ['job', 'IT'],
  ['open', 11],
  ['close', '20'],
  [true, 'we are open'],
  [false, 'we are closed'],
]);
// const userEntry = prompt('What is your depart?');
// console.log(userEntry == map.get('job') ? 'correct choice' : 'wrong choice');

console.log([...mapII]);
console.log('-----');
console.log(mapII.keys());
console.log('-----');
console.log(mapII.entries());
console.log('-----');
console.log(mapII.values());
