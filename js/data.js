const levels = {
	"1":{
		name:"level1",
		layout:`P,-,s.2.1.1,S.2.1.1`,
		exit:{x:3, y:1, dir:0},
	},
	"2":{
		name:"level2",
		layout:
`P,-,-,S.2.1.1
s.1.1.1,-,-,-`,
		exit:{x:4, y:1, dir:1},
	},
	"3":{
		name:"level2",
		layout:
`P,s.2.0,-,S.2.1.1
-,-,s.2.1.1,-`,
		exit:{x:4, y:1, dir:1},
	},
}

const blockData = {
	"s": (x, y, p, d, c) => new Square(x, y, p, 1, d, c),
	"S": (x, y, p, d, c) => new Square(x, y, p, 0, d, c),
	"h": (x, y, p, d, c) => new Hexagon(x, y, p, 1, d, c),
	"H": (x, y, p, d, c) => new Hexagon(x, y, p, 0, d, c),
	"t": (x, y, p, d, c) => new Triangle(x, y, p, 1, d, c),
	"T": (x, y, p, d, c) => new Triangle(x, y, p, 0, d, c),
}