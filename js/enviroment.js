// Images variables
let background1;
let background2;
let platformImg;
let cloudsImg;
let rockImg;
let treeImg;
let GroundImg;

// Global variables
let frameCounter = 0;
let coinSpeed = 16;
let collectables;
let enemyContact;
let mountains1;  
let mountains;
let platforms;
let gameScore;
let flagPole;
let enemies;
let canyons;
let clouds;
let lives;
let stars;
let rocks;
let signs;
let rock;
let moon;

// Position related variables
let mountainsCameraX;
let mountains1CameraX; 
let cameraX; 
let groundX;
let floorY;  
let treesY;
let treesX;
let moonImg;
let coinImg1;
let coinImg2;
let coinImg3;
let coinImg4;
let coinAnimation;
let treasureClose;
let treasureOpen;
let canyonImg;
let ringImg;
let signImg;
let bushImg;
let flag;
let flagPoleImg;
let huDisplayImg;
let welcomeSong;
let welcomeImage;
let welcome = true;

function loadEnvironment() {

	// Load sound
	welcomeSong = loadSound("./assets/snd/welcomeSong.wav"); 
	welcomeSong.setVolume(0.5);

	backgroundSound = loadSound("./assets/snd/backgroundSound.wav");
	backgroundSound.setVolume(0.1);

	collectableSound = loadSound("./assets/snd/coinSound.mp3"); // Author: Bradwesson (Freesound)
	easterEggSound   = loadSound("./assets/snd/easterEggSound.mp3"); // Author: Wagna (Freesound)

	// Load images
	welcomeImage  = loadImage("./assets/img/welcomeImage.png");
	background1   = loadImage("./assets/img/environment/background.png")
	background2   = loadImage("./assets/img/environment/background-front.png");
	platformImg   = loadImage("./assets/img/environment/platform.png");
	cloudsImg 	  = loadImage("./assets/img/environment/cloud.png");
	rockImg 	  = loadImage("./assets/img/environment/rock.png");
	treeImg 	  = loadImage("./assets/img/environment/tree.png");
	groundImg 	  = loadImage("./assets/img/environment/my-ground.png");
	moonImg 	  = loadImage("./assets/img/environment/moon.png");
	treasureClose = loadImage("./assets/img/environment/treasure-chest1.png");
	treasureOpen  = loadImage("./assets/img/environment/treasure-chest2.png");
	ringImg 	  = loadImage("./assets/img/environment/ring.png");
	signImg 	  = loadImage("./assets/img/environment/sign.png");
	canyonImg 	  = loadImage("./assets/img/environment/canyon.png");
	flag 	      = loadImage("./assets/img/environment/flag.png");
	flagPoleImg   = loadImage("./assets/img/environment/flag-pole.png");
	bushImg 	  = loadImage("./assets/img/environment/bush.png");
	huDisplayImg  = loadImage("./assets/img/character/hu-display.png");


	// collectable animation images
	coinImg1 = loadImage("./assets/img/environment/coin1.png");
	coinImg2 = loadImage("./assets/img/environment/coin2.png");
	coinImg3 = loadImage("./assets/img/environment/coin3.png");
	coinImg4 = loadImage("./assets/img/environment/coin4.png");

}

function drawBackground() {
	for (let i = 0; i <= 8; i++){
		image(background1, -1024 + 1024*i, 0, 1024, 630);

		push();
		translate(-mountainsCameraX,0); // translate the x position to create the movement effect
		image(background2, -1024 + 1024*i, 0, 1024, 630);
		pop();
	}
}

function titleScreen() {
	// Welcome Image
	if(welcome) { // Display the title Screen
		image(welcomeImage, 0, 0,width, height);
		// Title
		push();
		stroke(0);
		fill(200);
		textSize(90);
		strokeWeight(8);
		textAlign(CENTER)
		textFont('Times New Roman');
		text("The Nightfall Adventure", width/2, 140);

		textSize(35);
		text("The journey to return the light to the world", width /2, 190);
		

		// Start Game 
		textSize(60);
		strokeWeight(8);
		fill(185,165,120);
		text("Press enter to begin the adventure", width / 2, 520 );
		pop();

		if(welcome) { // Plays the title screen music
		if(!welcomeSong.isPlaying()) {
		welcomeSong.play();
		userStartAudio()
		}
	}
	} 

	if(!welcome && !backgroundSound.isPlaying()) { // Play the background Music
		backgroundSound.play();	
	}
}

