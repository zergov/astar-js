console.log('A* Javascript showcase')

// Get a reference to the canvas object and create an empty project
var canvas = document.getElementById('myCanvas');
var canvasSize = 400;
canvas.height = canvas.width = canvasSize;
paper.setup(canvas);

var n = 15; // The number of square to render on the board
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

function heuristic(a, b) {
  var x = b.x - a.x;
  var y = b.y - b.y;
  return Math.sqrt(x * x + y * y);
}

function manhattan(a, b) {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

var evaluated = []
var discovered = [start]
var camefrom = {};

function getLowestFscore() {
  var lowest = Number.POSITIVE_INFINITY;
  var index = 0;
  for (var i = 0 ; i < evaluated.length; i++) {
    if (evaluated[i].f < lowest) {
      lowest = evaluated[i].f;
      index = i;
    }
  }

  return index;
}

function getNeighbors(i, j) {
  var neighbors = [];

  if (i + 1 < n)
    neighbors.push(board[i + 1][j]);

  if (i - 1 >= 0)
    neighbors.push(board[i - 1][j]);

  if (j + 1 < n)
    neighbors.push(board[i][j + 1]);

  if (j - 1 >= 0)
    neighbors.push(board[i][j - 1]);

  return neighbors;
}

start.g = 0; // going to start from start as a cost of 0
start.f = heuristic(start, end);

paper.view.onFrame = (event) => {
  if (discovered.length > 0) {
    // run the algorithm
    var index = getLowestFscore();
    var current = discovered[index];

    // Stop if we found the end position
    if (current.x === end.x && current.y === end.y) {
      console.log('Found !')
    }

    discovered.splice(index, 1);
    evaluated.push(current)

    // color the current square beeing evaluated in green
    current.setColor('green');

    var neighbors = getNeighbors(current.x, current.y);

    for (var i = 0; i < neighbors.length; i++) {
      var neighbor = neighbors[i];

      if (evaluated.includes(neighbor)) {
        console.log('already seen, skip!');
        continue; // ignore this neighbor since it has already been evaluated
      }

      if (!discovered.includes(neighbor))
        discovered.push(neighbor);

      // The distance from the start position to this neighbor
      var temp_gscore = current.g + manhattan(current, neighbor);
      if (temp_gscore >= neighbor.g) {
        console.log('This path sucks..., Skip !');
        continue; // this path sucks
      }

      // This path is the best until now
      var id = `${neighbor.x}:${neighbor.y}`;
      camefrom[id] = current;
      neighbor.g = temp_gscore;
      neighbor.f = neighbor.g + heuristic(neighbor, end);
    }
  }

  for (var i = 0; i < discovered.length; i++) {
    discovered[i].setColor('yellow')
  }

  for (var i = 0; i < evaluated.length; i++) {
    evaluated[i].setColor('white')
  }

  current.setColor('blue')
  var id = `${current.x}:${current.y}`;
  while(Object.keys(camefrom).includes(id)) {
    var current = camefrom[id]
    id = `${current.x}:${current.y}`;
    current.setColor('blue')
  }
}
