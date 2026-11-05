const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// Trapezoid
function drawTrapezoid(x,y,width,height) {
    ctx.beginPath();
    ctx.moveTo(x,y);
    ctx.lineTo(x + width,y);
    ctx.lineTo(x + width - 30,y + height);
    ctx.lineTo(x + 30, y + height);
    ctx.closePath();

    ctx.stroke();
}

// Red Diamond 
function drawDiamond(x,y,size) {
    ctx.save();

    ctx.translate(x,y);
    ctx.rotate(Math.PI /4);

    ctx.fillStyle ="red";
    ctx.fillRect(-size /2, -size /2, size, size);

    ctx.restore();
}

// Zigzagging line
function drawZigzag(x, y, width, height, segments) {
    ctx.beginPath();
    ctx.moveTo(x, y);

    for (let i=1; i<= segments; i++) {
        let nextX = x + (width / segments) * i;

        let nextY;

        if (i % 2 === 0) {
            nextY = y;
        } else {
            nextY = y + height;
        }

        ctx.lineTo(nextX, nextY);
    }

    ctx.stroke();
}

// Spiral made up of 100 straight line segments
function drawSpiral(x, y, size) {
    ctx.beginPath();
    ctx.moveTo(x,y);

    let angle = 0;

    for (let i= 0; i < 100; i++) {
        angle += 0.2;

        let radius = (size / 100) * i;

        let nextX = x + Math.cos(angle) * radius;
        let nextY = y + Math.sin(angle) * radius;

        ctx.lineTo(nextX, nextY);
    }

    ctx.stroke();
}

// Yellow star
function drawStar(x,y, outerRadius, innerRadius, points) {
    ctx.beginPath();

    for (let i= 0; i< points *2; i++) {
        let angle = (Math.PI / points) * i - Math.PI / 2;

        let radius;

        if (i % 2 ===0) {
            radius = outerRadius;
        } else{
            radius = innerRadius;
        }

        let pointX = x + Math.cos(angle) * radius;
        let pointY = y + Math.sin(angle) * radius;

        if (i ===0) {
            ctx.moveTo(pointX, pointY);
        } else {
            ctx.lineTo(pointX, pointY);
        }
    }

    ctx.closePath();

    ctx.fillStyle = "yellow";
    ctx.fill();
    ctx.stroke();
}

// All 5 shapes
drawTrapezoid(30, 40, 150, 80);

drawDiamond(300, 80, 90);

drawZigzag(30, 180, 200, 50, 10);

drawSpiral(300, 300, 120);

drawStar(480, 350, 70, 30, 5);