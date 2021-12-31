const levels = {
	"1":{
		name:"level1",
		layout:`H,s,S,T
h,P,-,t`,
	},
	"2":{

	},
}

const blockData = {
	"s": (x, y, p) => new Square(x, y, p, 1, 0, 0),
	"S": (x, y, p) => new Square(x, y, p, 0, 2, 0),
	"h": (x, y, p) => new Hexagon(x, y, p, 1, 0, 0),
	"H": (x, y, p) => new Hexagon(x, y, p, 0, 0, 0),
	"t": (x, y, p) => new Triangle(x, y, p, 1, 0, 0),
	"T": (x, y, p) => new Triangle(x, y, p, 0, 0, 0),
	"P": (x, y, p) => new Player(x, y, p, 1, 1, 1),
}