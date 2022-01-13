const levels = {
	"1": [
		{
			name: "1",//learn movement and how to progress
			layout: `P,-,s.2.1.1,S.2.1.1`,
			exit: { x: 3, y: 1, dir: 0 },
		},
		{
			name: "2",//learn moving a bigger block first
			layout:
				`P,-,-,S.2.1.1
s.1.1.1,-,-,-`,
			exit: { x: 4, y: 1, dir: 1 },
		},
		{
			name: "3",//learn grey blocks do nothing
			layout:
				`P,s.2.0,-,S.2.1.1
-,-,s.2.1.1,-`,
			exit: { x: 4, y: 1, dir: 1 },
		},
		{
			name: "4",//learn using a grey block to move the needed block into the right position
			layout:
				`S.3.0,-,P,-
-,-,s.1.1.1,S.1.1.1`,
			exit: { x: 3, y: 2, dir: 0 },
		},
		{
			name: "5",//you can win by moving the player out, regardless of blocks
			layout:
`P,-,S.0.1.1
-,s.2.1.1,s.2.0
-,-,S.2.0`,
			exit: { x: 2, y: 3, dir: 0 },
		},
		{
			name: "6",//you can go straight between boxes
			layout:
`-,S.0.0,s.3.1.1,P
S.1.1.1,-,S.1.0,-`,
			exit: { x: 3, y: 2, dir: 0 },
		},
		{
			name: "7",//fun level
			layout:
`P,S.3.0,-,-
s.1.0,s.0.1.1,-,-
S.1.0,-,-,S.2.1.1`,
			exit: { x: 3, y: 3, dir: 0 },
		},
		{
			name: "8",//fun level
			layout:
				`P,-,s.2.1.1,S.2.1.1`,
			exit: { x: 3, y: 1, dir: 0 },
		},
		{
			name: "9",//fun level
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