class UI{
	constructor(){
		this.gamePlay = true;
		this.menu = false;
		this.transition = false;
		this.loadedLevels = {};
		this.display = [];
		this.touchInterface = {startPos:null, endPos:null, dir:null, dist:null}
		this.start = null;
		this.tick = 0;
		this.opacity = 1;
		this.buttons = {};
		this.activeButtons = {};
		this.buttons.leftButton = new Button("images/leftButton.png", () => {userInterface.previousLevel()}, (button) => {
			button.width = screen.width/10;
			button.height = screen.width/10;
			button.x = screen.offsetLeft + screen.width/50;
			button.y = screen.height + screen.offsetTop - (screen.width/20)*3;
		});
		this.buttons.rightButton = new Button("images/rightButton.png", () => {userInterface.nextLevel()}, (button) => {
			button.width = screen.width/10;
			button.height = screen.width/10;
			button.x = screen.offsetLeft + screen.width - screen.width/10 - screen.width/50;
			button.y = screen.height + screen.offsetTop - (screen.width/20)*3;
		});
		this.buttons.resetButton = new Button("images/resetButton.png", () => {userInterface.currentLevel.reset()}, (button) => {
			button.width = screen.width/10;
			button.height = screen.width/10;
			button.x = screen.offsetLeft + screen.width/2 - screen.width/50;
			button.y = screen.height + screen.offsetTop - (screen.width/20)*3;
		});
		this.buttons.menuButton = new Button("images/menuButton.png", () => {}, (button) => {
			button.width = screen.width/10;
			button.height = screen.width/10;
			button.x = screen.offsetLeft + screen.width/50;
			button.y = screen.offsetTop + screen.width/20;
		});
	}

	update(){
		this.currentLevel.update();
		if(this.gamePlay) this.gamePlayUI();
		else if(this.menu) this.menuUI();
		else if(this.transition) this.clearUI();
		this.render();
		if(this.display.length) this[this.display[0]]();
		this.tick++;
	}

	gamePlayUI(){
		if(this.level - 1 in this.loadedLevels) {
			if(!("leftButton" in this.activeButtons)){
				this.activeButtons.leftButton = this.buttons.leftButton;
				this.activeButtons.leftButton.resize(this.activeButtons.leftButton);
			}
		} else{
			if("leftButton" in this.activeButtons){
				delete this.activeButtons.leftButton;
			}
		}
		if(this.level + 1 in this.loadedLevels) {
			if(!("rightButton" in this.activeButtons)){
				this.activeButtons.rightButton = this.buttons.rightButton;
				this.activeButtons.rightButton.resize(this.activeButtons.rightButton);
			}
		} else{
			if("rightButton" in this.activeButtons){
				delete this.activeButtons.rightButton;
			}
		}
		if(!("resetButton" in this.activeButtons)){
			this.activeButtons.resetButton = this.buttons.resetButton;
			this.activeButtons.resetButton.resize(this.activeButtons.resetButton);
		}
		if(!("menuButton" in this.activeButtons)){
			this.activeButtons.menuButton = this.buttons.menuButton;
			this.activeButtons.menuButton.resize(this.activeButtons.menuButton);
		}
	}

	clearUI(){
		this.activeButtons = {};
	}

	checkHover(button, position){
		return position.x > button.x && position.x < button.x + button.width && position.y > button.y && position.y < button.y + button.height;
	}

	resize(){
		for(let button in this.activeButtons){
			this.activeButtons[button].resize(this.activeButtons[button]);
		}

		this.currentLevel.resize();
	}

	nextLevel(){
		this.display = ["stopGamePlay", "startTransition", "fadeout", "increaseLevel", "loadLevel", "blackout", "fadein", "stopTransition", "startGamePlay"];
	}

	previousLevel(){
		this.display = ["stopGamePlay", "startTransition", "fadeout", "decreaseLevel", "loadLevel", "blackout", "fadein", "stopTransition", "startGamePlay"];
	}

	increaseLevel(){
		this.level++;
		this.blackout();
		this.endDisplay();
	}

	decreaseLevel(){
		this.level--;
		this.blackout();
		this.endDisplay();
	}

	fadeout(){
		if(!this.start) {
			this.start = this.tick;
			this.opacity = 0;
		}
		this.opacity += 0.0055;
		ctx.fillStyle = "#000";
		ctx.globalAlpha = this.opacity;
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.globalAlpha = 1;
		if(this.tick - this.start >= 180){
			this.start = null;
			this.endDisplay();
			this.opacity = 1;
		}
	}

	fadein(){
		if(!this.start) {
			this.start = this.tick;
			this.opacity = 1;
		}
		this.opacity -= 0.0055;
		ctx.fillStyle = "#000";
		ctx.globalAlpha = this.opacity;
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.globalAlpha = 1;
		if(this.tick - this.start >= 180){
			this.start = null;
			this.endDisplay();
			this.opacity = 1;
		}
	}

