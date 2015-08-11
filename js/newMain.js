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

  var selectedVertex = _vertexArray.find(function(vertex, index, array) {
    return vertex.isSnapped;
  });

  _selectedVertex = selectedVertex;
}

/*************/
function onMouseUp(event) {
  if (_selectedVertex != undefined) {
    // A point is dragged: move it
    _selectedVertex.moveTo(event.point.x, event.point.y);
    for (var i = 0; i < _triangleArray.length; i++) {
      _triangleArray[i].setColorFromRaster(_raster);
    }
  } else if (paper.Key.isDown('control')) {
    // Control key pressed: delete a point
    var currentVertex = _vertexArray.find(function(elem, index, array) {
      return elem.isSnapped;
    });
    
    if (currentVertex != undefined) {
      currentVertex.erase();
    }

    collectVertAndTris();
  } else {
    // Default behavior: add a point
    var currentVertex = _vertexArray.find(function(vertex, index, array) {
      return vertex.isSnapped;
    });

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
function collectVertAndTris() {
  _vertexArray = _vertexArray.filter(function(vertex, index, array) {
    if (vertex.triangles.length == 0)
      return false;
    else
      return true;
  });

  _triangleArray = _triangleArray.filter(function(tri, index, array) {
    if (tri.vertices.length == 0)
      return false;
    else
      return true;
  });
}

/*************/
window.onload = function() {
  var canvas = document.getElementById('lowpolyCanvas');
  paper.setup(canvas);

  _raster = new Raster('./images/bird.jpg');
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

