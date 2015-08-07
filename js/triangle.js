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
      Triangle.layer.addChild(that.path);
      return true;
    }
    else {
      return false;
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
