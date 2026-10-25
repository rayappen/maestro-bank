'use strict';

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  balance: 0,
  month: 'sep',
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  balance: 0,
  month: 'apr',
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  balance: 0,
  month: 'sep',
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  balance: 0,
  month: 'dec',
};

const accounts = [account1, account2, account3, account4];

const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (account, sort = false) {
  containerMovements.innerHTML = '';
  const movs = sort
    ? account.movements.slice().sort((a, b) => a - b)
    : account.movements;
  movs.forEach(function (mov, i) {
    const movType = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
        <div class="movements__row">
          <div class="movements__type movements__type--${movType}">${i + 1} ${movType}</div>
          <div class="movements__value">${mov}$</div>
        </div>
        `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcBalance = function (account) {
  console.log('test, ', account);
  account.balance = account.movements.reduce((acc, curr) => acc + curr, 0);
};

const createUsername = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map((name) => name[0])
      .join('');
  });
  console.log(accs);
};

const displaySummary = function (account) {
  const deposit = account.movements
    .filter((mov) => mov > 0)
    .reduce((acc, curr) => acc + curr, 0);
  labelSumIn.textContent = `${deposit}$`;

  const withdrawal = account.movements
    .filter((mov) => mov < 0)
    .reduce((acc, curr) => acc + curr, 0);
  labelSumOut.textContent = `${withdrawal}$`;

  const interest = account.movements
    .filter((mov) => mov > 0)
    .map((mov) => (mov * account.interestRate) / 100)
    .filter((int, i, arr) => {
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}$`;
};

const updateUI = function (currentAcc) {
  //Display movements
  displayMovements(currentAcc);
  //Display balance
  calcBalance(currentAcc);
  labelBalance.textContent = `${currentAcc.balance}$`;
  //Display summary
  displaySummary(currentAcc);
};

createUsername(accounts);
let currentAcc;

console.log(accounts);

btnLogin.addEventListener('click', function (e) {
  //   console.log('Login');
  //   console.log(inputLoginUsername.value);
  e.preventDefault(); //avoid trigger submit action since we are calling callback function
  currentAcc = accounts.find(
    (acc) => acc.username === inputLoginUsername.value,
  );

  //   console.log(currentAcc);
  if (currentAcc?.pin === Number(inputLoginPin.value)) {
    //Display UI welcome message
    labelWelcome.textContent = `Hi ${currentAcc.owner.split(' ')[0]}, welcome back!`;
    containerApp.style.opacity = 100;

    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
    updateUI(currentAcc);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();

  const transferAmount = Number(inputTransferAmount.value);
  const reciever = accounts.find(
    (acc) => acc.username === inputTransferTo.value,
  );

  inputTransferAmount.value = inputTransferTo.value = '';
  console.log(transferAmount, reciever);

  if (
    transferAmount > 0 &&
    reciever &&
    currentAcc.balance >= transferAmount &&
    currentAcc.username !== reciever.username
  ) {
    currentAcc.movements.push(-transferAmount);
    reciever.movements.push(transferAmount);

    calcBalance(currentAcc);
    calcBalance(reciever);
    updateUI(currentAcc);
  }
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  console.log('delete');
  if (
    inputCloseUsername.value === currentAcc.username &&
    Number(inputClosePin.value) === currentAcc.pin
  ) {
    const idx = accounts.findIndex(
      (acc) => acc.username === currentAcc.username,
    );
    accounts.splice(idx, 1);
    containerApp.style.opacity = 0;

    inputCloseUsername.value = inputClosePin.value = '';
  }
});

console.log(accounts[0].movements);
const lastLargestWithdrawal = accounts[0].movements.findLast(
  (mov) => mov > 2000,
);
const lastLargestWithdrawalIdx = accounts[0].movements.findLastIndex(
  (mov) => mov > 2000,
);
console.log(lastLargestWithdrawal);
console.log(lastLargestWithdrawalIdx);
console.log(accounts[0].movements);

console.log(accounts[0].movements.includes(-130));
console.log(
  accounts[0].movements.some((mov) => {
    console.log('test');
    return mov < 100;
  }),
);

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAcc.movements.some((mov) => mov >= amount * 10)) {
    currentAcc.movements.push(amount);
    updateUI(currentAcc);
  }
  inputLoanAmount.value = '';
});

let sort = false;

btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAcc, !sort);
  sort = !sort;
});

console.log(
  'this is a test',
  accounts[0].movements.every((mov) => mov > 0),
);

const sampleArr = [1, 2, 3, 4, 5];
const sampleArr2 = [[1, 2, [3]], 4, 5, 6];

console.log(sampleArr2.flat());
console.log(sampleArr2.flat(2));

// const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
const owners = ['j', 'z', 'a', 'm'];

console.log(owners);

owners.sort((a, b) => {
  console.log('a, b :: ', a, b);
  if (b.toLowerCase() > a.toLowerCase()) {
    return -1;
  } else if (a.toLowerCase() < b.toLowerCase()) {
    return 1;
  }
});

console.log(owners);
const gorupByArray = Object.groupBy(accounts, (acc) => acc.month);
console.log(gorupByArray);

console.log([1, 2, 3]);
console.log(new Array(7));
console.log(new Array(7, 2));

const arrayX = new Array(2);
// arrayX.fill(2);
// console.log(arrayX);
arrayX.fill(2, 0); //value, start, end
console.log(arrayX);

const y = Array.from({ length: 7 }, () => 1);
const x = Array.from({ length: 7 }, (cur, i) => i + 1);

console.log(y);
console.log(x);

console.log(Array.from(2));

labelBalance.addEventListener('click', function () {
  const movementUIElements = Array.from(
    document.querySelectorAll('.movements__value'),
    (ele) => Number(ele.textContent.replace('$', '')),
  );

  console.log(movementUIElements);
});

// console.log(x.reverse());
console.log(x.toReversed());
console.log(x);

x.push(1);
console.log(x);

console.log(x.toSorted());
// console.log(x.sort());
