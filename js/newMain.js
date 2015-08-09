// Main file wannabe

var _raster = undefined;
var _vertexArray = [];
var _triangleArray = [];

var _selectedVertex = undefined;

/*************/
function onMouseDown(event) {
}

/*************/
function onMouseDrag(event) {
  if (event.delta < cSnapDistance)
    return;

  if (_selectedVertex != undefined)
    return;

  var selectedVertex = undefined;
  for (var i = 0; i < _vertexArray.length; i++)
    if (_vertexArray[i].isSnapped)
      selectedVertex = _vertexArray[i];

  _selectedVertex = selectedVertex;
}

/*************/
function onMouseUp(event) {
  if (_selectedVertex != undefined) {
    _selectedVertex.moveTo(event.point.x, event.point.y);
    for (var i = 0; i < _triangleArray.length; i++) {
      _triangleArray[i].setColorFromRaster(_raster);
    }
  }
  else {
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

  _selectedVertex = undefined;
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

  _raster = new Raster('/home/manu/src/triangle_snap/images/bird.jpg');
  initLayers();

  var tool = new paper.Tool();
  tool.onMouseDown = onMouseDown;
  tool.onMouseDrag = onMouseDrag;
  tool.onMouseUp = onMouseUp;

  // Download SVG - Would be fun to clear image + white circles before downloading... 
  function downloadDataUri(options) {
      if (!options.url)
          options.url = "http://download-data-uri.appspot.com/";
      $('<form method="post" action="' + options.url
          + '" style="display:none"><input type="hidden" name="filename" value="'
          + options.filename + '"/><input type="hidden" name="data" value="'
          + options.data + '"/></form>').appendTo('body').submit().remove();
  }

  $("#download").click(function() {
      var svg = paper.project.exportSVG({ asString: true });
      downloadDataUri({
          data: 'data:image/svg+xml;base64,' + btoa(svg),
          filename: 'export.svg'
      });
  });
}

