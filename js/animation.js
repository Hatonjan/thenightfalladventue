class Animation {
  constructor(x, y, speed, first, second, third, fourth) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.first = first;   
    this.second = second; 
    this.third = third; 
    this.fourth = fourth;
    this.frames = 0;
    this.state = 0;
    this.animation = false;
  }

  update(newX, newY) {
    this.frames++;
    if (this.frames >= this.speed) {
      this.state = (this.state + 1) % 4;
      this.frames = 0;
    }
    this.x = newX
    this.y = newY

  }

  draw(sizeX, sizeY) {
    if (this.state === 0) {
      image(this.first, this.x, this.y, sizeX, sizeY);
    } else if (this.state === 1) {
      image(this.second, this.x, this.y, sizeX, sizeY);
    } else if (this.state === 2) {
        image(this.third, this.x, this.y, sizeX, sizeY);
    } else if (this.state === 3) {
      if (!this.animation) {
        image(this.fourth, this.x, this.y, sizeX, sizeY);
      }
    }
  }
}