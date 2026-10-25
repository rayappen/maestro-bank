'use strict';

const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

const gameEvents = new Map([
  [17, '⚽ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽ GOAL'],
  [80, '⚽ GOAL'],
  [92, '🔶 Yellow card'],
]);

const events = new Set(gameEvents.values());
console.log(events);

gameEvents.delete(64);
console.log(gameEvents);

const time = [...gameEvents.keys()].pop();
console.log('avg: ' + time / gameEvents.size);

for (const [key, value] of gameEvents.entries()) {
  const half = key < 45 ? '[FIRST HALF]' : '[SECOND HALF]';
  console.log(`${half} ${key}: ${value}`);
}

const str = 'ABBA @ BAAABAA';
console.log(str.toLowerCase());
console.log(str.slice(1));
console.log(str.slice(0, 4));
console.log(str.toUpperCase());

if (str[0] === 'A') console.log('yes');
else {
  console.log('no');
}

const strArray = str.split('@');
console.log(strArray);

console.log(str.replace('A', 'a'));
console.log(str.replaceAll('A', 'a'));

console.log(str.replace(/A/g, 'z'));

const [firstName, lastName] = 'Jon Math'.split(' ');
const newName = ['Mr.', firstName, lastName].join(' ');
console.log(newName);

const msg = 'joe';
console.log(msg.padStart(6, '+'));
console.log(msg.padEnd(6, '-'));

console.log(msg.repeat(100));
