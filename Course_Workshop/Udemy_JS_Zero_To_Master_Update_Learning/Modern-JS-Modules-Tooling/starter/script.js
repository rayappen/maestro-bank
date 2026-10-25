//All the imported statements are hoisted to the top
// import { addToCart, cart } from './shoppingCart.js';
// import * as shoppingCart from './shoppingCart.js';

// console.log('Importing module');
// shoppingCart.addToCart('xbox', 100);
// console.log(shoppingCart.cart);

// console.log(shoppingCart.t1);
// console.log(shoppingCart.t2);

// import mikewitsoskey from './shoppingCart.js';
// importing creates a live connection to both modules
// import mikewitsoskey, { addToCart, cart } from './shoppingCart.js';

// mikewitsoskey('Jenkin', 2);
// addToCart('xbox', 100);
// console.log(cart);

// const resp = await fetch('https://jsonplaceholder.typicode.com/posts');
// const data = await resp.json();
// console.log(data);

const getLastPost = async function () {
  const resp = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await resp.json();

  return { text: data.at(-1).body };
};

const lastPost1 = getLastPost();
console.log(lastPost1);

// const lastPost2 = await getLastPost();
// console.log(lastPost2);

const shoppingCart2 = function () {
  const cart = [];
  const shoppingCost = 267;
  const totalPrice = 237;
  const totalQuantity = 23;

  const addToCart = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(`${quantity}: ${product} added to the caaart !!!`);
  };

  const orderStock = function (product, quantity) {
    console.log(`${quantity}: ${product} ordered from the supplier !!!`);
  };

  return {
    cart,
    shoppingCost,
    totalPrice,
    totalQuantity,
  };
};

// import cloneDeep from '../../node_modules/lodash-es/cloneDeep.js';
// import cloneDeep from 'lodash-es/cloneDeep';
import cloneDeep from 'lodash-es';

const state = {
  cart: [
    { product: 'bread', quantity: 5 },
    { product: 'bread', quantity: 5 },
  ],
  user: { loggedIn: true },
};

const stateClone = Object.assign({}, state);
const stateDeepClone = cloneDeep(state);
state.user.loggedIn = false;
console.log(stateClone);
console.log(stateDeepClone);

// if (module.hot) {
//   module.hot.accept();
// }

import 'core-js/stable';
import 'core-js/stable/array/find';

import 'regenerator-runtime/runtime';