	startGamePlay(){
		this.gamePlay = true;
		this.endDisplay();
	}

	stopGamePlay(){
		this.gamePlay = false;
		this.endDisplay();
	}

	startTransition(){
		this.transition = true;
		this.endDisplay();
	}

	stopTransition(){
		this.transition = false;
		this.endDisplay();
	}

	blackout(){
		if(!this.start) {
			this.start = this.tick;
		}
		ctx.fillStyle = "#000";
		ctx.globalAlpha = this.opacity;
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.globalAlpha = 1;
		if(this.tick - this.start >= 60){
			this.start = null;
			this.endDisplay();
		}
	}

	loadLevel(){
		if(this.level in this.loadedLevels){
			this.currentLevel = this.loadedLevels[this.level];
			this.currentLevel.reset();
		} else{
			this.currentLevel = new Level(this.level);
			this.loadedLevels[this.level] = this.currentLevel;
		}
		this.blackout();
		this.endDisplay();
	}

	endDisplay(){
		this.display.shift();
	}

	input(event, type, special = null){
		event.preventDefault();
		if(type === "key"){
			if(this.gamePlay){
				switch(event.key){
					case "ArrowLeft":
					case "a":
						this.currentLevel.player.collide(3);
						break;
					case "ArrowRight":
					case "d":
						this.currentLevel.player.collide(2);
						break;
					case "ArrowUp":
					case "w":
						this.currentLevel.player.collide(0);
						break;
					case "ArrowDown":
					case "s":
						this.currentLevel.player.collide(1);
						break;
					case "Escape":
						this.display = ["stopGamePlay", "OpenMenu", "displayMenu"];
						break;
					case " ":
						this.currentLevel.reset();
						break;
					default:
				}
			} else if(this.menu){
				switch(event.key){
					case "Escape":
						this.display = ["closeMenu", "startGamePlay"];
						break;
					default:
				}
			}
		} else if(type === "touch"){
			if(special === "start") {
				this.touchInterface.startPos = {x:event.touches[0].clientX, y:event.touches[0].clientY};
				this.touchInterface.endPos = {x:event.touches[0].clientX, y:event.touches[0].clientY};
				for(let button in this.activeButtons){
					let over = this.checkHover(this.activeButtons[button], this.touchInterface.endPos);
					if(over){
						this.activeButtons[button].hover();
					} else if(this.activeButtons[button].hovered){
						this.activeButtons[button].unhover();
					}
				}
			} else if(special === "move") {
				this.touchInterface.endPos = {x:event.touches[0].clientX, y:event.touches[0].clientY};
				for(let button in this.activeButtons){
					let over = this.checkHover(this.activeButtons[button], this.touchInterface.endPos);
					if(over){
						this.activeButtons[button].hover;
					} else if(this.activeButtons[button].hovered){
						this.activeButtons[button].unhover();
					}
				}
			}
			else if (special === "end"){
				let xdis = this.touchInterface.endPos.x - this.touchInterface.startPos.x;
				let ydis = this.touchInterface.endPos.y - this.touchInterface.startPos.y;
				this.touchInterface.dist = Math.sqrt(xdis**2 + ydis ** 2);
				if(Math.abs(xdis) < Math.abs(ydis)){
					if(ydis < 0) this.touchInterface.dir = 0;
					else this.touchInterface.dir = 1;
				} else{
					if(xdis < 0) this.touchInterface.dir = 3;
					else this.touchInterface.dir = 2;
				}
				for(let button in this.activeButtons){
					let over = this.checkHover(this.activeButtons[button], this.touchInterface.endPos);
					if(over){
						this.activeButtons[button].unhover();
						this.activeButtons[button].function();
						return;
					} 
				}
				if(this.gamePlay){
					if(this.touchInterface.dist > this.currentLevel.size) this.currentLevel.player.collide(this.touchInterface.dir);
				}
			}
		}	else if(type === "mouse"){
			if(special === "start") {
				this.touchInterface.startPos = {x:event.x, y:event.y};
				this.touchInterface.endPos = {x:event.x, y:event.y};
				for(let button in this.activeButtons){
					let over = this.checkHover(this.activeButtons[button], this.touchInterface.endPos);
					if(over){
						this.activeButtons[button].hover;
					} else if(this.activeButtons[button].hovered){
						this.activeButtons[button].unhover;
					}
				}
			} else if (special === "move") {
				this.touchInterface.endPos = {x:event.x, y:event.y};
				for(let button in this.activeButtons){
					let over = this.checkHover(this.activeButtons[button], this.touchInterface.endPos);
					if(over){
						this.activeButtons[button].hover();
					} else if(this.activeButtons[button].hovered){
						this.activeButtons[button].unhover();
					}
				}
			}
			else if (special === "end"){
				this.touchInterface.endPos = {x:event.x, y:event.y};
				let xdis = this.touchInterface.endPos.x - this.touchInterface.startPos.x;
				let ydis = this.touchInterface.endPos.y - this.touchInterface.startPos.y;
				this.touchInterface.dist = Math.sqrt(xdis**2 + ydis ** 2);
				if(Math.abs(xdis) < Math.abs(ydis)){
					if(ydis < 0) this.touchInterface.dir = 0;
					else this.touchInterface.dir = 1;
				} else{
					if(xdis < 0) this.touchInterface.dir = 3;
					else this.touchInterface.dir = 2;
				}
				for(let button in this.activeButtons){
					let over = this.checkHover(this.activeButtons[button], this.touchInterface.endPos);
					if(over){
						this.activeButtons[button].unhover();
						this.activeButtons[button].function();
						return;
					} 
				}
				if(this.gamePlay){
					if(this.touchInterface.dist > this.currentLevel.size) this.currentLevel.player.collide(this.touchInterface.dir);
				}
			}
		}
	}

