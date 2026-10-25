console.log("Script works");

const years = [1990, 1991];

function calAge (birthYear) {
    return 2025 - birthYear; 
}

console.log(calAge(years))

console.log(new Date().getFullYear());