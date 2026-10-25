
let massMark = 78;
let heightMark = 1.69;

let massJohn = 92;
let heightJohn = 1.95;

function calculateBMI(mass, height) {
    return mass / (height * height);
}

let markBMI = calculateBMI(massMark, heightMark);
let johnBMI = calculateBMI(massJohn, heightJohn);

// console.log("Mark BMI: " + markBMI);
// console.log("John BMI: " + johnBMI);
// console.log("markHigherBMI: " + markBMI > johnBMI);

console.log(`Mark's BMI: ${markBMI} and John's BMI: ${johnBMI} and isMarkBMI Higher: ${markBMI > johnBMI}`);