const levels = {
	"1": [
		{
			name: "1",//learn movement and how to progress
			layout: `P,-,s.2.1,S.2.1`,
			exit: { x: 3, y: 1, dir: 0 },
		},
		{
			name: "2",//learn moving a bigger block first
			layout:
				`P,-,-,S.2.1
s.1.1,-,-,-`,
			exit: { x: 4, y: 1, dir: 1 },
		},
		{
			name: "3",//learn grey blocks do nothing
			layout:
				`P,s.2.0,-,S.2.1
-,-,s.2.1,-`,
			exit: { x: 4, y: 1, dir: 1 },
		},
		{
			name: "4",//learn using a grey block to move the needed block into the right position
			layout:
				`S.3.0,-,P,-
-,-,s.1.1,S.1.1`,
			exit: { x: 3, y: 2, dir: 0 },
		},
		{
			name: "5",//you can win by moving the player out, regardless of blocks
			layout:
`P,-,S.0.1
-,s.2.1,s.2.0
-,-,S.2.0`,
			exit: { x: 2, y: 3, dir: 0 },
		},
		{
			name: "6",//you can go straight between boxes
			layout:
`P,S.0.0,-,s.3.1,-
S.1.1,-,-,S.2.0,-`,
			exit: { x: 4, y: 2, dir: 0 },
		},
		{
			name: "7",//fun level
			layout:
`P,S.3.0,-,-
s.1.0,s.0.1,-,-
S.1.0,-,-,S.2.1`,
			exit: { x: 3, y: 3, dir: 0 },
		},
		{
			name: "8",//fun level
			layout:
`-,-,-,-
S.3.0,s.0.1,S.1.0,s.2.0.0
S.3.1,-,P,-`,
			exit: { x: 4, y: 1, dir: 1 },
		},
		{
			name: "9",//fun level
			layout:
`-,-,-,S.0.0,-
-,S.1.1,S.2.0,P,s.1.1`,
			exit: { x: 4, y: 2, dir: 0 },
		}
	],
	"2": [
		{
			name: "1",
			layout:
				`P,-,-,H.0.1
-,h.2.1,-,-`,
			exit: { x: 3, y: 2, dir: 0 },
		},
		{
			name: "2",
			layout:
				`-,h.0.0,S.2.1,-
s.1.1,-,-,P`,
			exit: { x: 3, y: 2, dir: 0 },
		},
		{
			name: "3",
			layout:
				`-,h.0.0,-,-,S.2.1
s.1.1,P,T.2.0,-,-`,
			exit: { x: 4, y: 2, dir: 0 },
		},
		{
			name: "4",
			layout:
				`P,T.2.1,-
s.3.1,-,S.1.1
-,-,-`,
			exit: { x: 3, y: 2, dir: 1 },
		},
		{
			name: "5",
			layout:
`-,S.0.1,-
P,s.2.1,T.1.0`,
			exit: { x: 3, y: 1, dir: 1 },
		},
		{
			name: "6",
			layout:
`P,-,H.0.0
s.1.1,T.1.0,-
-,S.2.1,T.2.0`,
			exit: { x: 3, y: 2, dir: 1},
		},
	],
	"3": [
		{
			name: "1",
			layout:
				`P,-,-,H.0.2
-,h.2.2,-,-`,
			exit: { x: 3, y: 2, dir: 0 },
		},
		{
			name: "2",
			layout:
`H.0.2,-,P,-,S.0.1
-,s.3.2,-,t.2.1,-`,
			exit: { x: 4, y: 2, dir: 0 },
		},
		{
			name: "3",
			layout:
`P,-,-
S.3.1,s.1.2,S.1.2
-,-,-`,
			exit: { x: 3, y: 2, dir: 1 },
		},
		{
			name: "4",
			layout:
`s.0.1,-,S.3.2,-,-
P,h.1.2,-,-,H.2.1`,
			exit: { x: 4, y: 2, dir: 0 },
		},
		{
			name: "5",
			layout:
`t.3.3,P,-
S.3.3,-,s.1.1
S.0.2,-,T.2.1
-,-,-`,
			exit: { x: 2, y: 4, dir: 0 },
		},
		{
			name: "6",
			layout:
`P,H.2.3,-
s.1.3,t.3.1,-
T.3.3,-,S.2.1`,
			exit: { x: 0, y: 3, dir: 0 },
		},
	],
	"4": [
		{
			name: "1",
			layout:
				`P,-,s.2.3,S.0.5
-,s.2.2,-,-`,
			exit: { x: 3, y: 2, dir: 0 },
		},
		{
			name: "2",
			layout:
`S.0.4,-,-,s.0.2,H.2.0
P,H.3.6,-,-,-`,
			exit: { x: 4, y: 2, dir: 0 },
		},
		{
			name: "3",
			layout:
`P,-,-
-,-,-
-,-,-`,
			exit: { x: 3, y: 2, dir: 1 },
		},
		{
			name: "4",
			layout:
`s.0.1,-,S.3.2,-,-
P,h.1.2,-,-,H.2.1`,
			exit: { x: 4, y: 2, dir: 0 },
		},
		{
			name: "5",
			layout:
`t.3.3,P,-
S.3.3,-,s.1.1
S.0.2,-,T.2.1
-,-,-`,
			exit: { x: 2, y: 4, dir: 0 },
		},
		{
			name: "6",
			layout:
`P,H.2.3,-
s.1.3,t.3.1,-
T.3.3,-,S.2.1`,
			exit: { x: 0, y: 3, dir: 0 },
		},
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

const uiAnims = {
	"keyboard":{},
	"mouse": {
		"movement": (anim) => {
			anim.width = (screen.width - screen.width/10) / 10 * 3;
			anim.height =  (screen.width - screen.width/10) / 10;
			anim.x = screen.offsetLeft + screen.width / 20;
			anim.y = screen.offsetTop + screen.width / 20 + (screen.width - screen.width/10) / 10 * 3;
		},
		"drag": (anim) => {
			anim.width = (screen.width - screen.width/10) / 10 * 3;
			anim.height =  (screen.width - screen.width/10) / 10;
			anim.x = screen.offsetLeft + screen.width / 20;
			anim.y = screen.offsetTop + screen.width / 20 + (screen.width - screen.width/10) / 10 * 4;
		}
	},
	"gamepad": {
		"movement": (anim) => {
			anim.width = (screen.width - screen.width/10) / 10 * 3;
			anim.height =  (screen.width - screen.width/10) / 10;
			anim.x = screen.offsetLeft + screen.width / 20;
			anim.y = screen.offsetTop + screen.width / 20 + (screen.width - screen.width/10) / 10 * 2;
		},
		"cursor": (anim) => {
			anim.width = (screen.width - screen.width/10) / 10 * 4;
			anim.height =  (screen.width - screen.width/10) / 10 * 2;
			anim.x = screen.offsetLeft + screen.width / 20 * 6;
			anim.y = screen.offsetTop + screen.width / 20 + (screen.width - screen.width/10) / 10 * 8;
		}
	},
	"touch": {
		"movement": (anim) => {
			anim.width = (screen.width - screen.width/10);
			anim.height = anim.width/3;
			anim.x = screen.offsetLeft + screen.width / 20;
			anim.y = screen.offsetTop + screen.width / 20 + anim.height/2;
		},
		"drag": (anim) => {
			anim.width = (screen.width - screen.width/10);
			anim.height = anim.width/3;
			anim.x = screen.offsetLeft + screen.width / 20;
			anim.y = screen.offsetTop + screen.width / 20 + anim.height * 3/2;
		}
	},
	"settings": {
		"drag":	(anim) => {
			anim.height = screen.height/10 * 1.2;
			anim.width = anim.height * 3;
			anim.x = screen.offsetLeft + screen.width / 50;
			anim.y = screen.offsetTop + screen.height/5 + screen.height/10 - screen.height/50;
		},
	}
}