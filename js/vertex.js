// Vertex class
// Holds references to triangles

/*************/
function Vertex(x, y) {
  var that = this;

  if (typeof Vertex.layer == 'undefined')
    Vertex.layer = new paper.Layer();

  this.position = [x, y];

  this.circle = new paper.Path.Circle({
    center: [x, y],
    radius: cSnapDistance,
    fillColor: 'black'
  });
  this.circle.onMouseEnter = mouseEnter;
  this.circle.onMouseLeave = mouseLeave;
  Vertex.layer.addChild(this.circle);

  this.isSnapped = false;
  this.triangles = [];

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
    if (that.triangles.find(function(element, index, array) {
        if (element == triangle)
          return true;
        else
          return false;
      }) != undefined) {
      that.triangles.push(triangle);
    }
  }
}
