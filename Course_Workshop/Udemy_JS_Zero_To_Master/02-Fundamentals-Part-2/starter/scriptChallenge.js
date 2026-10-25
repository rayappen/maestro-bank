'use strict';

const personTemplate = {
  personName: "",
  birthYear: 0,
  age: 0,
  hobbyList: [],

  calAge() {
    this.age = this.birthYear - new Date().getFullYear();
  }
  
};

let answer = prompt('Shall we start?');

switch (answer.toLowerCase()){
    case 'yes':
        triggerMainFunction();
        break;
    case 'no':
        alert('you shall not poop');
        break;
    default:
        console.log('Hidden Message Triggered');
        break;
}

function validateString(str, type) {

    if(type === 1) {
        return /\d/.test(str)
    }
    else if(type == 2) {
        return "" === str;
    }

  return /\d/.test(str) || "" === str;
}

function askStringValueValidation(string) {
    let answer;
    while(validateString(string, 3)) {
        alert('Enter proper value !!!')
        answer = prompt(`Enter hobby no: ${countMaintainer}`);
    }
    return answer;
}

function askNumberValueValidation(string) {
    let answer;
    while(validateString(string, 1)) {
        alert('Enter proper value !!!')
        answer = prompt(`Enter hobby no: ${countMaintainer}`);
    }
    return answer;
}

function triggerMainFunction() {

    const person = Object.create(personTemplate);
    person.personName = prompt('Your Name?');
    person.birthYear = parseInt(prompt('Your birth year?'), 10);
    person.calAge();
    const noOfHobbies = prompt('Hobbies Count');
    const hobbyList = new Array(noOfHobbies);

    if(noOfHobbies > 0) {
        for(let i = 0; i < noOfHobbies; i++) {
            let hobby = prompt(`Enter hobby no: ${i + 1}`);
            hobbyList.push(askStringValueValidation(hobby));
        }
    }
    else {
        alert('I pity thy fool');
    }
    person.hobbyList = hobbyList;
    console.log('person:', person)
}

