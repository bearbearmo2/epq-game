class UI {
	constructor() {
		this.menuWorld = false;
		this.fullscreen = false;
		this.state = "gamePlayUI";
		this.gamepadConnected = false;
		this.gamepads = {};
		this.loadedLevels = {};
		this.display = [];
		this.touchInterface = { startPos: null, endPos: null, dir: null, dist: null }
		this.gamepadInterface = { axes: {}, buttons: {} };
		this.cursor = new Cursor(screen.width / 2 + screen.offsetLeft, screen.width / 2 + screen.offsetLeft);
		this.device = "keyboard";
		this.start = null;
		this.tick = 0;
		this.opacity = 1;
		this.buttons = {};
		this.activeButtons = {};
		this.icons = {};
		this.activeIcons = {};

		this.buttons.leftButton = new Button("images/leftButton.png", () => { userInterface.previousLevel() }, (button) => {
			button.width = screen.width / 10;
			button.height = screen.width / 10;
			button.x = screen.offsetLeft + screen.width / 50;
			button.y = screen.height + screen.offsetTop - (screen.width / 20) * 3;
			button.hovered = false
		});
		this.buttons.rightButton = new Button("images/rightButton.png", () => { userInterface.nextLevel() }, (button) => {
			button.width = screen.width / 10;
			button.height = screen.width / 10;
			button.x = screen.offsetLeft + screen.width - screen.width / 10 - screen.width / 50;
			button.y = screen.height + screen.offsetTop - (screen.width / 20) * 3;
			button.hovered = false
		});
		this.buttons.resetButton = new Button("images/resetButton.png", () => { userInterface.currentLevel.reset() }, (button) => {
			button.width = screen.width / 10;
			button.height = screen.width / 10;
			button.x = screen.offsetLeft + screen.width / 2 - screen.width / 50;
			button.y = screen.height + screen.offsetTop - (screen.width / 20) * 3;
			button.hovered = false
		});
		this.buttons.menuButton = new Button("images/menuButton.png", () => {
			if (userInterface.state === "menuUI") userInterface.closeMenu();
			else userInterface.openMenu();
		}, (button) => {
			button.width = screen.width / 10;
			button.height = screen.width / 10;
			button.x = screen.offsetLeft + screen.width / 50;
			button.y = screen.offsetTop + screen.width / 20;
			button.hovered = false
		});
		this.buttons.fullScreenButton = new Button("images/fullScreenButton.png", (button) => {
			if (userInterface.fullscreen) {
				button.image.src = "images/fullScreenButton.png";
				userInterface.exitFullscreen();
			}
			else {
				button.image.src = "images/smallScreenButton.png";
				userInterface.enterFullscreen();
			}
		}, (button) => {
			button.width = screen.width / 10;
			button.height = screen.width / 10;
			button.x = screen.offsetLeft + screen.width - screen.width / 10 - screen.width / 50;
			button.y = screen.offsetTop + screen.width / 20;
			button.hovered = false
		});

		this.buttons.settingsButton = new Button("images/settingsButton.png", (button) => {
			if (userInterface.state === "settingsUI") {
				userInterface.closeSettings();
			}
			else {
				userInterface.openSettings();
			}
		}, (button) => {
			button.width = screen.width / 10;
			button.height = screen.width / 10;
			button.x = screen.offsetLeft + screen.width / 2 - screen.width / 20;
			button.y = screen.offsetTop + screen.width / 20;
			button.hovered = false
		});

		this.buttons.backButton = new Button("images/leftButton.png", (button) => {
			userInterface.menuWorld = false;
		}, (button) => {
			button.width = screen.width / 10;
			button.height = screen.width / 10;
			button.x = screen.offsetLeft + screen.width / 2 - screen.width / 20;
			button.y = screen.offsetTop + screen.width / 20;
			button.hovered = false
		});

		this.buttons.controlsButton = new Button("images/fullScreenButton.png", (button) => {
			this.openControls();
		}, (button) => {
			button.width = screen.width / 10;
			button.height = screen.width / 10;
			button.x = screen.offsetLeft + screen.width - button.width - screen.width / 50;
			button.y = screen.offsetTop + screen.width / 20;
			button.hovered = false
		});

		this.icons.controls = new Icon("images/keyboard.png", (icon) => {
			icon.width = screen.width - screen.width / 10;
			icon.height = screen.height - screen.width / 10;
			icon.x = screen.offsetLeft + screen.width / 20;
			icon.y = screen.offsetTop + screen.width / 20;
			icon.hovered = false
		});

		this.createWorldButtons();
	}

	createWorldButtons() {
		for (let i = 1; i < 10; i++) {
			let world = levels[i];
			if (world === undefined) continue;
			for (let j = 0; j < world.length; j++) {
				this.buttons[[i, j]] = new Button(`images/num${j}.png`, (button) => {
					this.world = i;
					this.level = j;
					this.display = ["stopMenu", "startTransition", "fadeout", "loadLevel", "blackout", "fadein", "stopTransition", "startGamePlay"];
				}, (button) => {
					button.width = screen.width / 7.5;
					button.height = screen.width / 7.5;
					button.x = screen.offsetLeft + (screen.width / 2 * (j % 3)) + screen.width / 50 * ((j % 3) ? ((j % 3) - 1 ? -1 : 0) : 1) - (button.width / 2) * (j % 3);
					button.y = screen.offsetTop + button.height * 2 * (Math.floor(j / 3) + 1);
					button.hovered = false
				});
			}
			this.buttons[i] = new Button(`images/num${i - 1}.png`, (button) => {
				this.menuWorld = i;
			}, (button) => {
				button.width = screen.width / 7.5;
				button.height = screen.width / 7.5;
				button.x = screen.offsetLeft + (screen.width / 2 * ((i - 1) % 3)) + screen.width / 50 * (((i - 1) % 3) ? (((i - 1) % 3) - 1 ? -1 : 0) : 1) - (button.width / 2) * ((i - 1) % 3);
				button.y = screen.offsetTop + button.height * 2 * (Math.floor((i - 1) / 3) + 1);
				button.hovered = false
			});
		}
	}

	update() {
		if (this.gamepadConnected) this.updateGamepad();

		this.currentLevel.update();

		if (this.state) {
			this[this.state]();
		}

		this.render();

		if (this.display.length) this[this.display[0]]();

		this.tick++;
	}

	gamePlayUI() {
		if ([this.world, this.level - 1] in this.loadedLevels || [this.world - 1, 9] in this.loadedLevels) {
			if (!("leftButton" in this.activeButtons)) {
				this.activeButtons.leftButton = this.buttons.leftButton;
				this.activeButtons.leftButton.resize(this.activeButtons.leftButton);
			}
		} else {
			if ("leftButton" in this.activeButtons) {
				delete this.activeButtons.leftButton;
			}
		}
		if ([this.world, this.level + 1] in this.loadedLevels || [this.world + 1, 1] in this.loadedLevels) {
			if (!("rightButton" in this.activeButtons)) {
				this.activeButtons.rightButton = this.buttons.rightButton;
				this.activeButtons.rightButton.resize(this.activeButtons.rightButton);
			}
		} else {
			if ("rightButton" in this.activeButtons) {
				delete this.activeButtons.rightButton;
			}
		}
		if (!("resetButton" in this.activeButtons)) {
			this.activeButtons.resetButton = this.buttons.resetButton;
			this.activeButtons.resetButton.resize(this.activeButtons.resetButton);
		}
		if (!("menuButton" in this.activeButtons)) {
			this.activeButtons.menuButton = this.buttons.menuButton;
			this.activeButtons.menuButton.resize(this.activeButtons.menuButton);
		}

		if (!("controlsButton" in this.activeButtons)) {
			this.activeButtons.controlsButton = this.buttons.controlsButton;
			this.activeButtons.controlsButton.resize(this.activeButtons.controlsButton);
		}
	}

	menuUI() {
		if (!("menuButton" in this.activeButtons)) {
			this.activeButtons.menuButton = this.buttons.menuButton;
			this.activeButtons.menuButton.resize(this.activeButtons.menuButton);
		}

		if (!("fullScreenButton" in this.activeButtons)) {
			this.activeButtons.fullScreenButton = this.buttons.fullScreenButton;
			this.activeButtons.fullScreenButton.resize(this.activeButtons.fullScreenButton);
		}

		if (this.menuWorld) {
			for (let button in this.activeButtons) {
				if (button.length === 1) delete this.activeButtons[button];
			}
			if ("settingsButton" in this.activeButtons) {
				delete this.activeButtons.settingsButton;
			}
			if (!("backButton" in this.activeButtons)) {
				this.activeButtons.backButton = this.buttons.backButton;
				this.activeButtons.backButton.resize(this.activeButtons.backButton);
			}
			for (let levelID in this.loadedLevels) {
				if (levelID[0] != this.menuWorld) continue;
				if (!(levelID in this.activeButtons)) {
					this.activeButtons[levelID] = this.buttons[levelID];
					this.activeButtons[levelID].resize(this.activeButtons[levelID]);
				}
			}
		} else {
			if (!("settingsButton" in this.activeButtons)) {
				this.activeButtons.settingsButton = this.buttons.settingsButton;
				this.activeButtons.settingsButton.resize(this.activeButtons.settingsButton);
			}
			if ("backButton" in this.activeButtons) {
				delete this.activeButtons.backButton;
			}
			for (let button in this.activeButtons) {
				if (button.length === 3) delete this.activeButtons[button];
			}
			let prev = null;
			for (let levelID in this.loadedLevels) {
				if (levelID[0] === prev) continue;
				else prev = levelID[0];
				if (!(levelID[0] in this.activeButtons)) {
					this.activeButtons[levelID[0]] = this.buttons[levelID[0]];
					this.activeButtons[levelID[0]].resize(this.activeButtons[levelID[0]]);
				}
			}
		}

		this.opacity = 0.8;
		this.blackout();
	}

	settingsUI() {
		if (!("menuButton" in this.activeButtons)) {
			this.activeButtons.menuButton = this.buttons.menuButton;
			this.activeButtons.menuButton.resize(this.activeButtons.menuButton);
		}

		if (!("fullScreenButton" in this.activeButtons)) {
			this.activeButtons.fullScreenButton = this.buttons.fullScreenButton;
			this.activeButtons.fullScreenButton.resize(this.activeButtons.fullScreenButton);
		}

		if (!("settingsButton" in this.activeButtons)) {
			this.activeButtons.settingsButton = this.buttons.settingsButton;
			this.activeButtons.settingsButton.resize(this.activeButtons.settingsButton);
		}

		this.opacity = 0.8;
		this.blackout();
	}

	clearUI() {
		this.activeButtons = {};
		this.activeIcons = {};
	}

	controlsUI() {
		if (!("controls" in this.activeIcons)) {
			this.activeIcons.controls = this.icons.controls;
			this.activeIcons.controls.resize(this.activeIcons.controls);
		} else {
			//this.activeIcons.controls.image.src = `images/${this.device}.png`;
		}

		this.opacity = 0.8;
		this.blackout();
	}

	resize() {
		for (let button in this.activeButtons) {
			this.activeButtons[button].resize(this.activeButtons[button]);
		}

		for (let icon in this.activeIcons) {
			this.activeIcons[icon].resize(this.activeIcons[icon]);
		}

		this.currentLevel.resize();

		this.cursor.resize();
	}

	nextLevel() {
		this.display = ["startTransition", "fadeout", "increaseLevel", "loadLevel", "blackout", "fadein", "startGamePlay"];
	}

	previousLevel() {
		this.display = ["startTransition", "fadeout", "decreaseLevel", "loadLevel", "blackout", "fadein", "startGamePlay"];
	}

	openMenu() {
		this.display = ["resetMenu", "startTransition", "startMenu"];
	}

	closeMenu() {
		this.display = ["resetMenu", "startTransition", "startGamePlay"];
	}

	openSettings() {
		this.display = ["startTransition", "startSettings"];
	}

	closeSettings() {
		this.display = ["startTransition", "startMenu"];
	}

	openControls() {
		this.display = ["startTransition", "startControls"];
	}

	closeControls() {
		this.display = ["startTransition", "startGamePlay"];
	}

	enterFullscreen() {
		document.body.requestFullscreen();
		this.fullscreen = true;
	}

	exitFullscreen() {
		document.exitFullscreen();
		this.fullscreen = false;
	}

	increaseLevel() {
		this.level++;
		if (this.level >= levels[this.world].length) {
			this.world++;
			this.level = 0;
		}
		this.blackout();
		this.endDisplay();
	}

	decreaseLevel() {
		this.level--;
		if (this.level < 0) {
			this.world--;
			this.level = levels[this.world].length - 1;
		}
		this.blackout();
		this.endDisplay();
	}

	fadeout() {
		if (!this.start) {
			this.start = this.tick;
			this.opacity = 0;
		}
		this.opacity += 0.0055;
		ctx.fillStyle = "#000";
		ctx.globalAlpha = this.opacity;
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.globalAlpha = 1;
		if (this.tick - this.start >= 180) {
			this.endDisplay();
		}
	}

	fadein() {
		if (!this.start) {
			this.start = this.tick;
			this.opacity = 1;
		}
		this.opacity -= 0.0055;
		ctx.fillStyle = "#000";
		ctx.globalAlpha = this.opacity;
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.globalAlpha = 1;
		if (this.tick - this.start >= 180) {
			this.endDisplay();
		}
	}

	blackout() {
		if (!this.start) {
			this.start = this.tick;
		}
		ctx.fillStyle = "#000";
		ctx.globalAlpha = this.opacity;
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.globalAlpha = 1;
		if (this.tick - this.start >= 60) {
			this.endDisplay();
		}
	}

	startGamePlay() {
		this.state = "gamePlayUI";
		this.endDisplay();
	}

	startTransition() {
		this.state = "clearUI";
		this.endDisplay();
	}

	startMenu() {
		this.state = "menuUI";
		this.blackout();
		this.endDisplay();
	}

	resetMenu() {
		this.menuWorld = false;
		this.endDisplay();
	}

	startSettings() {
		this.state = "settingsUI";
		this.blackout();
		this.endDisplay();
	}

	startControls() {
		this.state = "controlsUI";
		this.blackout();
		this.endDisplay();
	}

	loadLevel() {
		if ([this.world, this.level] in this.loadedLevels) {
			this.currentLevel = this.loadedLevels[[this.world, this.level]];
			this.currentLevel.reset();
			this.currentLevel.resize();
		} else {
			this.currentLevel = new Level(this.world, this.level);
			this.loadedLevels[[this.world, this.level]] = this.currentLevel;
		}
		this.blackout();
		this.endDisplay();
	}

	endDisplay() {
		this.start = null;
		this.opacity = 1;
		this.display.shift();
	}

	checkHover(button, position) {
		return position.x > button.x && position.x < button.x + button.width && position.y > button.y && position.y < button.y + button.height;
	}

	checkOverButton(position) {
		for (let button in this.activeButtons) {
			let over = this.checkHover(this.activeButtons[button], position);
			if (over) {
				if(!this.activeButtons[button].hovered) {
					this.activeButtons[button].hover();
				}
			} else if (this.activeButtons[button].hovered) {
				this.activeButtons[button].unhover();
			}
		}
	}

	clickButton(position) {
		for (let button in this.activeButtons) {
			let over = this.checkHover(this.activeButtons[button], position);
			if (over) {
				this.activeButtons[button].function(this.activeButtons[button]);
				this.activeButtons[button].resize(this.activeButtons[button]);
				return true;
			}
		}
		return false;
	}

	input(event, type, special = null) {
		if (event.preventDefault) event.preventDefault();
		if (type === "key") {
			this.device = "keyboard";
			if (this.state === "gamePlayUI") {
				switch (event.key) {
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
					case "m":
					case "e":
						this.openMenu();
						break;
					case " ":
					case "r":
						this.currentLevel.reset();
						break;
					case "q":
						this.openSettings();
					default:
						this.openControls();
				}
			} else if (this.state === "menuUI") {
				switch (event.key) {
					case "1":
					case "2":
					case "3":
					case "4":
					case "5":
					case "6":
					case "7":
					case "8":
					case "9":
						if (this.menuWorld && `${this.menuWorld},${event.key - 1}` in this.loadedLevels) {
							this.world = this.menuWorld;
							this.level = parseInt(event.key) - 1;
							this.display = ["startTransition", "fadeout", "loadLevel", "blackout", "fadein", "startGamePlay"];
						} else if (`${event.key},0` in this.loadedLevels) {
							this.menuWorld = parseInt(event.key);
						}
						break;
					case "m":
					case "e":
						this.closeMenu();
						break;
					default:
						this.openControls();
				}
			} else if (this.state === "settingsUI") {

			} else if (this.state === "controlsUI") {
				switch (event.key) {
					default:
						this.closeControls();
				}
			}
			switch (event.key) {
				case "Escape":
					if (this.fullscreen) this.exitFullscreen();
					break;
				case "F":
					if (this.fullscreen) this.exitFullscreen();
					else this.enterFullscreen();
				default:
			}
		} else if (type === "touch") {
			this.device = "touch";
			if (this.state === "controlsUI") this.closeControls();
			if (special === "start") {
				this.touchInterface.startPos = { x: event.touches[0].clientX, y: event.touches[0].clientY };
				this.touchInterface.endPos = { x: event.touches[0].clientX, y: event.touches[0].clientY };
				this.checkOverButton(this.touchInterface.endPos);
			} else if (special === "move") {
				this.touchInterface.endPos = { x: event.touches[0].clientX, y: event.touches[0].clientY };
				this.checkOverButton(this.touchInterface.endPos);
			}
			else if (special === "end") {
				let xdis = this.touchInterface.endPos.x - this.touchInterface.startPos.x;
				let ydis = this.touchInterface.endPos.y - this.touchInterface.startPos.y;
				this.touchInterface.dist = Math.sqrt(xdis ** 2 + ydis ** 2);
				if (Math.abs(xdis) < Math.abs(ydis)) {
					if (ydis < 0) this.touchInterface.dir = 0;
					else this.touchInterface.dir = 1;
				} else {
					if (xdis < 0) this.touchInterface.dir = 3;
					else this.touchInterface.dir = 2;
				}
				if (this.clickButton(this.touchInterface.endPos)) {
					return;
				}
				if (this.state === "gamePlayUI") {
					if (this.touchInterface.dist > this.currentLevel.size / 2) this.currentLevel.player.collide(this.touchInterface.dir);
				}
			}
		} else if (type === "mouse") {
			this.device = "mouse";
			if (special === "start") {
				this.touchInterface.startPos = { x: event.x, y: event.y };
				this.touchInterface.endPos = { x: event.x, y: event.y };
				this.checkOverButton(this.touchInterface.endPos);
				if (this.state === "controlsUI") {
					this.closeControls();
				} else {
					if (event.button) {
						this.openControls();
					}
				}
			} else if (special === "move") {
				this.touchInterface.endPos = { x: event.x, y: event.y };
				this.checkOverButton(this.touchInterface.endPos);
			}
			else if (special === "end") {
				this.touchInterface.endPos = { x: event.x, y: event.y };
				let xdis = this.touchInterface.endPos.x - this.touchInterface.startPos.x;
				let ydis = this.touchInterface.endPos.y - this.touchInterface.startPos.y;
				this.touchInterface.dist = Math.sqrt(xdis ** 2 + ydis ** 2);
				if (Math.abs(xdis) < Math.abs(ydis)) {
					if (ydis < 0) this.touchInterface.dir = 0;
					else this.touchInterface.dir = 1;
				} else {
					if (xdis < 0) this.touchInterface.dir = 3;
					else this.touchInterface.dir = 2;
				}
				if (this.clickButton(this.touchInterface.endPos)) return;
				if (this.state === "gamePlayUI") {
					if (this.touchInterface.dist > this.currentLevel.size / 2) this.currentLevel.player.collide(this.touchInterface.dir);
				}
			}
		} else if (type === "gamepadButton") {
			this.device = "gamepad";
			if (this.state === "gamePlayUI") {
				switch (event) {
					case "14":
						this.currentLevel.player.collide(3);
						break;
					case "15":
						this.currentLevel.player.collide(2);
						break;
					case "12":
						this.currentLevel.player.collide(0);
						break;
					case "13":
						this.currentLevel.player.collide(1);
						break;
					case "9":
					case "3":
						this.openMenu();
						break;
					case "2":
						this.currentLevel.reset();
						break;
					case "5":
					case "7":
						if ([this.world, this.level + 1] in this.loadedLevels || [this.world + 1, 1] in this.loadedLevels) this.nextLevel();
						break;
					case "4":
					case "6":
						if ([this.world, this.level - 1] in this.loadedLevels || [this.world - 1, 9] in this.loadedLevels) this.previousLevel();
						break;
					case "17":
						this.openControls();
				}
			} else if (this.state === "menuUI") {
				switch (event) {
					case "9":
					case "1":
					case "3":
						this.closeMenu();
						break;
					case "17":
						this.openControls();
				}
			} else if (this.state === "controlsUI") {
				this.closeControls();
			}
			switch (event) {
				case "0":
					this.clickButton({ x: this.cursor.x, y: this.cursor.y });
					break;
				case "17":
					if (this.fullscreen) this.exitFullscreen();
					else this.enterFullscreen();
			}
		} else if (type === "gamepadAxes") {
			this.device = "gamepad";
			if (this.state === "gamePlayUI") {
				if (special == 0) {
					if (event == -1.0) {
						this.currentLevel.player.collide(3);
					} else if (event == 1.0) {
						this.currentLevel.player.collide(2);
					}
				} else if (special == 1) {
					if (event == -1.0) {
						this.currentLevel.player.collide(0);
					} else if (event == 1.0) {
						this.currentLevel.player.collide(1);
					}
				}
			} else if (this.state === "menuUI") {
			}
			if (special == 2 || special == 3) {
				if (Math.abs(this.gamepadInterface.axes[2]) < 0.3 && Math.abs(this.gamepadInterface.axes[3]) < 0.3) return;
				this.cursor.x += this.gamepadInterface.axes[2] * this.cursor.sensitivity;
				this.cursor.y += this.gamepadInterface.axes[3] * this.cursor.sensitivity;
				if (this.cursor.x < screen.offsetLeft) this.cursor.x = screen.offsetLeft;
				else if (this.cursor.x > screen.offsetLeft + screen.width) this.cursor.x = screen.offsetLeft + screen.width;
				if (this.cursor.y < screen.offsetTop) this.cursor.y = screen.offsetTop;
				else if (this.cursor.y > screen.offsetTop + screen.height) this.cursor.y = screen.offsetTop + screen.height;
				this.checkOverButton({ x: this.cursor.x, y: this.cursor.y });
			}
		}
	}

	handleGamepadInputs(gamepad) {
		for (let button in gamepad.buttons) {
			if (gamepad.buttons[button].pressed || gamepad.buttons[button] > 0) {
				if (button in this.gamepadInterface.buttons) continue;
				this.gamepadInterface.buttons[button] = true;
				this.input(button, "gamepadButton");
				console.log(this.gamepadInterface.buttons);
			} else {
				delete this.gamepadInterface.buttons[button];
			}
		}

		for (let axis in gamepad.axes) {
			let truncated = Math.floor(gamepad.axes[axis] * 10) / 10;
			if (axis == 1 || axis == 0) {
				if (truncated !== this.gamepadInterface.axes[axis]) {
					this.gamepadInterface.axes[axis] = truncated;
					this.input(this.gamepadInterface.axes[axis], "gamepadAxes", axis);
				}
			} else {
				break;
			}
		}
		this.gamepadInterface.axes[2] = Math.floor(gamepad.axes[2] * 10) / 10;
		this.gamepadInterface.axes[3] = Math.floor(gamepad.axes[3] * 10) / 10;
		this.input(this.gamepadInterface.axes[2], "gamepadAxes", 2);
	}

	updateGamepad() {
		this.gamepads = navigator.getGamepads();
		for (let id in this.gamepads) {
			if (this.gamepads[id]) this.handleGamepadInputs(this.gamepads[id]);
			else break;
		}
	}

	connectController(e) {
		canvas.style.cursor = "none";
		this.gamepadConnected = true;
	}

	disconnectController(e) {
		this.gamepadConnected = false;
		this.gamepads = navigator.getGamepads();
		if (!this.gamepads[0]) {
			canvas.style.cursor = "default";
		}
		console.log(this.gamepads);
	}

	render() {
		for (let button in this.activeButtons) {
			let image = this.activeButtons[button];
			ctx.drawImage(image.image, image.x, image.y, image.width, image.height);
		}
		for (let icon in this.activeIcons) {
			let image = this.activeIcons[icon];
			ctx.drawImage(image.image, image.x, image.y, image.width, image.height);
		}
		if (this.gamepadConnected) {
			this.cursor.render();
		}
	}
}

