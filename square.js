function Square(x, y, size) {
  this.x = x;
  this.y = y;
  this.rect = new paper.Path.Rectangle(x * size, y * size, size, size);
  this.rect.strokeColor = 'black';

  // g and f score is infinity by default
  this.g = Number.POSITIVE_INFINITY;
  this.f = Number.POSITIVE_INFINITY;

  this.setColor = (color) => {
    this.rect.fillColor = color;
  }
}
