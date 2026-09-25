/*
Name: Dulce Alvarez
Filename: fizzBuzz.js
Date: 09/24/2026
*/

for (let number = 1; number <= 100; number++) {
    if(number % 3 === 0) {
        console.log("Fizz");
    }
    else if (number % 5 === 0) {
        console.log("Buzz");
    }
    else {
        console.log(number);
    }
}