class Button {
	constructor(src, proceedure, resize) {
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

	hover() {
		if (!this.hovered) {
			this.x -= this.width * 0.25;
			this.y -= this.height * 0.25;
			this.width *= 1.5;
			this.height *= 1.5;
			this.hovered = true;
		}
	}

	unhover() {
		if (this.hovered) {
			this.width /= 1.5;
			this.height /= 1.5;
			this.x += this.width * 0.25;
			this.y += this.height * 0.25;
			this.hovered = false;
		}
	}
}

class Icon {
	constructor(src, resize) {
		this.x = 1;
		this.y = 1;
		this.width = 1;
		this.height = 1;
		this.image = new Image();
		this.image.src = src;
		this.resize = resize;
		this.resize(this);
	}
}

class Cursor {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.width = screen.width / 10;
		this.height = screen.height / 10;
		this.sensitivity = 5;
		this.image = new Image();
		this.image.src = "images/cursor.png";
	}

	resize() {
		this.width = screen.width / 10;
		this.height = screen.height / 10;
	}

	render() {
		ctx.drawImage(this.image, this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
	}
}

class Animation {
	constructor(x, y, src, resize) {
		this.x = x;
		this.y = y;
		this.width = 1;
		this.height = 1;
		this.image = new Image();
		this.image.src = src;
		this.resize = resize;
		this.tick = 0;
		this.frame = 0;
	}

