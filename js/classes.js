class UI{
	constructor(){
	}
}

class Level{
	constructor(id){
		this.id = id;
		this.data = levels[id];
		this.name = this.data.name;
		this.layout = this.data.layout;
		this.level = this.parse();
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
				let data = layout[y][x].split(".");
				out[[x, y]] = blockData[data[0]](x, y, this, parseInt(data[1]), parseInt(data[2]));
			}
		}
		return out;
	}

	resize(){
		this.size = Math.floor(canvas.width/Math.max(this.height, this.width));
	}

	update(){
		for(let tile in this.level){
			this.level[tile].update();
		}
		this.render();
	}

	render(){

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
	}

	update(){
		this.render();
	}

	render(){
		ctx.drawImage(this.image, (this.size * 4 + this.dir)*16, this.col*16, 16, 16, this.x * this.parent.size, this.y * this.parent.size, this.parent.size, this.parent.size);
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

	update(){
		this.render();
	}

	render(){
		ctx.drawImage(this.image, this.x * this.parent.size, this.y * this.parent.size, this.parent.size, this.parent.size);
	}
}