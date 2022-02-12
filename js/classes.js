class UI {
	constructor() {
		this.menuWorld = false;
		this.fullscreen = false;
		this.state = "startUI";
		this.gamepadConnected = false;
		this.gamepads = {};
		this.loadedLevels = {};
		this.solvedLevels = {};
		this.display = [];
		this.touchInterface = { startPos: null, endPos: null, dir: null, dist: null }
		this.gamepadInterface = { axes: {}, buttons: {} };
		this.cursor = new Cursor(screen.width / 2 + screen.offsetLeft, screen.width / 2 + screen.offsetLeft);
		this.settings = {sensitivity: 5, audio: 25, size: 1};
		this.originalSettings = {...this.settings};
		this.slider = null;
		this.infoText = null;
		this.device = "keyboard";
		this.start = null;
		this.tick = 0;
		this.opacity = 1;
		this.Buttons = {};
		this.activeButtons = {};
		this.Icons = {};
		this.activeIcons = {};
		this.Animations = {};
		this.activeAnimations = {};
		this.Sliders = {};
		this.activeSliders = {};

		this.Buttons.leftButton = new Button("images/leftButton.png", () => { userInterface.previousLevel() }, (button) => {
			button.width = screen.width / 10;
			button.height = screen.width / 10;
			button.x = screen.offsetLeft + screen.width / 50;
			button.y = screen.height + screen.offsetTop - (screen.width / 20) * 3;
			button.hovered = false;
		}, "LAST LEVEL");
		this.Buttons.rightButton = new Button("images/rightButton.png", () => { userInterface.nextLevel() }, (button) => {
			button.width = screen.width / 10;
			button.height = screen.width / 10;
			button.x = screen.offsetLeft + screen.width - screen.width / 10 - screen.width / 50;
			button.y = screen.height + screen.offsetTop - (screen.width / 20) * 3;
			button.hovered = false
		}, "NEXT LEVEL");
		this.Buttons.resetButton = new Button("images/resetButton.png", () => { userInterface.currentLevel.reset() }, (button) => {
			button.width = screen.width / 10;
			button.height = screen.width / 10;
			button.x = screen.offsetLeft + (screen.width - screen.width / 25) / 3;
			button.y = screen.offsetTop + screen.width / 20;
			button.hovered = false
		}, "RESET");
		this.Buttons.undoButton = new Button("images/undoButton.png", () => { userInterface.currentLevel.undo() }, (button) => {
			button.width = screen.width / 10;
			button.height = screen.width / 10;
			button.x = screen.offsetLeft + ((screen.width - screen.width / 25) / 3 * 2) - button.width / 2;
			button.y = screen.offsetTop + screen.width / 20;
			button.hovered = false
		}, "UNDO");
		this.Buttons.menuButton = new Button("images/menuButton.png", () => {
			if (userInterface.state === "menuUI") userInterface.closeMenu();
			else userInterface.openMenu();
		}, (button) => {
			button.width = screen.width / 10;
			button.height = screen.width / 10;
			button.x = screen.offsetLeft + screen.width / 50;
			button.y = screen.offsetTop + screen.width / 20;
			button.hovered = false
		}, "MENU");
		this.Buttons.fullScreenButton = new Button("images/fullScreenButton.png", (button) => {
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
		}, "FULLSCREEN");

		this.Buttons.settingsButton = new Button("images/settingsButton.png", (button) => {
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
		}, "SETTINGS");

		this.Buttons.backButton = new Button("images/leftButton.png", (button) => {
			userInterface.menuWorld = false;
		}, (button) => {
			button.width = screen.width / 10;
			button.height = screen.width / 10;
			button.x = screen.offsetLeft + screen.width / 2 - screen.width / 20;
			button.y = screen.offsetTop + screen.width / 20;
			button.hovered = false
		}, "BACK");

		this.Buttons.controlsButton = new Button("images/controlsButton.png", (button) => {
			this.openControls();
		}, (button) => {
			button.width = screen.width / 10;
			button.height = screen.width / 10;
			button.x = screen.offsetLeft + screen.width - button.width - screen.width / 50;
			button.y = screen.offsetTop + screen.width / 20;
			button.hovered = false
		}, "CONTROLS");

		this.Icons.controls = new Icon("images/keyboard.png", (icon) => {
			icon.width = screen.width - screen.width / 10;
			icon.height = screen.height - screen.width / 10;
			icon.x = screen.offsetLeft + screen.width / 20;
			icon.y = screen.offsetTop + screen.width / 20;
		});

		this.Animations.movement = new Animation(60, 48, 16, 4, "images/movementAnim.png", (anim) => {
			anim.width = (screen.width - screen.width/10) / 10 * 3;
			anim.height =  (screen.width - screen.width/10) / 10;
			anim.x = screen.offsetLeft + screen.width / 20;
			anim.y = screen.offsetTop + screen.width / 20 + (screen.width - screen.width/10) / 10 * 2;
		});

		this.Animations.cursor = new Animation(4, 64, 32, 60, "images/cursorAnim.png", (anim) => {
			anim.width = (screen.width - screen.width/10) / 10 * 4;
			anim.height =  (screen.width - screen.width/10) / 10 * 2;
			anim.x = screen.offsetLeft + screen.width / 20 * 6;
			anim.y = screen.offsetTop + screen.width / 20 + (screen.width - screen.width/10) / 10 * 8;
		});

		this.Animations.drag = new Animation(4, 48, 16, 60, "images/dragAnim.png", (anim) => {
			anim.width = (screen.width - screen.width/10) / 10 * 4;
			anim.height =  (screen.width - screen.width/10) / 10 * 2;
			anim.x = screen.offsetLeft + screen.width / 20 * 6;
			anim.y = screen.offsetTop + screen.width / 20 + (screen.width - screen.width/10) / 10 * 8;
		});

		this.Sliders.sensitivity = new Slider([1, 10], this.settings.sensitivity, "sensitivity", (slider) => {
			slider.width = screen.width - (screen.height/10 * 1.2 * 3) - screen.width/25;
			slider.height = screen.height/10;
			slider.x = screen.offsetLeft + screen.width - slider.width - screen.width/50;
			slider.y = screen.offsetTop + screen.height/5 + screen.height/10;
		});

		this.Sliders.audio = new Slider([0, 50], this.settings.audio, "audio", (slider) => {
			slider.width = screen.width - (screen.height/10 * 1.2 * 3) - screen.width/25;
			slider.height = screen.height/10;
			slider.x = screen.offsetLeft + screen.width - slider.width - screen.width/50;
			slider.y = screen.offsetTop + screen.height/2.5 + screen.height/10;
		});

		this.Sliders.size = new Slider([0.25, 1], this.settings.size, "size", (slider) => {
			slider.width = screen.width - (screen.height/10 * 1.2 * 3) - screen.width/25;
			slider.height = screen.height/10;
			slider.x = screen.offsetLeft + screen.width - slider.width - screen.width/50;
			slider.y = screen.offsetTop + screen.height * 3/5 + screen.height/10;
		}, () => {
			resize();
		});

		this.Buttons.resetSettingsButton = new Button("images/resetButton.png", (button) => {
			this.resetSettings();
		}, (button) => {
			button.width = screen.width / 10;
			button.height = screen.width / 10;
			button.x = screen.offsetLeft + screen.width / 2 - screen.width / 20;
			button.y = screen.height + screen.offsetTop - (screen.width / 20) * 3;
			button.hovered = false;
		}, "RESET TO DEFAULT");

		this.Icons.volume = new Icon("images/volume.png", (icon) => {
			icon.width = screen.width/10;
			icon.height = icon.width;
			icon.x = screen.offsetLeft + screen.width/50;
			icon.y = screen.offsetTop + screen.height/5 + screen.height/5 + screen.height/10;
		});

		this.Icons.screensize = new Icon("images/screensize.png", (icon) => {
			icon.width = screen.width/10;
			icon.height = icon.width;
			icon.x = screen.offsetLeft + screen.width/50;
			icon.y = screen.offsetTop + screen.height/5 + screen.height/5 + screen.height/10 + screen.height / 5;
		});

		this.Icons.start = new Icon("images/start.png", (icon) => {
			icon.width = screen.width;
			icon.height = icon.width;
			icon.x = screen.offsetLeft;
			icon.y = screen.offsetTop;
		});

		this.createWorldButtons();
		this.createWorldIcons();
	}

	createWorldButtons() {
		for (let i = 1; i < 10; i++) {
			let world = levels[i];
			if (world === undefined) continue;
			for (let j = 0; j < world.length; j++) {
				this.Buttons[[i, j]] = new Button(`images/num${j}.png`, (button) => {
					this.world = i;
					this.level = j;
					this.display = ["startTransition", "fadeout", "loadLevel", "blackout", "fadein", "startGamePlay"];
				}, (button) => {
					button.width = screen.width / 7.5;
					button.height = screen.width / 7.5;
					button.x = screen.offsetLeft + (screen.width / 2 * (j % 3)) + screen.width / 50 * ((j % 3) ? ((j % 3) - 1 ? -1 : 0) : 1) - (button.width / 2) * (j % 3);
					button.y = screen.offsetTop + button.height * 2 * (Math.floor(j / 3) + 1);
					button.hovered = false
				}, "GO TO LEVEL " + (j+1));
			}
			this.Buttons[i] = new Button(`images/num${i - 1}.png`, (button) => {
				this.menuWorld = i;
			}, (button) => {
				button.width = screen.width / 7.5;
				button.height = screen.width / 7.5;
				button.x = screen.offsetLeft + (screen.width / 2 * ((i - 1) % 3)) + screen.width / 50 * (((i - 1) % 3) ? (((i - 1) % 3) - 1 ? -1 : 0) : 1) - (button.width / 2) * ((i - 1) % 3);
				button.y = screen.offsetTop + button.height * 2 * (Math.floor((i - 1) / 3) + 1);
				button.hovered = false
			}, "WORLD " + i);
		}
	}

	createWorldIcons() {
		for (let i = 1; i < 10; i++) {
			let world = levels[i];
			if (world === undefined) continue;
			let length = world.length
			for (let j = 0; j < length; j++) {
				this.Icons[[i, j]] = new Icon("images/incompleteLevelIcon.png", (icon) => {
					icon.width = (screen.width * 30 / 50) / 8;
					icon.height = icon.width;
					icon.x = (j - length / 2) * icon.width + screen.offsetLeft + screen.width / 2;
					icon.y = screen.height + screen.offsetTop - screen.width * 11 / 80;
				});
			}
		}
	}

	update() {
		if (this.gamepadConnected) this.updateGamepad();

		this.currentLevel.update();

		if (this.state) {
			this.loadComponents();
			this[this.state]();
		}

		this.render();

		if (this.display.length) this[this.display[0]]();

		this.tick++;
	}

	loadComponents(){
		let components = uiComponents[this.state];
		
		for(let component in components){
			const type = components[component].type;
			const active = "active" + type;
			if (!(component in this[active])) {
				this[active][component] = this[type][component];
				if(components[component].resize) this[active][component].resize = components[component].resize;
				this[active][component].resize(this[active][component]);
			}
		}
	}

	startUI(){
		ctx.fillStyle = "#181425";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
	}

	gamePlayUI() {
		if ([this.world, this.level - 1] in this.loadedLevels || [this.world - 1, levels[this.world].length - 1] in this.loadedLevels) {
			if (!("leftButton" in this.activeButtons)) {
				this.activeButtons.leftButton = this.Buttons.leftButton;
				this.activeButtons.leftButton.resize(this.activeButtons.leftButton);
			}
		} else {
			if ("leftButton" in this.activeButtons) {
				delete this.activeButtons.leftButton;
			}
		}
		if ([this.world, this.level + 1] in this.loadedLevels || [this.world + 1, 0] in this.loadedLevels) {
			if (!("rightButton" in this.activeButtons)) {
				this.activeButtons.rightButton = this.Buttons.rightButton;
				this.activeButtons.rightButton.resize(this.activeButtons.rightButton);
			}
		} else {
			if ("rightButton" in this.activeButtons) {
				delete this.activeButtons.rightButton;
			}
		}

		for (let i = 0; i < levels[this.world].length; i++) {
			if (!([this.world, i] in this.activeIcons)) {
				this.activeIcons[[this.world, i]] = this.Icons[[this.world, i]];
				this.activeIcons[[this.world, i]].resize(this.activeIcons[[this.world, i]]);
				if (i === this.level) continue;
				if ([this.world, i] in this.solvedLevels) {
					this.Icons[[this.world, i]].image.src = "images/completeLevelIcon.png";
				} else {
					this.Icons[[this.world, i]].image.src = "images/incompleteLevelIcon.png";
				}
			} else {
				break;
			}
		}

	}

	menuUI() {
		if (this.menuWorld) {
			for (let button in this.activeButtons) {
				if (button.length === 1) delete this.activeButtons[button];
			}
			if ("settingsButton" in this.activeButtons) {
				delete this.activeButtons.settingsButton;
			}
			if (!("backButton" in this.activeButtons)) {
				this.activeButtons.backButton = this.Buttons.backButton;
				this.activeButtons.backButton.resize(this.activeButtons.backButton);
			}
			for (let levelID in this.loadedLevels) {
				if (levelID[0] != this.menuWorld) continue;
				if (!(levelID in this.activeButtons)) {
					this.activeButtons[levelID] = this.Buttons[levelID];
					this.activeButtons[levelID].resize(this.activeButtons[levelID]);
				}
			}
		} else {
			if (!("settingsButton" in this.activeButtons)) {
				this.activeButtons.settingsButton = this.Buttons.settingsButton;
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
					this.activeButtons[levelID[0]] = this.Buttons[levelID[0]];
					this.activeButtons[levelID[0]].resize(this.activeButtons[levelID[0]]);
				}
			}
		}

		this.opacity = 0.8;
		this.blackout();
	}

	settingsUI() {
		this.opacity = 0.8;
		this.blackout();
	}

	clearUI() {
		this.activeButtons = {};
		this.activeIcons = {};
		this.activeAnimations = {};
		this.activeSliders = {};
	}

	controlsUI() {
		if("controls" in this.activeIcons){
			if(`images/${this.device}.png` !== this.activeIcons.controls.image.src) this.activeIcons.controls.image.src = `images/${this.device}.png`;
		}

		let components = uiComponents[this.device];

		for(let component in components){
			const type = components[component].type;
			const active = "active" + type;
			if (!(component in this[active])) {
				this[active][component] = this[type][component];
				if(components[component].resize) this[active][component].resize = components[component].resize;
				this[active][component].resize(this[active][component]);
			}
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

		for (let anim in this.activeAnimations) {
			this.activeAnimations[anim].resize(this.activeAnimations[anim]);
		}

		for (let slider in this.activeSliders) {
			this.activeSliders[slider].resize(this.activeSliders[slider]);
		}

		this.currentLevel.resize();

		this.cursor.resize();
	}

	resetSettings(){
		this.settings = {sensitivity: 5, audio: 25, size: 1};
		for (let slider in this.activeSliders) {
			this.activeSliders[slider].value = this.settings[this.activeSliders[slider].variable];
		}
		resize();
	} 

	startLevel() {
		this.display = ["fadeout", "startTransitionBlack", "blackout", "fadein", "startGamePlay"];
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

	displayInfoText() {
		let x = 0;
		let y = 0;
		if(this.gamepadConnected){
			x = this.cursor.x;
			y = this.cursor.y;
		} else {
			x = this.touchInterface.endPos.x;
			y = this.touchInterface.endPos.y;
		}
		let width = ctx.measureText(this.infoText).width;
		let height = screen.width/20;
		ctx.fillStyle = "#181425";
		ctx.fillRect(x, y - height, width, height);
		ctx.fillStyle = "#FFF";
		ctx.textAlign = "left";
		ctx.textBaseline = "bottom";
		ctx.font = `${height}px monospace`;
		ctx.fillText(this.infoText, x, y);
	}

	startGamePlay() {
		this.state = "gamePlayUI";
		this.endDisplay();
	}

	startTransition() {
		this.state = "clearUI";
		this.endDisplay();
	}

	startTransitionBlack() {
		this.state = "clearUI";
		this.blackout();
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
		this.Icons[[this.world, this.level]].image.src = "images/currentLevelIcon.png";
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
				if (!this.activeButtons[button].hovered) {
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
				this.infoText = null;
				return true;
			}
		}
		return false;
	}

	checkOverSlider(position) {
		for (let slider in this.activeSliders) {
			let over = this.checkHover(this.activeSliders[slider], position);
			if (over) {
				this.slider = this.activeSliders[slider];
				return true;
			}
		}
		this.slider = null
		return false;
	}

	input(event, type, special = null) {
		if (event.preventDefault && type !== "key") event.preventDefault();
		if (type === "key") {
			this.device = "keyboard";
			if(this.state === "startUI"){
				this.startLevel();
			}else if (this.state === "gamePlayUI") {
				switch (event.key) {
					case "ArrowLeft":
					case "a":
						console.log("a");
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
						break;
					case "z":
					case "u":
						this.currentLevel.undo();
						break;
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
					case "s":
						this.openSettings();
				}
			} else if (this.state === "settingsUI") {
				switch (event.key) {
					default:
						this.closeSettings();
				}
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
				case "f":
					if (this.fullscreen) this.exitFullscreen();
					else this.enterFullscreen();
					break;
				case "c":
					if(this.state !== "controlsUI") this.openControls();
					break;
			}
		} else if (type === "touch") {
			this.device = "touch";
			if(this.state === "startUI"){
				this.startLevel();
			}
			if (special === "start") {
				this.touchInterface.startPos = { x: event.touches[0].clientX, y: event.touches[0].clientY };
				this.touchInterface.endPos = { x: event.touches[0].clientX, y: event.touches[0].clientY };
				this.checkOverButton(this.touchInterface.endPos);
				this.checkOverSlider(this.touchInterface.endPos);
			} else if (special === "move") {
				this.touchInterface.endPos = { x: event.touches[0].clientX, y: event.touches[0].clientY };
				this.checkOverButton(this.touchInterface.endPos);
				if(this.slider) {
					this.slider.move(this.touchInterface);
				}
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
				if(this.slider) {
					this.slider.move(this.touchInterface);
					if(this.slider.func){
						this.slider.func();
					}
					this.slider = null;
				}
				if (this.clickButton(this.touchInterface.endPos)) {
					return;
				}
				if (this.state === "gamePlayUI") {
					if (this.touchInterface.dist > ((this.currentLevel.size / 2) /this.settings.sensitivity) * 5) this.currentLevel.player.collide(this.touchInterface.dir);
				} else if (this.state === "controlsUI") this.closeControls();
			}
		} else if (type === "mouse") {
			this.device = "mouse";

			if (special === "start") {
				this.touchInterface.startPos = { x: event.x, y: event.y };
				this.touchInterface.endPos = { x: event.x, y: event.y };
				this.checkOverButton(this.touchInterface.endPos);
				this.checkOverSlider(this.touchInterface.endPos);
			} else if (special === "move") {
				this.touchInterface.endPos = { x: event.x, y: event.y };
				this.checkOverButton(this.touchInterface.endPos);
				if(this.slider) {
					this.slider.move(this.touchInterface);
				}
			}
			else if (special === "end") {
				if(this.state === "startUI"){
					this.startLevel();
				}
				if(event.button === 2){
					this.currentLevel.undo();
					return;
				} else if(event.button === 1){
					this.currentLevel.reset();
					return;
				}
				
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

				if(this.slider) {
					this.slider.move(this.touchInterface);
					if(this.slider.func){
						this.slider.func();
					}
					this.slider = null;
				}
				if (this.clickButton(this.touchInterface.endPos)) return;

				if (this.state === "gamePlayUI") {
					if (this.touchInterface.dist > ((this.currentLevel.size / 2) /this.settings.sensitivity) * 5) this.currentLevel.player.collide(this.touchInterface.dir);
				}
				if (this.state === "controlsUI") {
					this.closeControls();
				} else {
					if (event.button > 2) {
						this.openControls();
					}
				}
			}
		} else if (type === "gamepadButton") {
			this.device = "gamepad";
			if(this.state === "startUI"){
				this.startLevel();
			} else if (this.state === "gamePlayUI") {
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
					case "1":
						this.currentLevel.undo();
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
					this.clickButton(this.cursor);
					if(this.slider) this.slider = null;
					else this.checkOverSlider(this.cursor);
					break;
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
				this.cursor.x += this.gamepadInterface.axes[2] * this.settings.sensitivity;
				this.cursor.y += this.gamepadInterface.axes[3] * this.settings.sensitivity;
				if (this.cursor.x < screen.offsetLeft) this.cursor.x = screen.offsetLeft;
				else if (this.cursor.x > screen.offsetLeft + screen.width) this.cursor.x = screen.offsetLeft + screen.width;
				if (this.cursor.y < screen.offsetTop) this.cursor.y = screen.offsetTop;
				else if (this.cursor.y > screen.offsetTop + screen.height) this.cursor.y = screen.offsetTop + screen.height;
				this.checkOverButton({ x: this.cursor.x, y: this.cursor.y });
				if(this.slider) {
					this.slider.move({endPos:{x:this.cursor.x}});
					if(this.slider.func){
						this.slider.func();
					}
				}
			}
		}
	}

	handleGamepadInputs(gamepad) {
		for (let button in gamepad.buttons) {
			if (gamepad.buttons[button].pressed || gamepad.buttons[button] > 0) {
				if (button in this.gamepadInterface.buttons) continue;
				this.gamepadInterface.buttons[button] = true;
				this.input(button, "gamepadButton");
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
			canvas.style.cursor = "pointer";
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
		for (let anim in this.activeAnimations) {
			let image = this.activeAnimations[anim];
			image.update();
		}
		for (let slider in this.activeSliders) {
			let image = this.activeSliders[slider];
			image.render();
		}
		if (this.gamepadConnected) {
			this.cursor.render();
		}
		if(this.infoText){
			this.displayInfoText();
		}
	}
}

class Button {
	constructor(src, procedure, resize, text) {
		this.x = 1;
		this.y = 1;
		this.width = 1;
		this.height = 1;
		this.image = new Image();
		this.image.src = src;
		this.function = procedure;
		this.resize = resize;
		this.text = text;
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
			userInterface.infoText = this.text;
		}
	}

	unhover() {
		if (this.hovered) {
			this.width /= 1.5;
			this.height /= 1.5;
			this.x += this.width * 0.25;
			this.y += this.height * 0.25;
			this.hovered = false;
			userInterface.infoText = null;
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
	constructor(speed, animWidth, animHeight, animLength, src, resize) {
		this.x = 1;
		this.y = 1;
		this.width = 1;
		this.height = 1;
		this.image = new Image();
		this.image.src = src;
		this.animWidth = animWidth;
		this.animHeight = animHeight;
		this.animSpeed = speed;
		this.animLength = animLength;
		this.resize = resize;
		this.frame = 0;
	}

	update() {
		if (!(userInterface.tick % this.animSpeed)) {
			this.frame++;
			if (this.frame === this.animLength) this.frame = 0;
		}
		this.render();
	}

	render() {
		ctx.drawImage(this.image, this.frame * this.animWidth, 0, this.animWidth, this.animHeight, this.x, this.y, this.width, this.height);
	}
}

class Slider {
	constructor(range, value, variable, resize, func = null){
		this.min = range[0];
		this.max = range[1];
		this.range = this.max - this.min;
		this.value = value;
		this.variable = variable;
		this.resize = resize;
		this.func = func;
	}

	move(data){
		this.value = this.min + (data.endPos.x - this.x)/(this.width/this.range);
		if(this.value < this.min) this.value = this.min;
		else if(this.value > this.max) this.value = this.max;
		userInterface.settings[this.variable] = this.value;
	}

	render(){
		ctx.fillStyle = "#8b9bb4";
		ctx.fillRect(this.x, this.y, this.width, this.height);
		ctx.fillStyle = "#fff";
		ctx.fillRect(this.x, this.y, this.width/this.range * (this.value - this.min), this.height);
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
		this.path = [];
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
		userInterface.solvedLevels[[this.world, this.id]] = true;
		userInterface.nextLevel();
	}

	reset() {
		this.level = this.parse();
		this.path = [];
		this.solved = false;
	}

	undo() {
		if (this.path.length === 0) return;
		let state = this.path[this.path.length - 1];
		state = state.split(",");
		state.pop();
		state = state.map(x => x.split("_").map(y => y.split(".")));

		this.level = {};

		for (let tile of state) {
			let prev;
			if (tile[0][0] === "Square") {
				prev = new Square(parseInt(tile[0][1]), parseInt(tile[0][2]), this, parseInt(tile[0][3]), parseInt(tile[0][4]), parseInt(tile[0][5]));
			} else if (tile[0][0] === "Hexagon") {
				prev = new Hexagon(parseInt(tile[0][1]), parseInt(tile[0][2]), this, parseInt(tile[0][3]), parseInt(tile[0][4]), parseInt(tile[0][5]));
			} else if (tile[0][0] === "Triangle") {
				prev = new Triangle(parseInt(tile[0][1]), parseInt(tile[0][2]), this, parseInt(tile[0][3]), parseInt(tile[0][4]), parseInt(tile[0][5]));
			} else {
				prev = new Player(parseInt(tile[0][1]), parseInt(tile[0][2]), this);
				this.player = prev;
			}

			this.level[[tile[0][1], tile[0][2]]] = prev;
			for (let i = 1; i < tile.length; i++) {
				if (tile[i][0] === "Square") {
					prev.contains = new Square(parseInt(tile[i][1]), parseInt(tile[i][2]), this, parseInt(tile[i][3]), parseInt(tile[i][4]), parseInt(tile[i][5]));
				} else if (tile[i][0] === "Hexagon") {
					prev.contains = new Hexagon(parseInt(tile[i][1]), parseInt(tile[i][2]), this, parseInt(tile[i][3]), parseInt(tile[i][4]), parseInt(tile[i][5]));
				} else if (tile[i][0] === "Triangle") {
					prev.contains = new Triangle(parseInt(tile[i][1]), parseInt(tile[i][2]), this, parseInt(tile[i][3]), parseInt(tile[i][4]), parseInt(tile[i][5]));
				} else {
					prev.contains = new Player(parseInt(tile[i][1]), parseInt(tile[i][2]), this);
					this.player = prev.contains;
				}
				prev.contains.container = prev;
				prev = prev.contains;
			}
		}
		this.path.pop();
	}

	hashLevelSate() {
		//create unique identification for game state
		let hash = "";
		for (let object in this.level) {
			hash += this.level[object].constructor.name + ".";
			hash += this.level[object].x + ".";
			hash += this.level[object].y + ".";
			hash += this.level[object].hash
			if (this.level[object].contains) {
				hash += "_";
				hash += this.level[object].contains.constructor.name + ".";
				hash += this.level[object].contains.x + ".";
				hash += this.level[object].contains.y + ".";
				hash += this.level[object].contains.hash
				if (this.level[object].contains.contains) {
					hash += "_";
					hash += this.level[object].contains.contains.constructor.name + ".";
					hash += this.level[object].contains.contains.x + ".";
					hash += this.level[object].contains.contains.y + ".";
					hash += this.level[object].contains.contains.hash
				}
			}
			hash += ",";
		}
		return hash;
	}

	storeState() {
		//store level state
		const state = this.hashLevelSate()
		this.path.push(state);
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
		this.container = null;
		this.contains = null;
		this.hash = `${this.size}.${this.dir}.${this.col}`;
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

		if (!large) {
			return this.container.container;
		} else if (!small) {
			return this.container;
		}
		return this;
	}

	compareShapes(container) {
		if (this instanceof Hexagon) {
			if (!(container instanceof Hexagon)) {
				return false;
			}
		} else if (this instanceof Square) {
			if (container instanceof Triangle) {
				return false;
			}
		}
		return true;
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
		if (this.container) this.container.contains = null;
		this.container = null;
	}

	render() {
		ctx.drawImage(this.image, (this.size * 4 + this.dir) * 16, this.col * 16, 16, 16, this.x * this.parent.size + this.parent.offsetLeft, this.y * this.parent.size + this.parent.offsetTop, this.parent.size, this.parent.size);
	}
}

class Triangle extends Object {
	constructor(x, y, parent, size, direction, colour) {
		super(x, y, parent, size, direction, colour);
		this.image.src = "images/triangle.png";
	}
}

class Square extends Object {
	constructor(x, y, parent, size, direction, colour) {
		super(x, y, parent, size, direction, colour);
		this.image.src = "images/square.png";
	}
}

class Hexagon extends Object {
	constructor(x, y, parent, size, direction, colour) {
		super(x, y, parent, size, direction, colour);
		this.image.src = "images/hexagon.png";
	}
}

class Player extends Object {
	constructor(x, y, parent) {
		super(x, y, parent, 2);
		this.image.src = "images/player.png";
		this.hash = "";
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
		if (!inside) return;

		this.parent.storeState();

		let leaving = this.checkContainer(dir);

		if (newPosition in this.parent.level) {
			let newContainer = this.parent.level[newPosition];

			let shape = leaving.compareShapes(newContainer);

			if ((newContainer.size < leaving.size) && dir === newContainer.dir && shape) {
				if (newContainer.contains) {
					if ((newContainer.contains.size < leaving.size) && dir === newContainer.contains.dir) {
						if (!leaving.container) delete this.parent.level[[this.x, this.y]];
						leaving.leaveContainer();
						leaving.container = newContainer.contains;
						leaving.container.contains = leaving;
						leaving.move(newPosition);
					}
				} else {
					if (!leaving.container) delete this.parent.level[[this.x, this.y]];
					leaving.leaveContainer();
					leaving.container = newContainer;
					leaving.container.contains = leaving;
					leaving.move(newPosition);
				}
			}
		} else {
			if (!leaving.container) delete this.parent.level[[this.x, this.y]];
			leaving.leaveContainer();
			leaving.move(newPosition);
		}

		if (this.container) {
			if (this.container.container) {
				if (this.container.col) {
					if(this.container.container.col === this.container.col) this.parent.solved = true;
					else if(this.container.container.col === 4){
						if(this.container.col === 1 || this.container.col === 3) this.parent.solved = true;
					} else if(this.container.container.col === 5){
						if(this.container.col === 2 || this.container.col === 3) this.parent.solved = true;
					} else if(this.container.container.col === 6){
						if(this.container.col === 1 || this.container.col === 2) this.parent.solved = true;
					}
				}
			}
		}
	}

	render() {
		ctx.drawImage(this.image, this.x * this.parent.size + this.parent.offsetLeft, this.y * this.parent.size + this.parent.offsetTop, this.parent.size, this.parent.size);
	}
}