const dolphineScoreList = [44, 23, 49];
const koalasScoreList = [65, 54, 49];

let calcAverageII = scoreList => {
    if(Array.isArray(scoreList) && scoreList.length > 0) {
        let total = 0;
        scoreList.forEach(score => {
            if(Number.isInteger(score))
            total += Number(score);
        })
        
        return total / scoreList.length;
    }
    return -1;
}

const calcAverage = (a, b, c) => (a + b + c) / 3;

let scoreDolphins = calcAverage(44, 23, 71);
let scoreKoalas = calcAverage(65, 54, 49);

const checkWinner = (avgDolphins, avgKoalas) => {
    if (avgDolphins >= 2 * avgKoalas) {
        console.log(`Dolphins win (${avgDolphins} vs. ${avgKoalas})`);
    } else if (avgKoalas >= 2 * avgDolphins) {
        console.log(`Koalas win (${avgKoalas} vs. ${avgDolphins})`);
    } else {
        console.log('No team wins...');
    }
};

checkWinner(scoreDolphins, scoreKoalas);

scoreDolphins = calcAverage(85, 54, 41);
scoreKoalas = calcAverage(23, 34, 27);
checkWinner(scoreDolphins, scoreKoalas);