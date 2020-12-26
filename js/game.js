let cvs = document.getElementById("canvas");
let ctx = cvs.getContext("2d");

let bird = new Image();
let bg = new Image(); // Создание объекта
let fg = new Image(); // Создание объекта
let pipeUp = new Image(); // Создание объекта
let pipeBottom = new Image(); // Создание объекта

// При нажатии на какую-либо кнопку
document.addEventListener("keydown", moveUp);

// поднимаем птичку
function moveUp() {
    yPos -=25;
    fly.play();
}
//Создание блоков
let pipe = [];
pipe[0] = {
    x : cvs.width,
    y : 0
}

let score = 0;
//Позиция птички
let xPos = 10;
let yPos = 150;
let grav = 1.5; //гравитация


bird.src = "image/bird.png"; // Указание нужного изображения
bg.src = "image/bg.png"; // Аналогично
fg.src = "image/fg.png"; // Аналогично
pipeUp.src = "image/pipeUp.png"; // Аналогично
pipeBottom.src = "image/pipeBottom.png"; // Аналогично

// Звуковые файлы
let fly = new Audio(); // Создание аудио объекта
let score_audio = new Audio(); // Создание аудио объекта

fly.src = "audio/fly.mp3"; // Указание нужной записи
score_audio.src = "audio/score.mp3"; // Аналогично

let gap = 90;

function draw() {
    ctx.drawImage(bg, 0, 0);
    for (i = 0; i < pipe.length; i++) {
        ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);

        pipe[i].x--;

        if (pipe[i].x == 125){
            pipe.push({
                x : cvs.width,
                y : Math.floor(Math.random() * pipeUp.height) - pipeUp.height
            });
        }
        // проверка на столкновение
        if(xPos + bird.width >= pipe[i].x
            && xPos <= pipe[i].x + pipeUp.width
            && (yPos <= pipe[i].y + pipeUp.height
            || yPos + bird.height >= pipe[i].y + pipeUp.height + gap)
            || yPos + bird.height >= cvs.height - fg.height) {
            location.reload(); // перезагрузка страницы
        }

        if (pipe[i].x == 5){
            score++;
            score_audio.play();
        }
    }

    ctx.drawImage(fg, 0, cvs.height - fg.height);
    ctx.drawImage(bird, xPos,  yPos);

    yPos += grav;

    ctx.fillStyle = "#000";
    ctx.font = "24px Verdana";
    ctx.fillText('Счет: ' + score, 10, cvs.height - 20);

    requestAnimationFrame(draw);
}
pipeBottom.onload = draw;
