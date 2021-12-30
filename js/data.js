const levels = {
	"1":{
		name:"level1",
		layout:`-s--
-PS-`,
	},
	"2":{

	},
}

const blockData = {
	"s": (x, y) => new Square(),
	"S": (x, y) => new Square(),
	"P": (x, y) => new Player(),
}