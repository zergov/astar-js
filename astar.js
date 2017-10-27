// Only executed our code once the DOM is ready.
window.onload = function() {
  console.log('A* Javascript showcase')

  // Get a reference to the canvas object and create an empty project
  var canvas = document.getElementById('myCanvas');
  var canvasSize = 400;
  canvas.height = canvas.width = canvasSize;
  paper.setup(canvas);

  var n = 30; // The number of square to render on the board
  var size = (canvasSize / n) - 1; // the size of a single squre

  // Create the n x n board
  board = [];
  for (var i = 0; i < n; i++) {
    board[i] = []
    for (var j = 0; j < n; j++) {
      var x = i * size;
      var y = j * size;
      board[i][j] = new Square(x, y, size);
    }
  }

  // Color the start and end square.
  board[0][0].setColor('purple');
  board[n - 1][n - 1].setColor('purple');
}