	update() {
		if (!(this.tick % frames)) this.render();

		this.tick++;
	}

	render() {
		this.frame++;
		ctx.drawImage(this.image, this.frame * this.size);
		//ctx.drawImage(this.image, (this.size * 4 + this.dir) * 16, this.col * 16, 16, 16, this.x * this.parent.size + this.parent.offsetLeft, this.y * this.parent.size + this.parent.offsetTop, this.parent.size, this.parent.size);
	}
}

class Level {
	constructor(world, id) {
		this.id = id;
		this.world = world;
		this.data = levels[this.world][this.id];
		this.name = this.data.name;
		this.layout = this.data.layout;
		this.exit = this.data.exit;
		this.level = this.parse();
		this.solved = false;
		this.resize();
	}

	parse() {
		let out = {};
		let layout = this.layout.split("\n").map(x => x.split(","));
		this.height = layout.length;
		this.width = layout[0].length;
		for (let y = 0; y < layout.length; y++) {
			for (let x = 0; x < layout[y].length; x++) {
				if (layout[y][x] === "-") continue;
				if (layout[y][x] === "P") {
					this.player = new Player(x, y, this);
					out[[x, y]] = this.player;
					continue;
				}
				let data = layout[y][x].split(".");
				out[[x, y]] = blockData[data[0]](x, y, this, parseInt(data[1]), parseInt(data[2]));
				if (data[3]) out[[x, y]].required = true;
			}
		}
		return out;
	}

