const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const frames = 60;
const currentLevel = new Level(1);


function main(){
	
	requestAnimationFrame(main);
}

function setup(){
	resize();
}

function resize(){
	let canvasSize = Math.min(window.innerWidth, window.innerHeight);
	canvas.height = canvas.width = canvasSize;
}

window.addEventListener('resize', resize);
window.addEventListener('load', setup);