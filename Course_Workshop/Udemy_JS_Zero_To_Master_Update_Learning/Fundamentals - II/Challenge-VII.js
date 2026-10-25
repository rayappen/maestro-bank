"use strict";

const mark = {
    name: 'Mark',
    fullName: 'Mark Miller',
    mass: 78,
    height: 1.69,
    bmi: 0,

    calcBMI: function () {
        this.bmi = this.mass / (this.height * this.height);
        return this.bmi;
    }
};

const john = {
    name: 'John',
    fullName: 'John Smith',
    mass: 92,
    height: 1.95,
    bmi: 0,

    calcBMI: function () {
        this.bmi = this.mass / (this.height * this.height);
        return this.bmi;
    }
};

mark.calcBMI();
john.calcBMI();



if (mark.bmi > john.bmi) {
console.log(`${mark.fullName}'s BMI (${mark.bmi}) is higher than ${john. fullName}'s BMI (${john.bmi})`);
}else if (john.bmi > mark.bmi) {
console.log(`${john.fullName}'s BMI (${john.bmi}) is higher than ${mark.fullName}'s BMI (${mark.bmi})`);
}