	resize() {
		this.border = screen.width / 50;
		this.size = Math.min(Math.floor((screen.display.width - this.border * 2) / this.width), Math.floor((screen.display.height - this.border * 2) / this.height));
		this.offsetTop = Math.floor((screen.display.height - this.height * this.size) / 2) + screen.display.offsetTop;
		this.offsetLeft = Math.floor((screen.display.width - this.width * this.size) / 2) + screen.display.offsetLeft;
	}

	update() {
		for (let tile in this.level) {
			this.level[tile].update();
		}
		this.render();
	}

	finish() {
		userInterface.nextLevel();
	}

	reset() {
		this.level = this.parse();
		this.solved = false;
	}

	render() {
		ctx.fillStyle = "#8b9bb4";
		ctx.fillRect(this.offsetLeft - this.border, this.offsetTop, this.border, this.height * this.size);
		ctx.fillRect(this.offsetLeft + this.width * this.size, this.offsetTop, this.border, this.height * this.size);
		ctx.fillRect(this.offsetLeft - this.border, this.offsetTop - this.border, this.width * this.size + this.border * 2, this.border);
		ctx.fillRect(this.offsetLeft - this.border, this.offsetTop + this.height * this.size, this.width * this.size + this.border * 2, this.border);
		ctx.fillStyle = "#e43b44";
		if (this.exit.dir) {
			ctx.fillRect(this.offsetLeft + this.exit.x * this.size, this.offsetTop + this.exit.y * this.size, this.border, this.size);
		} else {
			ctx.fillRect(this.offsetLeft + this.exit.x * this.size, this.offsetTop + this.exit.y * this.size, this.size, this.border);
		}
		if (this.solved) {
			if (this.exit.dir) {
				ctx.clearRect(this.offsetLeft + this.exit.x * this.size, this.offsetTop + this.exit.y * this.size, this.border + 1, this.size);
			} else {
				ctx.clearRect(this.offsetLeft + this.exit.x * this.size, this.offsetTop + this.exit.y * this.size, this.size, this.border + 1);
			}
		}
		// ctx.globalAlpha = 0.2;
		// ctx.fillStyle = "red";
		// ctx.fillRect(screen.offsetLeft, screen.offsetTop, screen.width, screen.height);
		// ctx.fillStyle = "green";
		// ctx.fillRect(screen.display.offsetLeft, screen.display.offsetTop, screen.display.width, screen.display.height);
		// ctx.fillStyle = "blue";
		// ctx.fillRect(this.offsetLeft, this.offsetTop, this.width*this.size, this.height*this.size);
		// ctx.globalAlpha = 1;
	}
}

class Object {
	constructor(x, y, parent, size, direction, colour) {
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

	update() {
		this.render();
		if (this.contains) {
			this.contains.update();
		}
	}

	checkOpening(dir) {
		return (dir !== this.dir) && ((dir < 2 && this.dir < 2) || (dir > 1 && this.dir > 1));
	}

	moveChildren() {
		this.contains.x = this.x;
		this.contains.y = this.y;
		if (this.contains.contains) this.contains.moveChildren();
	}

	checkContainer(dir) {
		let large = true;
		let small = true;

		if (this.container) {
			small = this.container.checkOpening(dir);
			if (this.container.container) large = this.container.container.checkOpening(dir);
		}

		if(!large){
			return this.container.container;
		} else if(!small){
			return this.container;
		}
		return this;
	}

	move(pos) {
		if (this.container) {
			this.container.move(pos);
			return;
		}
		this.parent.level[pos] = this;
		this.x = pos[0];
		this.y = pos[1];
		if (this.contains) this.moveChildren();
	}

	leaveContainer() {
		if(this.container) this.container.contains = null;
		this.container = null;
	}

	render() {
		ctx.drawImage(this.image, (this.size * 4 + this.dir) * 16, this.col * 16, 16, 16, this.x * this.parent.size + this.parent.offsetLeft, this.y * this.parent.size + this.parent.offsetTop, this.parent.size, this.parent.size);
	}
}

class Triangle extends Object {
	constructor(x, y, parent, size, direction, colour) {
		super(x, y, parent, size, direction, colour);
		this.image.src = "images/triangle.png"
	}
}

class Square extends Object {
	constructor(x, y, parent, size, direction, colour) {
		super(x, y, parent, size, direction, colour);
		this.image.src = "images/square.png"
	}
}

class Hexagon extends Object {
	constructor(x, y, parent, size, direction, colour) {
		super(x, y, parent, size, direction, colour);
		this.image.src = "images/hexagon.png"
	}
}

class Player extends Object {
	constructor(x, y, parent) {
		super(x, y, parent, 2);
		this.image.src = "images/player.png"
		this.required = true;
	}

