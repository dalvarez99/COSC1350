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

// Brick variables
let brickRows = 4;
let brickColumns = 6;
let brickWidth = 90;
let brickHeight = 25;
let brickPadding = 10;
let brickTopOffset = 40;
let brickLeftOffset = 5;

// Array to hold the bricks
let bricks = [];

// Create the brick objects
for (let r = 0; r < brickRows; r++) {
    for (let c = 0; c < brickColumns; c++) {
        let brickX = (c * (brickWidth + brickPadding)) + brickLeftOffset;
        let brickY = (r * (brickHeight + brickPadding)) + brickTopOffset;

        bricks.push({
            x: brickX,
            y: brickY,
            hit: false
        });
    }
}

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

// Function that draws the bricks
const brickRender = () => {
    for (let i = 0; i < bricks.length; i++) {
        if (!bricks[i].hit) {
            ctx.fillStyle = "#8a55c7";

            ctx.fillRect(
                bricks[i].x,
                bricks[i].y,
                brickWidth,
                brickHeight
            );
        }
    }
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

const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Move the ball
    xPos += xMoveDist;
    yPos += yMoveDist;

    // Check for collisions with bricks
    for (let i = 0; i < bricks.length; i++) {
        if (!bricks[i].hit &&
            xPos > bricks[i].x &&
            xPos < bricks[i].x + brickWidth &&
            yPos > bricks[i].y &&
            yPos < bricks[i].y + brickHeight) {

            bricks[i].hit = true;
            yMoveDist = -yMoveDist;
        }
    }

    // Bounce the ball off the left and right walls
    if (xPos > canvas.width - ballRadius || xPos < ballRadius) {
        xMoveDist = -xMoveDist;
    }

    // Bounce the ball off the top wall
    if (yPos < ballRadius) {
        yMoveDist = -yMoveDist;
    }

    // Check for collision with the paddle
    if (yPos + ballRadius >= yPaddle &&
        xPos + ballRadius >= xPaddle &&
        xPos - ballRadius <= xPaddle + 100 &&
        yPos < yPaddle + 15) {

        yMoveDist = -Math.abs(yMoveDist);
    }

    // Game over if the ball misses the paddle
    else if (yPos + ballRadius >= canvas.height) {
        clearInterval(intervalID);
        alert("Game Over!");
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

    // Draw the ball, paddle, and bricks
    ballRender();
    paddleRender();
    brickRender();
};

const refreshRate = 40;
const intervalID = setInterval(draw, refreshRate);
