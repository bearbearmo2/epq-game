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
		this.height = layout.length;
		this.width = layout[0].length;
		this.level = this.parse();
		console.log(this.level);
	}

	parse(){
		let out = {};
		let layout = this.layout.split("\n");
		for(let y = 0; y < layout.length; y++){
			for(let x = 0; x < layout[y].length; x++){
				if(layout[y][x] === "-") continue;
				out[[x, y]] = blockData[layout[y][x]](x, y);
			}
		}
		return out;
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
	constructor(x, y, size, direction, colour){
		this.size = size;
		this.dir = direction;
		this.col = colour;
	}

	update(){
		this.render();
	}

	render(){

	}
}                                        

class Triangle extends Object{
	constructor(x, y, size, direction, colour){
		super(x, y, size, direction, colour);
	}
}

class Square extends Object{
	constructor(x, y, size, direction, colour){
		super(x, y, size, direction, colour);
	}
}

class Hexagon extends Object{
	constructor(){
		super();
	}
}

class Player extends Object{
	constructor(){
		super();
	}
}