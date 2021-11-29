const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');


class SnakePart {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}


let speed = 7;

let tileCount = 20;
let tileSize = canvas.width / tileCount - 2;
let headX = 10;
let headY = 10;
const snakeParts = [];
let tailLength = 0;

let foodX = 5;
let foodY = 5;

let xVelocity = 0;
let yVelocity = 0;

let score = 0;

function drawGame() { // vong lap
    clearScreen();
    changeSnakePosition();
    let result = isGameOver();
    if (result) {
        return;
    }

    checkFoodCollision();
    drawFood();
    drawSnake();

    drawScore();

    setTimeout(drawGame, 1000 / speed);
}

function isGameOver() {
    let gameOver = false;

    if (yVelocity === 0 && xVelocity === 0) {
        return false;
    }

    if (headX < 0) {
        gameOver = true;
    } else if (headX === tileCount) {
        gameOver = true;
    } else if (headY < 0) {
        gameOver = true;
    } else if (headY === tileCount) {
        gameOver = true
    }

    for (let i = 0; i < snakeParts.length; i++) {
        let part = snakeParts[i];
        if (part.x === headX && part.y === headY) {
            gameOver = true;
            break;
        }
    }


    if (gameOver) {
        ctx.fillStyle = 'white';
        ctx.font = "60px Snap ITC";

        let gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        gradient.addColorStop("0", "magenta");
        gradient.addColorStop("0.5", "white");
        gradient.addColorStop("1.0", "red");
        ctx.fillStyle = gradient;

        ctx.fillText("GameOver", canvas.width / 10, canvas.height / 2);
    }

    return gameOver;
}

function drawScore() {
    ctx.fillStyle = "black";
    ctx.font = "13px Arial Black";
    ctx.fillText("Score :" + score, canvas.width - 70, 13)
}

function clearScreen() {
    ctx.fillStyle = 'gray';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {


    ctx.fillStyle = 'black'
    for (let i = 0; i < snakeParts.length; i++) {
        let part = snakeParts[i];
        ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
    }

    snakeParts.push(new SnakePart(headX, headY));
    if (snakeParts.length > tailLength) {
        snakeParts.shift();
    }
    ctx.fillStyle = 'white'
    ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
}

function changeSnakePosition() {  // thay đổi vị trí của rắn
    headX = headX + xVelocity;
    headY = headY + yVelocity;
}

function drawFood() {
    ctx.fillStyle = "red";
    ctx.fillRect(foodX * tileCount, foodY * tileCount, tileSize, tileSize)
}

function checkFoodCollision() { //  check va  chạm
    if (foodX === headX && foodY === headY) {
        foodX = Math.floor(Math.random() * tileCount);
        foodY = Math.floor(Math.random() * tileCount);
        tailLength++;
        score++;
    }
}

document.body.addEventListener('keydown', keyDown);

function keyDown(event) {
    if (event.keyCode === 38) {
        if (yVelocity === 1)
            return;
        yVelocity = -1;
        xVelocity = 0;
    }
    if (event.keyCode === 40) {
        if (yVelocity === -1)
            return;
        yVelocity = 1;
        xVelocity = 0;
    }
    if (event.keyCode === 37) {
        if (xVelocity === 1)
            return;
        yVelocity = 0;
        xVelocity = -1;
    }
    if (event.keyCode === 39) {
        if (xVelocity === -1)
            return;
        yVelocity = 0;
        xVelocity = 1;
    }
}

drawGame();