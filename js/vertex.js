// Vertex class
// Holds references to triangles

/*************/
function Vertex(x, y) {
  var that = this;

  if (typeof Vertex.layer == 'undefined')
    Vertex.layer = new paper.Layer();

  this.position = [x, y];
  this.circle = createCircle(x, y);

  this.isSnapped = false;
  this.triangles = [];

  /***********/
  function createCircle(x, y) {
    var circle = new paper.Path.Circle({
      center: [x, y],
      radius: cSnapDistance,
      fillColor: 'black'
    });
    circle.onMouseEnter = mouseEnter;
    circle.onMouseLeave = mouseLeave;
    Vertex.layer.addChild(circle);
    return circle;
  }

  /***********/
  function mouseEnter(event) {
    that.circle.fillColor = 'black';
    that.circle.blendMode = 'normal';
    that.isSnapped = true;
  }

  /***********/
  function mouseLeave(event) {
    that.circle.fillColor = 'white';
    that.circle.blendMode = 'multiply';
    that.isSnapped = false;
  }

  /***********/
  this.addTriangle = function(triangle) {
    //if (that.triangles.length == 0 || that.triangles.find(function(element, index, array) {
    //    if (element == triangle)
    //      return true;
    //    else
    //      return false;
    //  }) != undefined) {
    //  that.triangles.push(triangle);
    //}
    that.triangles.push(triangle);
  }

  /***********/
  this.moveTo = function(x, y) {
    var oldPosition = that.position;
    that.position = [x, y];
    that.circle.remove();
    that.circle = createCircle(x, y);

    for (var i = 0; i < that.triangles.length; i++) {
      that.triangles[i].movePointTo(oldPosition[0], oldPosition[1], that.position[0], that.position[1]);
    }
  }
}
