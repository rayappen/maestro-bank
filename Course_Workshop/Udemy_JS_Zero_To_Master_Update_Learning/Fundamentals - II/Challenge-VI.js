"use strict";

const tips = []; 
const total = [];
const bills = [125, 555, 44];

function calcTip(amount) {
    if (typeof amount !== 'number' || amount < 0) {
        return -1;
    }
    const tipPercentage = (amount >= 50 && amount <= 300) ? 0.15 : 0.20;
    return amount * tipPercentage;
}

bills.forEach(amount => tips.push(calcTip(amount)));

for(let i = 0; i < tips.length; i++) {
    total.push(bills[i] + tips[i]);
}

console.log(bills);
console.log(tips);
console.log(total);