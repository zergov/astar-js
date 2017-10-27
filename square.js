function Square(x, y, size) {
  this.x = x;
  this.y = y;
  this.rect = new paper.Path.Rectangle(x * size, y * size, size, size);
  this.rect.strokeColor = 'black';

  this.setColor = (color) => {
    this.rect.fillColor = color;
  }
}
