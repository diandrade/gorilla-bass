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

    // Desenhar gorila com possível deslocamento de ataque
    const gorillaOffsetX = gorilla.isAttacking ? 10 : 0;
    ctx.drawImage(
        gorillaImage,
        gorilla.x + gorillaOffsetX,
        gorilla.y,
        gorilla.width,
        gorilla.height
    );

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
}

function atualizarHUD() {
    document.getElementById('vida-gorila').textContent = Math.max(0, Math.round(gorilla.hp));
    document.getElementById('mortos').textContent = killedHumans;
    const vivos = humans.filter(h => h.alive).length;
    document.getElementById('vivos').textContent = vivos;
}

function adicionarLog(mensagem) {
    const log = document.getElementById('log');
    const novaLinha = document.createElement('p');
    novaLinha.textContent = mensagem;
    log.appendChild(novaLinha);
    log.scrollTop = log.scrollHeight;
}

function curarGorila() {
    gorilla.hp += 10;
    if (gorilla.hp > gorilla.maxHP) {
        gorilla.hp = gorilla.maxHP;
    }
    adicionarLog(`Gorila se curou. HP: ${gorilla.hp}`);
}

function ataqueGorila() {
    gorilla.isAttacking = true;
    setTimeout(() => {
        gorilla.isAttacking = false;
    }, 150); // Duração da animação

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
                adicionarLog(`Humano ${human.id} foi eliminado!`);
            }
        }
    });

    verificarFimDeJogo();
}

function tornarInvulneravel() {
    gorilla.invulneravel = true;
    adicionarLog("Gorila está invulnerável por 3 segundos!");
    setTimeout(() => {
        gorilla.invulneravel = false;
    }, 3000);
}

function humansAttack() {
    if (gorilla.invulneravel) return;

    humans.forEach(human => {
        if (human.alive) {
            const dx = gorilla.x - human.x;
            const dy = gorilla.y - human.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
                gorilla.hp -= 0.2;
            }

        }
    });

    verificarFimDeJogo();
}

function movimentarHumans() {
    const speed = 1;

    humans.forEach(human => {
        if (!human.alive) return;

        const dx = gorilla.x - human.x;
        const dy = gorilla.y - human.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > 1) {
            human.x += (dx / distance) * speed;
            human.y += (dy / distance) * speed;

            human.x = Math.min(Math.max(human.x, 0), canvas.width - human.width);
            human.y = Math.min(Math.max(human.y, 0), canvas.height - human.height);
        }
    });
}

function verificarFimDeJogo() {
    if (gorilla.hp <= 0) {
        alert("O jogo foi encerrado: o gorila morreu!");
        clearInterval(gameInterval);
    }

    const vivos = humans.filter(h => h.alive).length;
    if (vivos === 0) {
        alert("O jogo foi encerrado: todos os humanos foram eliminados!");
        clearInterval(gameInterval);
    }
}

/*-----------------------------------Estado do Jogo (Game State)------------------------------------*/

resizeCanvas();

let gorilla = {
    hp: 100,
    maxHP: 100,
    x: canvas.width * 0.25,
    y: canvas.height * 0.5,
    width: 80,
    height: 80,
    radius: 30,
    invulneravel: false,
    isAttacking: false // NOVO: controle de animação
};

let humans = [];

for (let i = 0; i < 100; i++) {
    humans.push({
        id: i,
        x: canvas.width * 0.5 + Math.random() * (canvas.width * 0.5 - 40),
        y: canvas.height * 0.5 + Math.random() * (canvas.height * 0.5 - 40),
        width: 40,
        height: 40,
        hp: 1,
        maxHP: 1,
        alive: true
    });
}

let killedHumans = Number(localStorage.getItem('killedHumans')) || 0;

let gameInterval;

/*------------------------------Chamada das Funções e Eventos----------------------------------------*/

gorillaImage.onload = function () {
    drawScene();
    atualizarHUD();
};

window.addEventListener('resize', () => {
    resizeCanvas();
    drawScene();
    atualizarHUD();
});

startButton.addEventListener('click', () => {
    startScreen.style.display = 'none';
    gameContainer.style.display = 'block';
    resizeCanvas();
    drawScene();
    atualizarHUD();

    gameInterval = setInterval(() => {
        movimentarHumans();
        humansAttack();
        drawScene();
        atualizarHUD();
        verificarFimDeJogo();
    }, 1000 / 60);
});

canvas.addEventListener('mousedown', (event) => {
    if (event.button === 0) {
        ataqueGorila();
    } else if (event.button === 2) {
        tornarInvulneravel();
    }
    drawScene();
    atualizarHUD();
});


canvas.addEventListener('contextmenu', (event) => event.preventDefault());

document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'w':
            if (gorilla.y - 10 >= canvas.height * 0.5) gorilla.y -= 10;
            break;
        case 's':
            if (gorilla.y + 10 + gorilla.height <= canvas.height) gorilla.y += 10;
            break;
        case 'a':
            if (gorilla.x - 10 >= 0) gorilla.x -= 10;
            break;
        case 'd':
            if (gorilla.x + 10 + gorilla.width <= canvas.width) gorilla.x += 10;
            break;
        case 'q':
            curarGorila();
            break;
    }
    drawScene();
    atualizarHUD();
});
