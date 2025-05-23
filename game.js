const canvas = document.querySelector('#game-canvas');
const startBtn = document.querySelector('#start-button');
const ctx = canvas.getContext('2d');

//Função responsável por adaptar o canvas do JS dentro do espaço da tela, de maneira responsiva.
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();