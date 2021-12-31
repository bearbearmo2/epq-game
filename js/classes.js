class UI{
	constructor(){
		this.gamePlay = true;
		this.menu = false;
		this.touchInterface = {startPos:null, endPos:null, dir:null, dist:null}
	}

	input(event, type, special = null){
		event.preventDefault();
		if(type === "key"){
			if(this.gamePlay){
				switch(event.key){
					case "ArrowLeft":
					case "a":
						currentLevel.player.collide(3);
						break;
					case "ArrowRight":
					case "d":
						currentLevel.player.collide(2);
						break;
					case "ArrowUp":
					case "w":
						currentLevel.player.collide(0);
						break;
					case "ArrowDown":
					case "s":
						currentLevel.player.collide(1);
						break;
					default:
				}
			}
		} else if(type === "touch"){
			if(special === "start") this.touchInterface.startPos = {x:event.touches[0].clientX, y:event.touches[0].clientY};
			else if(special === "move") this.touchInterface.endPos = {x:event.touches[0].clientX, y:event.touches[0].clientY};
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
				if(this.gamePlay){
					if(this.touchInterface.dist > currentLevel.size) currentLevel.player.collide(this.touchInterface.dir);
				}
			}
		}	else if(type === "mouse"){
			if(special === "start") this.touchInterface.startPos = {x:event.x, y:event.y};
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
				if(this.gamePlay){
					if(this.touchInterface.dist > currentLevel.size) currentLevel.player.collide(this.touchInterface.dir);
				}
			}
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
		this.solved = true;
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
			}
		}
		return out;
	}

	resize(){
		this.border = canvas.width/50;
		this.size = Math.floor((canvas.width - this.border*2)/Math.max(this.height, this.width));
		this.offsetTop = Math.floor((canvas.height - this.height * this.size)/2);
		this.offsetLeft = Math.floor((canvas.width - this.width * this.size)/2);
	}

	update(){
		for(let tile in this.level){
			this.level[tile].update();
		}
		this.render();
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
			ctx.fillRect(this.offsetLeft + this.exit.x * this.size, this.offsetTop + this.exit.y * this.size, this.size, this.border);
		}
		if(this.solved){
			if(this.exit.dir){
				ctx.clearRect(this.offsetLeft + this.exit.x * this.size, this.offsetTop + this.exit.y * this.size + this.border, this.border + 1, this.size - this.border*2);
			} else {
				ctx.clearRect(this.offsetLeft + this.exit.x * this.size + this.border, this.offsetTop + this.exit.y * this.size, this.size - this.border*2, this.border + 1);
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
		this.image = new Image()
		this.image.src = "images/triangle.png"
	}
}

class Square extends Object{
	constructor(x, y, parent, size, direction, colour){
		super(x, y, parent, size, direction, colour);
		this.image = new Image()
		this.image.src = "images/square.png"
	}
}

class Hexagon extends Object{
	constructor(x, y, parent, size, direction, colour){
		super(x, y, parent, size, direction, colour);
		this.image = new Image()
		this.image.src = "images/hexagon.png"
	}
}

class Player extends Object{
	constructor(x, y, parent){
		super(x, y, parent);
		this.image = new Image()
		this.image.src = "images/player.png"
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
				}
			}
		} else {
			if(newPosition[0] >= 0 && newPosition[1] >= 0 && newPosition[0] < this.parent.width && newPosition[1] < this.parent.height) this.move(newPosition, dir);
		}
	}

	render(){
		ctx.drawImage(this.image, this.x * this.parent.size + this.parent.offsetLeft, this.y * this.parent.size + this.parent.offsetTop, this.parent.size, this.parent.size);
	}
}