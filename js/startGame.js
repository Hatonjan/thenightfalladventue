function startGame() {
	// Variables Initialization   
	gameCharY = height - 48;      
	treesY  = floorY - 280;
	mountains1CameraX = 0;
	gameCharX = width / 3;   
	mountainsCameraX = 0;
	cameraX = 0;
	gameScore = 0;

	// Boolean Variables
	fightingRight = false;
	isPlummeting = false; 
	gameChar_die = false;
	fightingLeft = false;
	lostFight = false;
	isFalling = false;
	isRight = false;
	isLeft = false;
	coin = true;
	
	// Objects Initialization
	treasureChest = {
		x: -430,
		y: floorY - 180,
		size: 80,
		isFound: false,
		easterEgg: false		
	};
	moon = {
		x: 150,
		y: 50,
		diameter: 70
	};
	rock = {
		x: [-126, 892, 1534, 2226, 2828, 3400, 3888, 5330],
		y: floorY + 15,
	};	
	flagPole = {
		x: 6500,
		y: floorY - 90,
		sizeX:10,
		sizeY:340,
		isReached: false	
	};	
	// Arrays Initialization
	treesX = [-126, 360, 892, 1534, 2226, 2640, 3228, 3558, 3888, 5330, 5868];

	collectables = [ 
		{x:  170, y: floorY -  30, size: 25, isFound: false},
		{x:  210, y: floorY -  30, size: 25, isFound: false},
		{x:  250, y: floorY -  30, size: 25, isFound: false},
		{x: 1090, y: floorY - 130, size: 25, isFound: false},
		{x: 1130, y: floorY - 130, size: 25, isFound: false},
		{x: 1170, y: floorY - 130, size: 25, isFound: false},
		{x: 1210, y: floorY - 130, size: 25, isFound: false},
		{x: 1460, y: floorY - 240, size: 25, isFound: false},
		{x: 1510, y: floorY - 290, size: 25, isFound: false},
		{x: 1550, y: floorY - 300, size: 25, isFound: false},
		{x: 1590, y: floorY - 300, size: 25, isFound: false},
		{x: 1630, y: floorY - 290, size: 25, isFound: false},
		{x: 1680, y: floorY - 240, size: 25, isFound: false},
		{x: 2300, y: floorY -  30, size: 25, isFound: false},
		{x: 2520, y: floorY -  30, size: 25, isFound: false},
		{x: 2900, y: floorY -  30, size: 25, isFound: false},
		{x: 2940, y: floorY -  30, size: 25, isFound: false},
		{x: 2980, y: floorY -  30, size: 25, isFound: false},
		{x: 3020, y: floorY -  30, size: 25, isFound: false},
		{x: 3710, y: floorY -  40, size: 25, isFound: false},
		{x: 3750, y: floorY -  90, size: 25, isFound: false},
		{x: 3790, y: floorY - 110, size: 25, isFound: false},
		{x: 3830, y: floorY - 110, size: 25, isFound: false},
		{x: 3870, y: floorY -  90, size: 25, isFound: false},
		{x: 3910, y: floorY -  40, size: 25, isFound: false},
		{x: 4540, y: floorY - 230, size: 25, isFound: false},
		{x: 4580, y: floorY - 230, size: 25, isFound: false},
		{x: 4620, y: floorY - 230, size: 25, isFound: false},
		{x: 4660, y: floorY - 230, size: 25, isFound: false},
		{x: 4700, y: floorY - 230, size: 25, isFound: false},
		{x: 4740, y: floorY - 230, size: 25, isFound: false},
		{x: 4780, y: floorY - 230, size: 25, isFound: false}
	];

	// Initialize the collectable animation
	coinAnimation  = new Animation(collectables.x, collectables.y, 256, coinImg1, coinImg2, coinImg3, coinImg4);
	
	clouds = [
		{x:-620, y:100, diameter: 200}, {x:-260, y: 80, diameter: 200}, 
		{x:   0, y:100, diameter: 200}, {x: 260, y: 80, diameter: 200}, 
		{x: 520, y:120, diameter: 200}, {x: 780, y: 60, diameter: 200},
		{x:1000, y:100, diameter: 200}, {x:1260, y: 80, diameter: 200}, 
		{x:1520, y:120, diameter: 200}, {x:1780, y: 60, diameter: 200},
		{x:2000, y:100, diameter: 200}, {x:2260, y: 80, diameter: 200}, 
		{x:2520, y:120, diameter: 200}, {x:2780, y: 60, diameter: 200},
		{x:3000, y:100, diameter: 200}, {x:3260, y: 80, diameter: 200}, 
		{x:3520, y:120, diameter: 200}, {x:3780, y: 60, diameter: 200},
		{x:4000, y:100, diameter: 200}, {x:4260, y: 80, diameter: 200}, 
		{x:4520, y:120, diameter: 200}, {x:4780, y: 60, diameter: 200},
		{x:5000, y:100, diameter: 200}, {x:5260, y: 80, diameter: 200}, 
		{x:5520, y:120, diameter: 200}, {x:5780, y: 60, diameter: 200},
		{x:6000, y:100, diameter: 200}, {x:6260, y: 80, diameter: 200}, 
		{x:6520, y:120, diameter: 200}, {x:6780, y: 60, diameter: 200},
	];
	bushes = [
		{x:   50, y: floorY - 75}, {x:  740, y: floorY - 75}, 
		{x: 1250, y: floorY - 75}, {x: 1850, y: floorY - 75}, 
		{x: 2450, y: floorY - 75}, {x: 3050, y: floorY - 75}, 
		{x: 3650, y: floorY - 75}, {x: 5450, y: floorY - 75},
		{x: 6050, y: floorY - 75}, {x: 6650, y: floorY - 75}
	];
	canyons = [
		{x:  600, width: 150},
		{x: 2075, width: 150},
		{x: 2600, width: 150},
		{x: 3200, width: 150},
		{x: 4130, width: 1150},
	];

	platforms = [];
	enemies = [];
	rocks = [];
	signs = [];

	/* The platforms and enemies were created whit the help of the lectures from topic 10 */
	// Generate the platforms 
	platforms.push(createPlatforms(-420, floorY - 100, 200));
	platforms.push(createPlatforms(1055, floorY - 100, 200));
	platforms.push(createPlatforms(1305, floorY - 200, 200));
	platforms.push(createPlatforms(1655, floorY - 200, 200));
	platforms.push(createPlatforms(4180, floorY - 100, 200));
	platforms.push(createPlatforms(4430, floorY - 200, 200));
	platforms.push(createPlatforms(4580, floorY - 200, 200));
	platforms.push(createPlatforms(4730, floorY - 200, 200));
	platforms.push(createPlatforms(5030, floorY - 100, 200));

	// Generate the enemies
	enemies.push(new Enemy(-400, floorY -  98, 110, false, false, false));
	enemies.push(new Enemy(1100, floorY		 , 200, false, false, false));
	enemies.push(new Enemy(1665, floorY		 , 300, false, false, false));
	enemies.push(new Enemy(2275, floorY      , 300, false, false, false));
	enemies.push(new Enemy(3668, floorY      , 250, false, false, false));
	enemies.push(new Enemy(4475, floorY - 198, 375, false, false, false));
	enemies.push(new Enemy(5860, floorY      , 300, false, false, false));
	enemies.push(new Enemy(5300, floorY      , 400, false, false, false));

	// Initialize enemy walking animations
	enemyWalkingLeft  = new Animation(0, floorY, 32, enemyLeft1 , enemyLeft2 , enemyLeft3 , enemyLeft4 );
	enemyWalkingRight = new Animation(0, floorY, 32, enemyRight1, enemyRight2, enemyRight3, enemyRight4);

	// Generate the Signs
	signs.push(new Sign(-150, floorY - 80, 80,
		'    Left key     ', 
		'   Strike Left  '
	));
	signs.push(new Sign(475, floorY - 90, 90, 
		'a = Move Left', 
		'd = Move Right', 
		'w = Jump'
	));
	signs.push(new Sign(920, floorY - 80, 80, 
		'    Right key     ', 
		'   Strike Right  '
	));
	// Generate the rocks
	for (let i = 0; i < 10; i++) { 
        rocks.push({ x: 50 + 760*i, y: floorY});
	};

	// Initialize the character animations
	walkingRight 	       = new Animation(gameCharX, gameCharY, 6, charRight1   , charRight2   , charRight3   , charRight4   );
	walkingLeft  	       = new Animation(gameCharX, gameCharY, 6, charLeft1    , charLeft2    , charLeft3    , charLeft4    );
	JumpingRight 	       = new Animation(gameCharX, gameCharY, 9, jumpRight1   , jumpRight2   , jumpRight3   , jumpRight4   );
	JumpingLeft  	       = new Animation(gameCharX, gameCharY, 9, jumpLeft1    , jumpLeft2    , jumpLeft3    , jumpLeft4    );
	fallingAnimation       = new Animation(gameCharX, gameCharY, 9, charFalling1 , charFalling2 , charFalling1 , charFalling2 );
	fittingLeftAnimation   = new Animation(gameCharX, gameCharY, 3, fittingLeft1 , fittingLeft2 , fittingLeft3 , fittingLeft4 );	 
	fittingRightAnimation  = new Animation(gameCharX, gameCharY, 3, fittingRight1, fittingRight2, fittingRight3, fittingRight4);
	buttonPressed          = new Animation(gameCharX, gameCharY, 24, F5button1   ,     F5button2,     F5button1,     F5button2);
	enterButtonPressed     = new Animation(gameCharX, gameCharY, 24, enterButton1,  enterButton2, enterButton1,  enterButton2,);
}