	render(){
		for(let button in this.activeButtons){
			let image = this.activeButtons[button];
			ctx.drawImage(image.image, image.x, image.y, image.width, image.height);
		}
	}
}

class Button{
	constructor(src, proceedure, resize){
		this.x = 1;
		this.y = 1;
		this.width = 1;
		this.height = 1;
		this.image = new Image();
		this.image.src = src;
		this.function = proceedure;
		this.resize = resize;
		this.resize(this);
		this.hovered = false;
	}

	hover(){
		if(!this.hovered){
			this.x -= this.width * 0.1;
			this.y -= this.height * 0.1;
			this.width *= 1.2;
			this.height *= 1.2;
			this.hovered = true;
		}
	}

	unhover(){
		if(this.hovered){
			this.width /= 1.2;
			this.height /= 1.2;
			this.x += this.width * 0.1;
			this.y += this.height * 0.1;
			this.hovered = false;
		}
	}
}

class Level{
	constructor(id){
		this.id = id;
		this.data = levels[id];
		this.name = this.data.name;
		this.layout = this.data.layout;
		this.exit = this.data.exit;
		this.level = this.parse();
		this.solved = false;
		this.resize();
	}

	parse(){
		let out = {};
		let layout = this.layout.split("\n").map(x => x.split(","));
		this.height = layout.length;
		this.width = layout[0].length;
		for(let y = 0; y < layout.length; y++){
			for(let x = 0; x < layout[y].length; x++){
				if(layout[y][x] === "-") continue;
				if(layout[y][x] === "P"){
					this.player = new Player(x, y, this);
					out[[x, y]] = this.player;
					continue;
				}
				let data = layout[y][x].split(".");
				out[[x, y]] = blockData[data[0]](x, y, this, parseInt(data[1]), parseInt(data[2]));
				if(data[3]) out[[x, y]].required = true;
			}
		}
		return out;
	}

	resize(){
		this.border = screen.width/50;
		this.size = Math.floor((screen.width - this.border*2)/Math.max(this.height, this.width));
		this.offsetTop = Math.floor((screen.height - this.height * this.size)/2) + screen.offsetTop;
		this.offsetLeft = Math.floor((screen.width - this.width * this.size)/2) + screen.offsetLeft;
	}

	update(){
		for(let tile in this.level){
			this.level[tile].update();
		}
		this.render();
	}

	finish(){
		userInterface.nextLevel();
	}

	reset(){
		this.level = this.parse();
		this.solved = false;
	}

	render(){
		ctx.fillStyle = "#8b9bb4";
		ctx.fillRect(this.offsetLeft - this.border, this.offsetTop, this.border, this.height * this.size);
		ctx.fillRect(this.offsetLeft + this.width * this.size, this.offsetTop, this.border, this.height * this.size);
		ctx.fillRect(this.offsetLeft - this.border, this.offsetTop - this.border, this.width * this.size + this.border*2, this.border);
		ctx.fillRect(this.offsetLeft - this.border, this.offsetTop + this.height * this.size, this.width * this.size + this.border*2, this.border);
		ctx.fillStyle = "#e43b44";
		if(this.exit.dir){
			ctx.fillRect(this.offsetLeft + this.exit.x * this.size, this.offsetTop + this.exit.y * this.size, this.border, this.size);
		} else {
			ctx.fillRect(this.offsetLeft + this.exit.x * this.size + this.border, this.offsetTop + this.exit.y * this.size, this.size - this.border, this.border);
		}
		if(this.solved){
			if(this.exit.dir){
			ctx.clearRect(this.offsetLeft + this.exit.x * this.size, this.offsetTop + this.exit.y * this.size, this.border+1, this.size);
		} else {
			ctx.clearRect(this.offsetLeft + this.exit.x * this.size + this.border, this.offsetTop + this.exit.y * this.size, this.size - this.border, this.border+1);
		}
		}
	}
}

