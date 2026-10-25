console.log('Exporting module');

export const shippingCost = 10;
export const cart = [];

export const addToCart = function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity}: ${product} added to the caaart !!!`);
};

const test1 = 0;
const test2 = 1;

export { test1 as t1, test2 as t2 };

export default function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity}: ${product} added to the caaart !!!`);
}
