const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const screen = {offsetLeft:0, offsetTop:0, width:0, height:0, display:{offsetLeft:0, offsetTop:0, width:0, height:0}};

const frames = 60;

const userInterface = new UI();
userInterface.level = 0;
userInterface.world = 1;
userInterface.currentLevel = new Level(userInterface.world, userInterface.level);
userInterface.loadedLevels[[userInterface.world, userInterface.level]] = userInterface.currentLevel;
userInterface.resize();

function main(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	userInterface.update();
	requestAnimationFrame(main);
}

function setup(){
	resize();
	main();
}

function resize(){
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	let screenSize = Math.min(window.innerWidth, window.innerHeight);
	screen.height = screen.width = screenSize;
	screen.offsetLeft = Math.floor((canvas.width - screen.width)/2);
	screen.offsetTop = Math.floor((canvas.height - screen.height)/2);
	screen.display.offsetTop = Math.floor(screen.height/5) + screen.offsetTop;
	screen.display.offsetLeft = screen.offsetLeft;
	screen.display.width = screen.width;
	screen.display.height = screen.height - (screen.display.offsetTop - screen.offsetTop)*2;
	ctx.imageSmoothingEnabled = false;
	userInterface.resize();
}

window.addEventListener('resize', resize);
window.addEventListener('load', setup);
window.addEventListener("keydown", e => userInterface.input(e, "key"), false);
window.addEventListener("touchstart", e => userInterface.input(e, "touch", "start"), false);
window.addEventListener("touchend", e => userInterface.input(e, "touch", "end"), false);
window.addEventListener("touchmove", e => userInterface.input(e, "touch", "move"), false);
window.addEventListener("mousedown", e => userInterface.input(e, "mouse", "start"), false);
window.addEventListener("mouseup", e => userInterface.input(e, "mouse", "end"), false);
window.addEventListener("mousemove", e => userInterface.input(e, "mouse", "move"), false);

//canvas.addEventListener("contextmenu", e => e.preventDefault());

window.addEventListener("gamepadconnected", e => userInterface.connectController(e));
window.addEventListener("gamepaddisconnected", e => userInterface.disconnectController(e));