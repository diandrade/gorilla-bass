/*---------------------------------------Constantes--------------------------------------------------*/

const startButton = document.getElementById('start-button');
const startScreen = document.getElementById('start-screen');
const gameContainer = document.getElementById('game-container');
const canvas = document.getElementById('game-canvas');

//Esse método te oferece a capacidade de utilizar o canvas como ferramenta de desenho, permitindo maior flexibilidade de ações.
const ctx = canvas.getContext('2d');
//Gorilla
const gorilla = new Image();
gorilla.src = './assets/gorilla.png';
//Humano
const humans = new Image();
humans.src = './assets/human.png';

/*---------------------------------------Funções-----------------------------------------------------*/

//Função responsável por adaptar o canvas do JS dentro do espaço da tela, de maneira responsiva.
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function drawScene() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(gorilla, gorillaX, gorillaY, gorillaWidth, gorillaHeight);
}

/*------------------------------Chamada das Funções e Eventos----------------------------------------*/

gorilla.onload = function () {
  drawScene();
};

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

startButton.addEventListener('click', () => {
  startScreen.style.display = 'none';
  gameContainer.style.display = 'block';
  resizeCanvas();
  drawScene(); 
});

/*------------------------------------------CTX e 2D------------------------------------------------*/

//Seção dedicada em definir posicionamento e tamanho dos elementos
let gorillaX = 600;
let gorillaY = 500;
let gorillaWidth = 80;
let gorillaHeight = 80;

