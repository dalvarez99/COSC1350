/* ..:: B R E A K O U T   G A M E ::..
 *
 * breakout.js
 * Author: Dulce Alvarez
 * Date: 11-11-2026
 * Project for COSC 1350
 *
 */

// get the canvas element from the DOM.
const canvas = document.getElementById("myCanvas");

/* create a "2d rendering context". */
const ctx = canvas.getContext("2d");

// drawing a ball requires the x position, y position, and radius
let ballRadius = 15, xPos = canvas.width / 2, yPos = canvas.height / 2;

// xy move distance. These values are used to move the ball around.
let xMoveDist = 3, yMoveDist = 3;

// Paddle variables
let xPaddle = (canvas.width - 100) / 2;
let yPaddle = canvas.height - 30;

let moveLeft = false;
let moveRight = false;

// function that draws the ball on the canvas
const ballRender = () => {
    ctx.beginPath();

    // arc creates circular arc starting at 0, ending at 2pi (360 degrees)
    ctx.arc(xPos, yPos, ballRadius, 0, Math.PI * 2);

    // fill in the circular path with a color
    ctx.fillStyle = "#8a55c7";
    ctx.fill();

    ctx.closePath();
};

// Function that draws the paddle
const paddleRender = () => {
    ctx.fillStyle = "#49366b";
    ctx.fillRect(xPaddle, yPaddle, 100, 15);
};

// Listen for keys being pressed
document.addEventListener("keydown", keyDownHandler);

// Listen for keys being released
document.addEventListener("keyup", keyUpHandler);

// Function that handles key presses
function keyDownHandler(event) {
    if (event.key === "ArrowLeft" || event.key === "a") {
        moveLeft = true;
        event.preventDefault();
    }

    if (event.key === "ArrowRight" || event.key === "d") {
        moveRight = true;
        event.preventDefault();
    }
}

// Function that handles key releases
function keyUpHandler(event) {
    if (event.key === "ArrowLeft" || event.key === "a") {
        moveLeft = false;
    }

    if (event.key === "ArrowRight" || event.key === "d") {
        moveRight = false;
    }
}

/*
 * draw() can be thought of as our main function.
*/
const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Move the ball
    xPos += xMoveDist;
    yPos += yMoveDist;

    // Bounce the ball off the left and right walls
    if (xPos > canvas.width - ballRadius || xPos < ballRadius) {
        xMoveDist = -xMoveDist;
    }

    // Bounce the ball off the top and bottom walls
    if (yPos > canvas.height - ballRadius || yPos < ballRadius) {
        yMoveDist = -yMoveDist;
    }

    // Move the paddle left or right
    if (moveLeft) {
        xPaddle -= 3;
    }

    if (moveRight) {
        xPaddle += 3;
    }

    // Keep the paddle inside the canvas
    if (xPaddle < 0) {
        xPaddle = 0;
    }

    if (xPaddle > canvas.width - 100) {
        xPaddle = canvas.width - 100;
    }

    // Draw the ball and paddle
    ballRender();
    paddleRender();
};


// Try playing around with the refreshRate value.
const refreshRate = 40;
const intervalID = setInterval(draw, refreshRate);
