const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const frames = 60;
const currentLevel = new Level(1);

const userInterface = new UI();


function main(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	currentLevel.update();
	requestAnimationFrame(main);
}

function setup(){
	resize();
	main();
}

function resize(){
	let canvasSize = Math.min(window.innerWidth, window.innerHeight);
	canvas.height = canvas.width = canvasSize;
	ctx.imageSmoothingEnabled = false;
	currentLevel.resize();
}

window.addEventListener('resize', resize);
window.addEventListener('load', setup);
window.addEventListener("keydown", e => userInterface.input(e, "key"));
window.addEventListener("touchstart", e => userInterface.input(e, "touch", "start"), false);
window.addEventListener("touchend", e => userInterface.input(e, "touch", "end"), false);
window.addEventListener("touchmove", e => userInterface.input(e, "touch", "move"), false);
window.addEventListener("mousedown", e => userInterface.input(e, "mouse", "start"), false);
window.addEventListener("mouseup", e => userInterface.input(e, "mouse", "end"), false);

canvas.addEventListener("contextmenu", e => e.preventDefault());