function drawGround() {
	// Draw the Ground
	for(var i = 0; i < 64; i++) {
		image(groundImg, -128 + 192*i, floorY, 192,50)
	}
}

function drawMoon() {
	image(moonImg, moon.x, moon.y, moon.diameter, moon.diameter);
}


function drawBushes() { 
	for(var i = 0; i < bushes.length; i++) {
		image(bushImg, bushes[i].x, bushes[i].y, 150, 75);
	}
	
}

function   drawClouds() {
	// Draw the clouds in the sky
	for(var i = 0; i < clouds.length; i++) {
		image(cloudsImg, clouds[i].x, clouds[i].y, clouds[i].diameter, clouds[i].diameter);
		// Move the clouds			
		clouds[i].x += 0.1; 	
	}

}

function drawRock() {		
// Draw the rocks
	noStroke();
	for(let i = 0; i < rock.x.length; i++) {
		image(rockImg, rock.x[i], rock.y - 80, 100,75)
	}
}

function drawTrees() {
	// Draw the trees
	for(var i = 0; i < treesX.length; i++) {
		image(treeImg, treesX[i], treesY, 360, 281);
	}
}

function createPlatforms(x, y, length) {
	let p = {
		x: x,
		y: y,
		length: length,
		// Draw the platforms
		draw: function() {
			image(platformImg, this.x, this.y-15, length, length/3)

		},
		checkContact: function(gcX, gcY) { 
			// Check if the game character is on the platform
			if(gcX > this.x && gcX < this.x + this.length) { 
				let d = this.y - gcY;
				if(d >= -5 && d <= 0) {
					return true;
				}
			}
			return false;
		}
	}
	return p;
}

function drawCollectable(tCollectable) {
	// Draw the collectables 
	for(let i = 0; i < tCollectable.length; i ++) {
		if( !tCollectable[i].isFound) {
			coinAnimation.update(tCollectable[i].x, tCollectable[i].y);
			coinAnimation.draw(tCollectable[i].size, tCollectable[i].size);
		} 
	}
}

function drawCanyon(tCanyon) {
	// Draw the canyons
	for(let i = 0; i < tCanyon.length; i++) {
		image(canyonImg, tCanyon[i].x, floorY, tCanyon[i].width, 50)
	}
}

function drawFlagpole() {
	// Draw the flagpole
	image(flagPoleImg, flagPole.x , floorY - flagPole.sizeY, flagPole.sizeX, flagPole.sizeY);


	// Flag
	const size = 90;
	image(flag, flagPole.x - 40 , flagPole.y, size, size);
	

	// Check if the flag is reached
	checkFlagpole();
}

let treasureSoundPlayed = false;
function drawTreasureChest() {
	push();
	if(!treasureChest.isFound) { // Draw the treasure chest
		image(treasureClose, 
			  treasureChest.x, treasureChest.y, 
			  treasureChest.size, treasureChest.size);
	}
	if(treasureChest.isFound) { // Draw the treasure chest open
		image(treasureOpen, 
			  treasureChest.x, treasureChest.y, 
			  treasureChest.size, treasureChest.size);
	}
	if(treasureChest.isFound && !treasureChest.easterEgg) { // Draw the an extra collectable
		image(ringImg, 
			treasureChest.x + 40, treasureChest.y + 20, 
			treasureChest.size / 4, treasureChest.size / 4);
	}	
	if(treasureChest.easterEgg) { // Display text if the collectable is collected
		fill(255);
		textSize(25);
		textFont(pixelFont);
		text("1UP", treasureChest.x, floorY -200);
	}
	pop();
	
	if(gameCharX <= -280 && gameCharY <= floorY - 95) { // Open the treasure chest
		treasureChest.isFound = true;		

		if(!treasureSoundPlayed && !treasureChestSound.isPlaying()) { 
			  treasureChestSound.play();
			  treasureSoundPlayed = true
		}
	}
	
}

function Sign(x, y, size, tx, tx1, tx2) {
	// Variables
	this.x = x;
	this.y = y;
	this.tx = tx;
	this.tx1 = tx1;
	this.tx2 = tx2;
	this.size = size;

	this.draw = function() {
		image(signImg, this.x, this.y, this.size, this.size);	

		// Add text to the sign 
		push();
		fill(0);	
		noStroke();	
		textSize(10);
		textFont(pixelFont);
		text(tx, this.x + 6, this.y + 13);	
		text(tx1, this.x + 6, this.y + 28);	
		text(tx2, this.x + 6, this.y + 43);	
		pop();
	}
}