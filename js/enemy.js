let enemyRight1;
let enemyRight2;
let enemyRight3;
let enemyRight4;
let enemyWalkingRight;
let enemyLeft1;
let enemyLeft2;
let enemyLeft3;
let enemyLeft4;
let enemyWalkingLeft;
let enemyDying;


function loadEnemy() {

	// Enemy sound
	OrcSound = loadSound("./assets/snd/Orc.mp3");
	
	// Walking right animation images
	enemyRight1 = loadImage("./assets/img/enemy/enemy-right1.png");
	enemyRight2 = loadImage("./assets/img/enemy/enemy-right2.png");
	enemyRight3 = loadImage("./assets/img/enemy/enemy-right3.png");
	enemyRight4 = loadImage("./assets/img/enemy/enemy-right4.png");

	// Walking left animations images
	enemyLeft1 = loadImage("./assets/img/enemy/enemy-left1.png");
	enemyLeft2 = loadImage("./assets/img/enemy/enemy-left2.png");
	enemyLeft3 = loadImage("./assets/img/enemy/enemy-left3.png");
	enemyLeft4 = loadImage("./assets/img/enemy/enemy-left4.png");
	enemyDying = loadImage("./assets/img/enemy/enemy-dying.png");
}

function Enemy(x, y, range, isDead, isRight, isLeft) {
	// variables
	this.x = x;
	this.y = y;
	this.range = range;
	this.isDead = isDead,
	this.isRight = isRight
	this.isLeft = isLeft
	this.currentX = x;
	this.inc = 1;

	this.update = function(){ // Checks the X position of the enemies
		this.currentX += this.inc;
		if(this.currentX >= this.x + this.range) { // Creates a range for the enemies
			this.isRight = false;
			this.isLeft = true;
			this.inc = -1.5;
		} else if(this.currentX < this.x) {
			this.isLeft = false;
			this.isRight = true
			this.inc = 1.5;
		} 	
}

	this.draw = function() { // Draw the enemy
		this.update();
		if(this.isLeft) {
			enemyWalkingLeft.update(this.currentX, this.y - 90);
			enemyWalkingLeft.draw(95, 95);
		}
		if(this.isRight){
			enemyWalkingRight.update(this.currentX, this.y - 90);
			enemyWalkingRight.draw(95, 95);
		}
		if(this.isDead){ // Turn the enemy red wen it dies
			this.isRight = false;
			this.isLeft = false;
			image(enemyDying, this.currentX, this.y - 90, 90, 90 )
		}
	}

	this.checkEnemyDead = function(gcX, gcY) { // Check if the enemy has die
		let fight = dist(this.currentX, this.y, gcX, gcY)
		if((fight <= 40 && fightingRight) || (fight <= 80 && fightingLeft)) {
			this.isDead = true;
			if(!OrcSound.isPlaying()) { // Play the enemy dying sound
				OrcSound.play();
			}
		}
		if(this.isDead) { // Move the enemy out of the screen
			this.inc = 0;
			this.y += 3;
		}
	}
	this.checkContact = function(gcX, gcY) { // Check if the game character touch the enemy 
		let contactRight = false;
		let contactLeft = false;
		let contactAbove = false;

		if(dist(gcX, gcY, this.currentX + 20, this.y) < 15) {
			contactRight = true;
		} else if (dist(gcX-70, gcY, this.currentX, this.y) < 8) {
			contactLeft = true;
		} else if (dist(gcX, gcY, this.currentX +35, this.y-65) < 20) {
			contactAbove = true;
		}
		
		if(contactRight || contactLeft ||contactAbove) {
			return true;
		}
	} 
	return false;
}