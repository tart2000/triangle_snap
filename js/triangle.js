// Triangle class
// Holds references to vertices

/*************/
function Triangle() {
  var that = this;

  if (typeof Triangle.layer == 'undefined')
    Triangle.layer = new paper.Layer();

  this.path = new paper.Path();
  this.path.strokeColor = 'black';
  this.vertices = [];
  this.isFinished = false;

  /***********/
  this.addVertex = function(vertex) {
    if (that.isFinished) {
      return true;
    }

    vertex.addTriangle(that);
    that.vertices.push(vertex);
    that.path.add(vertex.position);

    if (that.vertices.length == 3) {
      that.isFinished = true;
      that.path.closed = true;
      that.path.fillColor = 'red';
      that.path.strokeWidth = 0;
      Triangle.layer.addChild(that.path);
      return true;
    }
    else {
      return false;
    }
  }

  /***********/
  this.movePointTo = function(x1, y1, x2, y2) {
    for (var i = 0; i < that.path.segments.length; i++) {
      if (that.path.segments[i].point.x == x1 || that.path.segments[i].point.y == x2) {
        that.path.segments[i].point.x = x2;
        that.path.segments[i].point.y = y2;
      }
    }
  }
  
  /***********/
  this.setColorFromRaster = function(raster) {
    var center = new paper.Point(0, 0);
    for (var i = 0; i < 3; i++) {
      center.x += that.vertices[i].position[0];
      center.y += that.vertices[i].position[1];
    }
    center.x /= 3;
    center.y /= 3;

    that.path.fillColor = raster.getPixel(center.x, center.y);
  }
}
