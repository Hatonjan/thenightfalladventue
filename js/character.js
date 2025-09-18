// Character global variables
let gameCharX;   
let gameCharY; 
let char;
let charRight1; 
let charRight2; 
let charRight3; 
let charRight4;
let walkingRight; 
let charLeft1;
let charLeft2;
let charLeft3;
let charLeft4;
let walkingLeft
let jumpRight1;
let jumpRight2;
let jumpRight3;
let jumpRight4;
let JumpingRight;
let jumpLeft1;
let jumpLeft2;
let jumpLeft3;
let jumpLeft4;
let JumpingLeft;
let charFalling1;
let charFalling2;
let fallingAnimation;
let charDying;
let fittingRight1;
let fittingRight2;
let fittingRight3;
let fittingRight4;
let fittingRightAnimation;
let fittingLeft1;
let fittingLeft2;
let fittingLeft3;
let fittingLeft4;
let fittingLeftAnimation;

function loadCharacter() {
	// Character related sound
	fightingSound = loadSound("./assets/snd/fightingSound.wav");
	fightingSound.setVolume(0.2)
	jumpSound = loadSound("./assets/snd/jump.mp3"); // Author: Bastianhallo (Freesound)
	jumpSound.setVolume(0.5); 

	// Frond facing image
	char = loadImage("./assets/img/character/game-char.png");
	charDying = loadImage("./assets/img/character/char-dying.png");

	// Walking right animation images
	charRight1 = loadImage("./assets/img/character/game-char-right1.png");
	charRight2 = loadImage("./assets/img/character/game-char-right2.png");
	charRight3 = loadImage("./assets/img/character/game-char-right3.png");
	charRight4 = loadImage("./assets/img/character/game-char-right4.png");

	// Walking left animations images
	charLeft1 = loadImage("./assets/img/character/game-char-left1.png");
	charLeft2 = loadImage("./assets/img/character/game-char-left2.png");
	charLeft3 = loadImage("./assets/img/character/game-char-left3.png");
	charLeft4 = loadImage("./assets/img/character/game-char-left4.png");

	// Jumping Right animations images
	jumpRight1 = loadImage("./assets/img/character/jump-right1.png");
	jumpRight2 = loadImage("./assets/img/character/jump-right2.png");
	jumpRight3 = loadImage("./assets/img/character/jump-right3.png");
	jumpRight4 = loadImage("./assets/img/character/jump-right4.png");

	// Jumping left animations images
	jumpLeft1 = loadImage("./assets/img/character/jump-left1.png");
	jumpLeft2 = loadImage("./assets/img/character/jump-left2.png");
	jumpLeft3 = loadImage("./assets/img/character/jump-left3.png");
	jumpLeft4 = loadImage("./assets/img/character/jump-left4.png");

	// falling animation
	charFalling1 = loadImage("./assets/img/character/char-falling1.png");
	charFalling2 = loadImage("./assets/img/character/char-falling2.png");

	// fitting right animations images
	fittingRight1 = loadImage("./assets/img/character/fitting-right1.png");
	fittingRight2 = loadImage("./assets/img/character/fitting-right2.png");
	fittingRight3 = loadImage("./assets/img/character/fitting-right3.png");
	fittingRight4 = loadImage("./assets/img/character/fitting-right4.png");

	// fitting left animations images
	fittingLeft1 = loadImage("./assets/img/character/fitting-left1.png");
	fittingLeft2 = loadImage("./assets/img/character/fitting-left2.png");
	fittingLeft3 = loadImage("./assets/img/character/fitting-left3.png");
	fittingLeft4 = loadImage("./assets/img/character/fitting-left4.png");
}

function drawJumpingLeft() {
	JumpingLeft.update(gameCharX - 32, gameCharY - 75);
	JumpingLeft.draw(85, 85);
}

function drawJumpingRight() {
	JumpingRight.update(gameCharX - 22, gameCharY - 75);
	JumpingRight.draw(85, 85);
}

function drawWalkingLeft() {
	walkingLeft.update(gameCharX - 22, gameCharY - 75);
	walkingLeft.draw(75, 75);
	
}

function drawWalkingRight() {
	walkingRight.update(gameCharX - 22, gameCharY - 75);
	walkingRight.draw(75, 75);
}

function drawJumpingForwards() {
	if(lostFight) {
		image(charDying, gameCharX - 22, gameCharY - 75, 55, 75);
	} else {	
		fallingAnimation.update(gameCharX - 22, gameCharY - 75);
		fallingAnimation.draw(55,75);
	} 
}

function drawFrontFacing() {
	image(char, gameCharX - 22, gameCharY - 75, 50, 75);
}

function drawFightingRight() {
		fittingRightAnimation.update(gameCharX - 12, gameCharY - 90);
		fittingRightAnimation.draw(90,90);
}

function drawFightingLeft() {
	fittingLeftAnimation.update(gameCharX - 12, gameCharY - 90);
	fittingLeftAnimation.draw(90,90);
}