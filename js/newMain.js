// Main file wannabe

var _raster = undefined;
var _vertexArray = [];
var _triangleArray = [];

/*************/
function onMouseDown(event) {
  var currentVertex = undefined;

  for (var i = 0; i < _vertexArray.length; i++)
    if (_vertexArray[i].isSnapped)
      currentVertex = _vertexArray[i];

  if (currentVertex == undefined) {
    currentVertex = new Vertex(event.point.x, event.point.y);
    _vertexArray.push(currentVertex);
  }

  if (_triangleArray.length == 0 || _triangleArray[_triangleArray.length - 1].isFinished)
    _triangleArray.push(new Triangle());
  var currentTriangle = _triangleArray[_triangleArray.length - 1];

  if (currentTriangle.addVertex(currentVertex)) {
    currentTriangle.setColorFromRaster(_raster);
  }
}

/*************/
function initLayers() {
  var vertex = new Vertex(0, 0);
  var triangle = new Triangle();

  Triangle.layer.moveAbove(_raster.raster);
  Vertex.layer.moveAbove(Triangle.layer);
}

/*************/
window.onload = function() {
  var canvas = document.getElementById('lowpolyCanvas');
  paper.setup(canvas);

  _raster = new Raster('images/bird.jpg');
  initLayers();

  var tool = new paper.Tool();
  tool.onMouseDown = onMouseDown;
}
