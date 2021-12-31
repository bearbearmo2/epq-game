const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const frames = 60;
const currentLevel = new Level(1);


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