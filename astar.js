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
    board[i][j] = new Square(i, j, size);
  }
}

// Define the start point and end point.
var start = board[0][0];
var end = board[n - 1][n - 1];

// Style start and end
start.setColor('orange');
end.setColor('orange');

console.log('Searching the optimal path for:')
console.log(`(${start.x}, ${start.y}) --> (${end.x}, ${end.y})`)
