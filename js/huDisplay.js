function huDisplay() {
	// Collectable Score
	image(coinImg1, width - 65 + cameraX, 9, 16, 16);

	fill(255); // Display the X
	textSize(15);
	textFont(pixelFont);
	text('x '+ gameScore, width - 45 + cameraX, 21);

	// Character head image
	image(huDisplayImg, width - 140 + cameraX, 9, 15,15);

	// Draw the easter egg wen collected
	if(treasureChest.easterEgg){
		image(ringImg, width - 180 + cameraX, 8, 16, 16)
	}

	textFont(pixelFont);
	text('x '+ lives, width - 120 + cameraX, 21); // Display the X
}