const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.style.background = "#ff8";

//Função responsável por adaptar o canvas do JS dentro do espaço da tela, de maneira responsiva.
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();