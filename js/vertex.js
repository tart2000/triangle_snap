// Vertex class
// Holds references to triangles

/*************/
function Vertex(x, y) {
  var that = this;

  if (typeof Vertex.layer == 'undefined')
    Vertex.layer = new paper.Layer();

  this.position = [x, y];
  this.circle = createCircle(x, y);

  this.isUsedForTriangle = false;
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
    that.isSnapped = true;
    that.setVisible(true);
  }

  /***********/
  function mouseLeave(event) {
    that.isSnapped = false;
    if (!that.isUsedForTriangle)
      that.setVisible(false);
  }

  /***********/
  this.erase = function() {
    var currentTriangle = that.triangles.slice(0);
    for (var i = 0; i < currentTriangle.length; ++i) {
      currentTriangle[i].erase();
    }

    that.triangles = [];
    that.circle.remove();
  }

  /***********/
  this.removeFrom = function(triangle) {
    var triIndex = -1;
    that.triangles.find(function(elem, index, array) {
      if (elem == triangle) {
        triIndex = index;
        return true;
      } else {
        return false;
      }
    });

    if (triIndex != -1) {
      that.triangles.splice(triIndex, 1);
    }

    if (that.triangles.length == 0)
      that.erase();
  }

  /***********/
  this.setVisible = function(visibility) {
    if (visibility == true) {
      that.circle.fillColor = 'black';
      that.circle.blendMode = 'normal';
    } else {
      that.circle.fillColor = 'white';
      that.circle.blendMode = 'multiply';
    }
  }

  /***********/
  this.addTriangle = function(triangle) {
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
