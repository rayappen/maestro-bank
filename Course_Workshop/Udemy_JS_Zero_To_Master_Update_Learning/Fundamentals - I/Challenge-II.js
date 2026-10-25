const massMark = 78;
const heightMark = 1.69;
const massJohn = 92;
const heightJohn = 1.95;

function calculateBMI(mass, height) {
    return mass / (height * height);
}

const BMIMark = calculateBMI(massMark, heightMark);
const BMIJohn = calculateBMI(massJohn, heightJohn);

console.log(BMIMark > BMIJohn ? `Mark's BMI ${(BMIMark - BMIJohn).toFixed(2)} is higher than John's!` : `John's BMI ${(BMIMark - BMIJohn).toFixed(2)} is higher than Mark's!`);