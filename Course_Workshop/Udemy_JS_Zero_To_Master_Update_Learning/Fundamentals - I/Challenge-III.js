const dolphineScores = [96, 108, 89];
const KoalaScores = [88, 91, 110];

function calculateAvgScore(scoreList) {
  let total = 0;
  if (Array.isArray(scoreList) && scoreList.length > 0) {
    const listSize = scoreList.length;
    scoreList.forEach((score) => {
      total += Number(score);
    });
    return total / listSize;
  }
  return -1;
}

let dolphineAvg = calculateAvgScore(dolphineScores);
let KoalaAvg = calculateAvgScore(KoalaScores);

if (dolphineAvg > KoalaAvg) console.log("Dolphins win the trophy");
else if (KoalaAvg > dolphineAvg) console.log("Koalas win the trophy");
else console.log("Both win the trophy");
