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

for (const [i, ele] of game.scored.entries()) {
  console.log(`Goal ${i + 1}: ${ele}`);
}

let avg = 0;
const oddEntries = Object.values(game.odds);
for (const entry of oddEntries) {
  avg += entry;
}

avg /= oddEntries.length;
console.log('avg: ', avg.toFixed(2));

const temsOdds = Object.entries(game.odds);
for (const [team, odds] of temsOdds) {
  const teamName = game[team];
  console.log(
    `Odd of ${teamName === undefined ? 'draw' : 'victory ' + teamName}: ${odds}`,
  );
}

const test = game.scored;
const scores = {};

for (const goaler of game.scored) {
  scores[goaler] = (scores[goaler] || 0) + 1;
}
console.log(scores);