class Object{
	constructor(x, y, parent, size, direction, colour){
		this.x = x;
		this.y = y;
		this.parent = parent;
		this.size = size;
		this.dir = direction;
		this.col = colour;
		this.image = new Image()
		this.required = false;
		this.container = null;
		this.contains = null;
	}

	update(){
		this.render();
		if(this.contains) {
			this.contains.update();
		}
	}

	checkOpening(dir){
		return (dir !== this.dir) && ((dir < 2 && this.dir < 2) || (dir > 1 && this.dir > 1));
	}

	move(pos, dir){
		if(this.container){
			let opening = this.container.checkOpening(dir);
			if(opening){
				let largeOpening = false;
				if(this.container.container){
					largeOpening = this.container.container.checkOpening(dir);
				}
				if(this.container.container && !largeOpening) {
					this.container.move(pos, dir);
					this.x = this.container.x;
					this.y = this.container.y;
					return;
				}
				this.container.contains = null;
				this.container = null;
				this.parent.level[pos] = this;
		 		this.x = pos[0];
		 		this.y = pos[1];
			} else {
				this.container.move(pos, dir);
				this.x = this.container.x;
				this.y = this.container.y;
			}
		} else {
			delete this.parent.level[[this.x, this.y]];
		 	this.parent.level[pos] = this;
		 	this.x = pos[0];
		 	this.y = pos[1];
		}
	}

	render(){
		ctx.drawImage(this.image, (this.size * 4 + this.dir)*16, this.col*16, 16, 16, this.x * this.parent.size + this.parent.offsetLeft, this.y * this.parent.size + this.parent.offsetTop, this.parent.size, this.parent.size);
	}
}                                        

class Triangle extends Object{
	constructor(x, y, parent, size, direction, colour){
		super(x, y, parent, size, direction, colour);
		this.image.src = "images/triangle.png"
	}
}

class Square extends Object{
	constructor(x, y, parent, size, direction, colour){
		super(x, y, parent, size, direction, colour);
		this.image.src = "images/square.png"
	}
}

class Hexagon extends Object{
	constructor(x, y, parent, size, direction, colour){
		super(x, y, parent, size, direction, colour);
		this.image.src = "images/hexagon.png"
	}
}

class Player extends Object{
	constructor(x, y, parent){
		super(x, y, parent);
		this.image.src = "images/player.png"
		this.required = true;
	}

	collide(dir){
		switch(dir){
			case 0:
				var newPosition = [this.x, this.y - 1];
				break;
			case 1:
				var newPosition = [this.x, this.y + 1];
				break;
			case 2:
				var newPosition = [this.x + 1, this.y];
				break;
			case 3:
				var newPosition = [this.x - 1, this.y];
				break;
			default:
		}

		if(newPosition in this.parent.level){
			let newContainer = this.parent.level[newPosition];
			if(dir === newContainer.dir){
				if(!this.container){
					if(newContainer.contains){
						this.move(newPosition, dir);
						this.container = newContainer.contains;
						this.container.contains = this;
						this.move(newPosition, dir);
					} else {
						this.move(newPosition, dir);
						this.container = newContainer;
						this.container.contains = this;
						this.move(newPosition, dir);
					}
				} else if(this.container.container || newContainer.contains){
					return;
				}
				else if(newContainer.size < this.container.size){
					if(this.container instanceof Hexagon){
						if(!(newContainer instanceof Hexagon)) return;
					} else if(this.container instanceof Square){
						if(newContainer instanceof Triangle) return;
					}
					this.move(newPosition, dir);
					newContainer.contains = this.container;
					this.container.container = newContainer;
					this.move(newPosition, dir);
					if(this.container.container.required && this.container.required) this.parent.solved = true;
				}
			}
		} else {
			if(newPosition[0] >= 0 && newPosition[1] >= 0 && newPosition[0] < this.parent.width && newPosition[1] < this.parent.height) this.move(newPosition, dir);
			if(this.parent.solved && newPosition[0] === this.parent.exit.x && newPosition[1] === this.parent.exit.y) {
				this.move(newPosition, dir);
				this.parent.finish();
			}
		}
	}

	render(){
		ctx.drawImage(this.image, this.x * this.parent.size + this.parent.offsetLeft, this.y * this.parent.size + this.parent.offsetTop, this.parent.size, this.parent.size);
	}
}