var rows, columns, size;

var drawingTime;
var drawingMilliseconds = 100;

// sketch functions

function isOdd(x) {
  return (x & 1) ? true : false;
}

function randBool() {
  return Math.random() >= 0.5;
}

function randFill() {
  fill(randomColor());
}

function drawTriangle(x1, y1, x2, y2, x3, y3) {
  setTimeout(function() {
    randFill();
    triangle(x1, y1, x2, y2, x3, y3);
  }, drawingTime);
}

function setRowsAndColumns() {
  rows = Math.floor(Math.random() * 25) + 5;
  columns = (rows * 4) + 2;
}

function setSize() {
  size = windowHeight / rows;
}

function createInterval() {
  window.setInterval(function() {
    clearAllTimeouts();

    setRowsAndColumns();
    setSize();

    redraw();
  }, columns * (drawingMilliseconds * 3));
}

function clearAllTimeouts() {
  var timeoutId = window.setTimeout(function() {}, 0);

  while (timeoutId--) {
    window.clearTimeout(timeoutId);
  }
}

// p5js functions

function setup() {
  setRowsAndColumns();
  setSize();

  var canvas = createCanvas(windowWidth, windowHeight, P2D);
  canvas.parent('content');

  noStroke();
  noLoop();
}

function draw() {
  background(255);

  var i, j;

  for (j = 0; j < rows; j++) {
    for (i = 0; i < columns; i++) {

      drawingTime = i * drawingMilliseconds;

      var pos = {
        x: (size / 2) * i,
        y: j * size
      }

      if (isOdd(j)) {
        pos.x += - (size / 2);
      }

      if (isOdd(i)) {
        if (randBool()) {
          // top
          drawTriangle(
            pos.x - (size / 4),
            pos.y + (size / 2),
            pos.x + (size / 4),
            pos.y + (size / 2),
            pos.x,
            pos.y
          );
          // bottom
          drawTriangle(
            pos.x - (size / 4),
            pos.y + (size / 2),
            pos.x + (size / 4),
            pos.y + (size / 2),
            pos.x,
            pos.y + size
          );
          // left
          drawTriangle(
            pos.x - (size / 2),
            pos.y + size,
            pos.x,
            pos.y + size,
            pos.x - (size / 4),
            pos.y + (size / 2)
          );
          // right
          drawTriangle(
            pos.x + (size / 2),
            pos.y + size,
            pos.x,
            pos.y + size,
            pos.x + (size / 4),
            pos.y + (size / 2)
          );
        }
        else {
          drawTriangle(
            pos.x - (size / 2),
            pos.y + size,
            pos.x + (size / 2),
            pos.y + size,
            pos.x,
            pos.y
          );
        }
      }
      else {
        if (randBool()) {
          // top
          drawTriangle(
            pos.x - (size / 4),
            pos.y + (size / 2),
            pos.x + (size / 4),
            pos.y + (size / 2),
            pos.x,
            pos.y
          );
          // bottom
          drawTriangle(
            pos.x - (size / 4),
            pos.y + (size / 2),
            pos.x + (size / 4),
            pos.y + (size / 2),
            pos.x,
            pos.y + size
          );
          // left
          drawTriangle(
            pos.x - (size / 2),
            pos.y,
            pos.x,
            pos.y,
            pos.x - (size / 4),
            pos.y + (size / 2)
          );
          // right
          drawTriangle(
            pos.x + (size / 2),
            pos.y,
            pos.x,
            pos.y,
            pos.x + (size / 4),
            pos.y + (size / 2)
          );
        }
        else {
          drawTriangle(
            pos.x - (size / 2),
            pos.y,
            pos.x + (size / 2),
            pos.y,
            pos.x,
            pos.y + size
          );
        }
      }
    }
  }

  createInterval();
}

function windowResized() {
  clearAllTimeouts();

  resizeCanvas(windowWidth, windowHeight);

  setRowsAndColumns();
  setSize();
}
