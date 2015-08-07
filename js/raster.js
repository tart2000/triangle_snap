// Raster class
// Holds the image

/*************/
function Raster(filename) {
  var that = this;
  var view = paper.project.view;

  this.raster = new paper.Raster(filename);
  this.raster.position = new paper.Point(view.size.width / 2, view.size.height / 2);
  this.size = [1, 1];
    
  // scaling to make the image full width 
  this.raster.onLoad = function () {
	  var rasterSize = that.raster.getImageData();
	  var ratio = 1.0;
	  if (view.size.width < rasterSize.width)
          ratio = view.size.width / rasterSize.width;
      that.raster.size = new paper.Size(rasterSize.width * ratio, rasterSize.height * ratio);
      that.size = [that.raster.getImageData().width, that.raster.getImageData().height];
  }

  this.position = [this.raster.position.x, this.raster.position.y];

  /***********/
  this.getPixel = function(x, y) {
    var realPosition = [x, y];
    realPosition[0] -= (that.position[0] - that.size[0] / 2);
    realPosition[1] -= (that.position[1] - that.size[1] / 2);

    return that.raster.getPixel(realPosition[0], realPosition[1]);
  }
}
