/*---------------------------------------Constantes--------------------------------------------------*/

const startButton = document.getElementById('start-button');
const startScreen = document.getElementById('start-screen');
const gameContainer = document.getElementById('game-container');
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const gorillaImage = new Image();
gorillaImage.src = './assets/gorilla.png';
const humansImage = new Image();
humansImage.src = './assets/human.png';

/*---------------------------------------Funções-----------------------------------------------------*/

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function drawScene() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(gorillaImage, gorilla.x, gorilla.y, gorilla.width, gorilla.height);

    const barWidth = gorilla.width;
    const barHeight = 8;
    const hpPercentage = gorilla.hp / gorilla.maxHP;

    ctx.fillStyle = 'red';
    ctx.fillRect(gorilla.x, gorilla.y - 15, barWidth, barHeight);

    ctx.fillStyle = 'limegreen';
    ctx.fillRect(gorilla.x, gorilla.y - 15, barWidth * hpPercentage, barHeight);

    ctx.strokeStyle = 'black';
    ctx.strokeRect(gorilla.x, gorilla.y - 15, barWidth, barHeight);

    humans.forEach(human => {
        if (human.alive) {
            ctx.drawImage(humansImage, human.x, human.y, human.width, human.height);
            const barWidth = human.width;
            const barHeight = 5;
            const hpPercentage = human.hp / human.maxHP;

            ctx.fillStyle = 'red';
            ctx.fillRect(human.x, human.y - 10, barWidth, barHeight);

            ctx.fillStyle = 'limegreen';
            ctx.fillRect(human.x, human.y - 10, barWidth * hpPercentage, barHeight);

            ctx.strokeStyle = 'black';
            ctx.strokeRect(human.x, human.y - 10, barWidth, barHeight);
        }
    });
    ctx.font = '20px Arial';
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    const scoreText = `Humans killed: ${killedHumans}`;
    const textWidth = ctx.measureText(scoreText).width;
    ctx.strokeText(scoreText, canvas.width - textWidth - 20, 30);
    ctx.fillText(scoreText, canvas.width - textWidth - 20, 30);

}

function curarGorila() {
    gorilla.hp += 10;
    if (gorilla.hp > gorilla.maxHP) {
        gorilla.hp = gorilla.maxHP;
    }
}

function ataqueGorila() {
    humans.forEach(human => {
        const dx = human.x - gorilla.x;
        const dy = human.y - gorilla.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 80 && human.alive) {
            human.hp -= 1;
            if (human.hp <= 0) {
                human.alive = false;
                killedHumans++;
                localStorage.setItem('killedHumans', killedHumans);
            }
        }
    });
}

function tornarInvulneravel() {
    gorilla.invulneravel = true;
    setTimeout(() => {
        gorilla.invulneravel = false;
    }, 3000); // 3 segundos invulnerável
}

function humansAttack() {
    if (gorilla.invulneravel) return;

    humans.forEach(human => {
        if (human.alive) {
            const dx = gorilla.x - human.x;
            const dy = gorilla.y - human.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
                gorilla.hp -= 1;
            }
        }
    });

    if (gorilla.hp <= 0) {
        alert("Gorila perdeu!");
    }
}

/*-----------------------------------Estado do Jogo (Game State)------------------------------------*/

resizeCanvas();

let gorilla = {
    hp: 100,
    maxHP: 100,
    x: canvas.width * 0.25, // left quarter of the screen
    y: canvas.height * 0.5,
    width: 80,
    height: 80,
    radius: 30,
    invulneravel: false
};

let humans = [];

for (let i = 0; i < 100; i++) {
    humans.push({
        id: i,
        x: canvas.width * 0.5 + Math.random() * (canvas.width * 0.5 - 40), // direita
        y: canvas.height * 0.5 + Math.random() * (canvas.height * 0.5 - 40), // inferior
        width: 40,
        height: 40,
        hp: 1,
        maxHP: 1,
        alive: true
    });
}

let killedHumans = Number(localStorage.getItem('killedHumans')) || 0;

/*------------------------------Chamada das Funções e Eventos----------------------------------------*/

gorillaImage.onload = function () {
    drawScene();
};



window.addEventListener('resize', () => {
    resizeCanvas();
    drawScene();
});

startButton.addEventListener('click', () => {
    startScreen.style.display = 'none';
    gameContainer.style.display = 'block';
    resizeCanvas();
    drawScene();

    // Inicia ataque automático dos humanos
    setInterval(() => {
        humansAttack();
        drawScene();
    }, 1000);
});

//Eventos de Mouse
canvas.addEventListener('mousedown', (event) => {
    if (event.button === 0) {
        tornarInvulneravel();
    } else if (event.button === 2) {
        ataqueGorila();
    }
    drawScene();
});
canvas.addEventListener('contextmenu', (event) => event.preventDefault());

//Eventos de Teclado
document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'w':
            if (gorilla.y - 10 >= 0) {
                gorilla.y -= 10;
            }
            break;
        case 's':
            if (gorilla.y + 10 + gorilla.height <= canvas.height) {
                gorilla.y += 10;
            }
            break;
        case 'a':
            if (gorilla.x - 10 >= 0) {
                gorilla.x -= 10;
            }
            break;
        case 'd':
            if (gorilla.x + 10 + gorilla.width <= canvas.width) {
                gorilla.x += 10;
            }
            break;
        case 'q':
            curarGorila();
            break;
    }
    drawScene();
});
