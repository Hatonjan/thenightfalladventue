// Globals
let pixelFont;

function preload() {  
	// Sound formats
	soundFormats('mp3','wav', 'm4a');  
	
	// Load the font
	pixelFont = loadFont("./assets/fonts/Pixelify_Sans/PixelifySans-VariableFont_wght.ttf")
	
	// Preload the character images
	loadCharacter();

	// Preload the environment
	loadEnvironment();

	// preload the enemy images
	loadEnemy();

	// Preload the F5 button images
	loadButtons();
}
 
function setup() {   
	createCanvas(1024, 576);   
	floorY = height - 50;  
	lives = 3;
	startGame();
	flagPole.isReached = false;
}

function draw() {   
	// Follow the character while moving
	cameraEffect();

	// Beginning the following camera effect
	push();
	translate(-cameraX,0); 
	drawBackground();

	// The Moon
	drawMoon();

	// Draw the Ground
	drawGround(); 
	
	// Clouds
	drawClouds();

	// Trees
	drawTrees(); 

	// Draw the rocks
	drawRock();

	// Bushes
	drawBushes();

	// Platform
	for(let i = 0; i < platforms.length; i++) {
		platforms[i].draw();
	}

	// Collectable Item 
	drawCollectable(collectables);
	
	// Draw The Canyon 
	drawCanyon(canyons);
	
	// Draw Flag Pole 
	drawFlagpole();

	// treasureChest
	drawTreasureChest();

	// Draw enemies
	enemyInteractions(); 

	// Draw the controls Display
	for(let i = 0; i < signs.length; i++) {
		signs[i].draw();
	}
	
	// Check player lives
	checkPlayerDie();

	// Hands Up Display
	huDisplay(); 

	// Draw the Game Character
	if(isLeft && (isFalling && gameCharY < floorY)) { // Jumping-left 
		drawJumpingLeft();
	} else if(isRight && (isFalling && gameCharY < floorY)) { // Jumping Right
		drawJumpingRight();
	} else if(isLeft) {  // Walking left
		drawWalkingLeft();
	} else if(isRight) {  // Walking right  
		drawWalkingRight();
	} else if(isFalling || isPlummeting) {  // Jumping facing forwards  
		drawJumpingForwards();			 
	} else if(fightingRight) {// Fighting facing right
		drawFightingRight(); 
	} else if(fightingLeft) {// Fighting facing left
		drawFightingLeft();
	} else {  
		drawFrontFacing(); // Standing front facing
	}
	// End of the following camera effect
	pop();

	// Character interactions 
	characterInteractions();
	
	// Title screen 
	titleScreen();
}
 
function keyPressed() {   

	// Controls the animation of the character when keys are pressed.
	if(isPlummeting || flagPole.isReached) {
		return; // Exit the function
	}
	if (key === "a" ) { // Moving to the left
		isLeft = true;	 
	} else if (key === "d") { // Moving to the right
		isRight = true; 
	} else if (key === "w" && !isFalling) { // Jump
		gameCharY -= 180;	
		jumpSound.play();
	} else if(keyCode === 39) { // Fight facing right
		fightingRight = true;
		isRight = false; 
		fightingSound.play();
	} else if(keyCode === 37) { // Fight facing left
		fightingLeft = true;
		isLeft = false; 
		fightingSound.play();
	} else {  
		isFalling = true;
	}
	
	// Initialize the game
	if(key){
		welcome = false;
		welcomeSong.stop();
	}
}

function keyReleased() {   
	// Controls the animation of the character when keys are released.
	if(key === 'a') { // Stop moving left
		isLeft = false;		
	} else if(key === 'd') { // Stop moving left
		isRight = false;
	} else if (key === "w") { // Start falling
		isFalling = true;
	} else if(keyCode === 39) { // Stop fighting right
		fightingRight = false;
	} else if(keyCode === 37) { // Stop fighting left
		fightingLeft = false;
	} 
}