	collide(dir) {
		switch (dir) {
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

		let inside = (newPosition[0] >= 0 && newPosition[1] >= 0 && newPosition[0] < this.parent.width && newPosition[1] < this.parent.height);
		if (this.parent.solved && newPosition[0] === this.parent.exit.x && newPosition[1] === this.parent.exit.y) {
			this.move(newPosition);
			this.parent.finish();
		}
		if(!inside) return;

		let leaving = this.checkContainer(dir);

		if(newPosition in this.parent.level){
			let newContainer = this.parent.level[newPosition];
			if((newContainer.size < leaving.size) && dir === newContainer.dir){
				if(newContainer.contains){
					if((newContainer.contains.size < leaving.size) && dir === newContainer.contains.dir){
						if(!leaving.container) 	delete this.parent.level[[this.x, this.y]];
						leaving.leaveContainer();
						leaving.container = newContainer.contains;
						leaving.container.contains = leaving;
						leaving.move(newPosition);
					}
				} else {
					if(!leaving.container) 	delete this.parent.level[[this.x, this.y]];
					leaving.leaveContainer();
					leaving.container = newContainer;
					leaving.container.contains = leaving;
					leaving.move(newPosition);
				}
			}
		} else{
			if(!leaving.container) 	delete this.parent.level[[this.x, this.y]];
			leaving.leaveContainer();
			leaving.move(newPosition);
		}

		if(this.container){
			if(this.container.container){
				if(this.container.container.required && this.container.required){
					this.parent.solved = true;
				}
			}
		}
	}

	render() {
		ctx.drawImage(this.image, this.x * this.parent.size + this.parent.offsetLeft, this.y * this.parent.size + this.parent.offsetTop, this.parent.size, this.parent.size);
	}
}