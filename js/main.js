

paper.install(window);



window.onload = function() {


    paper.setup('myCanvas');

    var viewSize = view.size;
    console.log(viewSize);

    var raster = new Raster('images/bird.jpg');
    raster.position = new Point(viewSize.width/2,viewSize.height/2);
    
    // scaling to make the image full width 
    raster.onLoad = function () {
        var rasterSize = raster.getImageData(); 
        var ratio = viewSize.width/rasterSize.width;
        var aspectRatio = rasterSize.width/rasterSize.height;
        var normalHeight = viewSize.width*ratio;
        raster.size = new Size(viewSize.width,viewSize.height); // still getting a weird aspect ratio. Needs fixing. 
        
    }
    
    var tool = new Tool();
    var counter = 0;
    var myPath = new Path(); 
    var point1, point2, point3;
    var avgx, avgy; 
    var snapPosition; 

    var rasterVis = 1;

    // Define a mousedown event
    tool.onMouseDown = function(event) {
        // adding circles on click 
        var circle = new Path.Circle({
            center: event.point,
            radius: 4,
            fillColor: 'white'
        });

        // different situations if 1st, 2nd or 3rd point of triangle 
        if (counter == 0) {
            myPath = new Path();
            myPath.strokeColor = 'black';
            point1 = event.point;
            counter++;
        }
        else if (counter == 1) {
            point2 = event.point;
            counter++; 
        } else {
            point3 = event.point;
            avgx = (point1.x + point2.x + point3.x)/3; 
            avgy = (point1.y + point2.y + point3.y)/3; 
            var color = raster.getPixel(avgx, avgy);
            myPath.closed = true;
            myPath.fillColor = color;
            myPath.moveAbove(raster);
            console.log(color);
            myPath.strokeWidth = 0;
            counter = 0;
        }
        myPath.add(event.point);

        circle.onMouseEnter = enter;
        circle.onMouseLeave = leave; 
    }

    function enter (event) {
        this.blendMode = 'normal';
        snapPosition = this.position; 
    }
    function leave (event) {
        this.blendMode = 'multiply';
    }

    // Button to hide and show the background image 
    $( "#hide-image" ).click(function() {
        if (rasterVis == 1) {     
            rasterVis = 0;
            raster.visible = false; // takes f*ing long to hide... 
            $(this).html('Show image');
        } else if (rasterVis == 0) {
            raster.visible = true;
            rasterVis = 1; 
            $(this).html('Hide image');
        }
    });

}