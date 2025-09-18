// Boolean variables
let buttonPressed;
let fightingRight;
let fightingLeft;
let gameChar_die;
let isPlummeting;
let lostFight;
let isFalling;
let isRight;
let isLeft;

// Sound variables
let treasureChestSound;
let collectableSound;
let backgroundSound;
let easterEggSound;
let fightingSound;   
let gameOverSound;
let victorySound;
let jumpSound;
let OrcSound;

let F5button1;
let F5button2;



function loadButtons() {
	
	gameOverSound = loadSound("./assets/snd/gameOverSound.m4a");
	gameOverSound.setVolume(0.1);
	
	victorySound = loadSound("./assets/snd/victorySound.wav");
	victorySound.setVolume(0.5);

	treasureChestSound = loadSound("./assets/snd/chestSound.m4a");
	treasureChestSound.setVolume(0.5);

	F5button1 = loadImage("./assets/img/environment/F5-button1.png")
	F5button2 = loadImage("./assets/img/environment/F5-button2.png")
}

function cameraEffect() {
	if(isRight){
		cameraX += 4.5;
		mountainsCameraX += .18;
		mountains1CameraX += .13;
	}
	if(isLeft) {
		cameraX -= 4.5;
		mountainsCameraX -= .1;
		mountains1CameraX -= .05;
	}
}

function characterInteractions() {
	//Conditional statements to move the game character 
	if(gameCharY < floorY) { 
		var platformContact = false;
		for(let i = 0; i < platforms.length; i++) {
			if(platforms[i].checkContact(gameCharX, gameCharY)) { // Check contact with the platforms
				platformContact = true;
				break; 
			}	
		}
		if(!platformContact) { // Creates Gravity
			gameCharY += 3.9;
			isFalling = true;
		}  

	} else {
		isFalling = false; // Stop falling
	}
	if(isPlummeting) { // Freezing controls
		isRight = false;
		isLeft  = false;
		gameCharY += 6; // Plummeting
		backgroundSound.stop()
	} 
	if(isLeft) { // Moving to the left
		gameCharX -= 4.5;
		moon.x -= 2;
	} else {
		isLeft = false;
	}
	if(isRight) { // Moving to the right
		gameCharX += 4.5;
		moon.x += 2;
	} else {
		isRight = false;
	}
	if(gameCharY < floorY - 150) { // Falling
		isFalling = true;
	} 
	if(platformContact) { // Allows the character to walk on top pf the platforms
		isFalling = false;
	}
	// Falling down the canyon
	for(let i = 0; i < canyons.length; i++) {
		checkCanyon(canyons[i]);
	}
	// Collect the coin
	for(let i = 0; i < collectables.length; i ++) {
		checkCollectable(collectables[i]);
	}	
}

function enemyInteractions() {
	for(let i = 0; i < enemies.length; i++) {
		enemies[i].draw();
		enemyContact = enemies[i].checkContact(gameCharX, gameCharY);

		if(enemyContact){ // Check if the game character lost the fight 
			gameCharY -= 10;
			isPlummeting = true;
			lostFight = true;
		}
		if(enemies[i].checkEnemyDead(gameCharX, gameCharY)) { // Check if the enemy lost the fight
			enemies[i].isDead = true;
		}
	}
}

function checkCollectable(tCollectable) {
	// Collect the coin
	let d = dist(gameCharX, gameCharY, tCollectable.x, tCollectable.y,) <= 50
	if(!tCollectable.isFound && d) { 
			collectableSound.play();
		tCollectable.isFound = true; // collectable interaction
		gameScore += 1;
	}
	// Collects the Easter egg
	if(treasureChest.isFound  && !treasureChest.easterEgg && 
		treasureChest.x > gameCharX - 70) { 
		lives += 1;
		easterEggSound.play();
		treasureChest.easterEgg = true; // Easter Egg interaction
	}
}

function checkCanyon(tCanyon){
	// Falling down the canyon
	if((gameCharX > tCanyon.x + 15 &&
		gameCharX < tCanyon.x + tCanyon.width - 15 &&
		gameCharY >= floorY) || 
		gameCharX < - 150 && gameCharY >= floorY) {
		isPlummeting = true;
	}
}

// Global variable to stoop the sound Loop
let victorySoundPlayed = false;
function checkFlagpole() {
	
	//Check if the flagpole is reached
	if(gameCharX > flagPole.x) {
		flagPole.isReached = true
	}
	if(flagPole.isReached) { // Rase the flag and play the victory music
		flagPole.y = 200;
		backgroundSound.stop()
		isRight = false;
		fill(200);
		textSize(60); // Display text if flagpole is reached
		textFont(pixelFont);
		text("Level 1 Completed", flagPole.x - 176, 340); 
		if(!victorySoundPlayed && !victorySound.isPlaying()) { // Play the end of course sound
			victorySound.play();	
			victorySoundPlayed = true;
		}
	} 
}

let gameOverSoundPlayed = false;
function checkPlayerDie() {
	// Keep count of the game character lives 
	if(!gameChar_die && gameCharY >= floorY + 130 && lives > 0) {
			lives -= 1;
			gameChar_die = true; 
	}
	 
	if((gameChar_die && lives >= 1)) { // Restart the game if the lives are grater than 1
		startGame();
	}

	if(lives == 0 && gameChar_die) { // Display game over to the screen if lives = 0
		fill(200);
		textSize(60);
		textFont(pixelFont);
		text("Game Over", cameraX + 330, height/2);
		backgroundSound.stop();
		if(!gameOverSoundPlayed && !gameOverSound.isPlaying()) { // Play game over sound
			gameOverSound.play();
			gameOverSoundPlayed = true;
		} 
	}

	if(gameOverSoundPlayed) {
		textSize(30);
		text("Press F5 To reload the game", cameraX + 270, floorY - 180);
		buttonPressed.update(cameraX + 370, floorY - 200)
		buttonPressed.draw(200,200)
	}
} 