console.log('A* Javascript showcase')

// Get a reference to the canvas object and create an empty project
var canvas = document.getElementById('myCanvas');
var canvasSize = 400;
canvas.height = canvas.width = canvasSize;
paper.setup(canvas);

var n = 35; // The number of square to render on the board
var size = (canvasSize / n) - 1; // the size of a single squre

// Create the n x n board
board = [];
for (var i = 0; i < n; i++) {
  board[i] = []
  for (var j = 0; j < n; j++) {
    board[i][j] = new Square(i, j, size);
    board[i][j].isWall = Math.random() < 0.4;
    if (board[i][j].isWall)
      board[i][j].setColor('black');
  }
}

// Define the start point and end point.
var start = board[0][0];
var end = board[n - 1][n - 1];

// Style start and end
start.setColor('orange');
end.setColor('orange');

// prevent start and end from beeing walls
start.isWall = end.isWall = false;

console.log('Searching the optimal path for:')
console.log(`(${start.x}, ${start.y}) --> (${end.x}, ${end.y})`)

function heuristic(a, b) {
  var x = a.x - b.x;
  var y = a.y - b.y;
  return Math.sqrt(x * x + y * y);
}

var evaluated = [];
var discovered = [start];
var camefrom = {};
var path = [];

function getLowestFscore() {
  var lowest = Number.POSITIVE_INFINITY;
  var index = 0;
  for (var i = 0 ; i < discovered.length; i++) {
    if (discovered[i].f < lowest) {
      lowest = discovered[i].f;
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

  // diagonals
  if (i + 1 < n && j + 1 < n)
    neighbors.push(board[i + 1][j + 1]);

  if (i + 1 < n && j - 1 >= 0)
    neighbors.push(board[i + 1][j - 1]);

  if (i - 1 >= 0 && j + 1 < n)
    neighbors.push(board[i - 1][j + 1]);

  if (i - 1 >= 0 && j - 1 >= 0)
    neighbors.push(board[i - 1][j - 1]);

  return neighbors;
}

function createPath(current) {
    path = [current]
    var id = `${current.x}:${current.y}`;
    while(Object.keys(camefrom).includes(id)) {
      var current = camefrom[id]
      path.push(current);
      id = `${current.x}:${current.y}`;
    }
}

function drawSolution() {
  console.log('Done !');
  discovered = []
  evaluated = []

  // re-paint everything in white
  for (var i = 0; i < n; i++) {
    for(var j = 0; j < n; j++ ) {
      if (!board[i][j].isWall)
        board[i][j].setColor('white');
    }
  }
}

start.g = 0; // going to start from start as a cost of 0
start.f = heuristic(end, start);

var done = false;
var success = false;

paper.view.onFrame = (event) => {
  var current;
  if (discovered.length > 0) {
    // run the algorithm
    var index = getLowestFscore();
    current = discovered[index];

    // Stop if we found the end position
    if (current.x === end.x && current.y === end.y) {
      createPath(current);
      success = true;
      done = true;
      drawSolution();
    }

    if (!done) {
      discovered.splice(index, 1);
      evaluated.push(current)

      var neighbors = getNeighbors(current.x, current.y);

      for (var i = 0; i < neighbors.length; i++) {
        var neighbor = neighbors[i];

        if (neighbor.isWall)
          continue; // if the neighbor is a wall, ignore the shit out of it

        if (evaluated.includes(neighbor))
          continue; // ignore this neighbor since it has already been evaluated

        if (!discovered.includes(neighbor))
          discovered.push(neighbor);

        // The distance from the start position to this neighbor
        var temp_gscore = current.g + 1;
        if (temp_gscore >= neighbor.g)
          continue; // this path sucks

        // This path is the best until now
        var id = `${neighbor.x}:${neighbor.y}`;
        camefrom[id] = current;
        neighbor.g = temp_gscore;
        neighbor.f = neighbor.g + heuristic(neighbor, end);
        createPath(current);
      }
    }
  } else {
    done = true;
    if(!success)
      success = false;
  }

  for (var i = 0; i < discovered.length; i++)
    discovered[i].setColor('yellow')

  for (var i = 0; i < evaluated.length; i++)
    evaluated[i].setColor('white')

  for (var i = 0; i < path.length; i++) {
    if (done && !success)
      path[i].setColor('red')
    else if (!done && !success)
      path[i].setColor('blue')
    else if (done && success)
      path[i].setColor('blue')
  }

  // make sure the start and end positions
  start.setColor('orange');
  end.setColor('orange');
}
