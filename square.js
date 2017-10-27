function Square(x, y, size) {
  this.rect = new paper.Path.Rectangle(x, y, size, size);
  this.rect.strokeColor = 'black';

  this.setColor = (color) => {
    this.rect.fillColor = color;
  }
}
