const bill = 275;

function calculateTip(amount) {
    if(Number.isInteger(amount)) {
        let fifteenPercent = amount * (15/100);
        let twentyPercent = amount * (20/100);
        return amount >= 50 && amount <= 300 ?  fifteenPercent : twentyPercent;
    }
    return -1;
}

let tip = calculateTip(bill);
console.log(`The bill was ${bill}, the tip was ${tip}, and the total value ${bill + tip}`);