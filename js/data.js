const levels = {
	"1": [
		{
			name: "1",
			layout: `P,-,s.2.1.1,S.2.1.1`,
			exit: { x: 3, y: 1, dir: 0 },
		},
		{
			name: "2",
			layout:
				`P,-,-,S.2.1.1
s.1.1.1,-,-,-`,
			exit: { x: 4, y: 1, dir: 1 },
		},
		{
			name: "3",
			layout:
				`P,s.2.0,-,S.2.1.1
-,-,s.2.1.1,-`,
			exit: { x: 4, y: 1, dir: 1 },
		},
		{
			name: "4",
			layout:
				`S.3.0,-,P,-
-,-,s.1.1.1,S.1.1.1`,
			exit: { x: 3, y: 2, dir: 0 },
		},
		{
			name: "5",
			layout:
`P,-,S.0.1.1
-,s.2.1.1,s.2.0
-,-,S.2.0`,
			exit: { x: 2, y: 3, dir: 0 },
		},
		{
			name: "6",
			layout:
				`P,-,s.2.1.1,S.2.1.1`,
			exit: { x: 3, y: 1, dir: 0 },
		},
		{
			name: "7",
			layout:
				`P,-,s.2.1.1,S.2.1.1`,
			exit: { x: 3, y: 1, dir: 0 },
		},
		{
			name: "8",
			layout:
				`P,-,s.2.1.1,S.2.1.1`,
			exit: { x: 3, y: 1, dir: 0 },
		},
		{
			name: "9",
			layout:
				`P,-,s.2.1.1,S.2.1.1`,
			exit: { x: 3, y: 1, dir: 0 },
		}
	],
	"2": [
		{
			name: "",
			layout:
				`-,-,-,-
-,-,-,-`,
			exit: { x: 3, y: 2, dir: 0 },
		}
	],
}

const blockData = {
	"s": (x, y, p, d, c) => new Square(x, y, p, 1, d, c),
	"S": (x, y, p, d, c) => new Square(x, y, p, 0, d, c),
	"h": (x, y, p, d, c) => new Hexagon(x, y, p, 1, d, c),
	"H": (x, y, p, d, c) => new Hexagon(x, y, p, 0, d, c),
	"t": (x, y, p, d, c) => new Triangle(x, y, p, 1, d, c),
	"T": (x, y, p, d, c) => new Triangle(x, y, p, 0, d, c),
}