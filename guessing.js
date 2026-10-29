"use strict";

let randomNumber = Math.floor(Math.random() * 100) + 1;
let guessCount = 0;
let previousGuesses = [];

const guessForm = document.getElementById("guessForm");
const guessInput = document.getElementById("guess");
const lastResult = document.getElementById("lastResult");
const guessesDisplay = document.getElementById("guesses");
const turnsLeft = document.getElementById("turnsLeft");
const restartButton = document.getElementById("restartButton");

guessForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const playerGuess = Number(guessInput.value);

    
    if (!Number.isInteger(playerGuess) ||
        playerGuess < 1 || playerGuess > 100) {
        lastResult.textContent =
            "Enter a whole number between 1 and 100.";
        return;
    }

    previousGuesses.push(playerGuess);
    guessCount++;

    guessesDisplay.textContent =
        "Previous guesses: " + previousGuesses.join(", ");

    if (playerGuess === randomNumber) {
        lastResult.textContent = "Congratulations! You guessed correctly!";
        endGame();
    } else if (playerGuess < randomNumber) {
        lastResult.textContent = "Wrong! Your guess is too low.";
    } else {
        lastResult.textContent = "Wrong! Your guess is too high.";
    }

    turnsLeft.textContent =
        "You have " + (10 - guessCount) + " turns remaining.";

    if (guessCount === 10 && playerGuess !== randomNumber) {
        lastResult.textContent =
            "Game over! The number was " + randomNumber + ".";
        endGame();
    }

    guessInput.value = "";
});

function endGame() {
    guessInput.disabled = true;
    guessForm.querySelector("button").disabled = true;
    restartButton.hidden = false;
    turnsLeft.textContent = "Game finished!";
}

restartButton.addEventListener("click", function() {
    randomNumber = Math.floor(Math.random() * 100) + 1;
    guessCount = 0;
    previousGuesses = [];

    lastResult.textContent = "";
    guessesDisplay.textContent = "Previous guesses:";
    turnsLeft.textContent = "You have 10 turns remaining.";

    guessInput.value = "";
    guessInput.disabled = false;
    guessForm.querySelector("button").disabled = false;
    restartButton.hidden = true;
});