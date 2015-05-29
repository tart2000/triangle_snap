

paper.install(window);



window.onload = function() {

    // Parameters 
    var snap = 12; 

    paper.setup('myCanvas');

    var viewSize = view.size;

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

    var trianglesLayer = new Layer();
    trianglesLayer.moveAbove(raster); 
    
    var tool = new Tool();
    var counter = 0;
    var myPath = new Path(); 
    var point1, point2, point3;
    var avgx, avgy; 
    var snapPosition; 
    var onSnap = 0; 

    var rasterVis = 1;

    // Define a mousedown event
    tool.onMouseDown = function(event) {
        // adding circles on click 
        makeCircle(event);

        // different situations if 1st, 2nd or 3rd point of triangle 
        if (counter == 0) {
            myPath = new Path();
            myPath.strokeColor = 'black';
            counter++;
            point1 = event.point; 
        }
        else if (counter == 1) {
            counter++; 
            point2 = event.point; 
        } else if (counter == 2) {
            point3 = event.point; 
            avgx = (point1.x + point2.x + point3.x)/3
            avgy = (point1.y + point2.y + point3.y)/3
            var color = raster.getPixel(avgx, avgy);
            myPath.closed = true;
            myPath.fillColor = color;
            trianglesLayer.addChild(myPath);
            myPath.strokeWidth = 0;
            // circle = new Path.Circle({center: [avgx,avgy], radius:3, fillColor:'red'});
            counter = 0;
        } else {
            console.log('this really shouldnt be happening');
        }
        addToTriangle(event);
    }

    function enter (event) {
        this.blendMode = 'normal';
        snapPosition = this.position; 
        onSnap = 1; 
    }
    function leave (event) {
        this.blendMode = 'multiply';
        onSnap = 0; 
    }
    function makeCircle (event) {
        if (onSnap == 0) {
            var circle = new Path.Circle({
                center: event.point,
                radius: snap,
                fillColor: 'white'
            });
            console.log('circle created'); 
            circle.onMouseEnter = enter;
            circle.onMouseLeave = leave;
        } else if (onSnap ==1) {
            // pas besoin d'en refaire un si il y en a déjà un 
        }

         
    }
    function addToTriangle (event) {
        if (onSnap == 0) {
            myPath.add(event.point); 
        } else if (onSnap ==1) {
            myPath.add(snapPosition);
        }
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
        var svg = project.exportSVG({ asString: true });
        downloadDataUri({
            data: 'data:image/svg+xml;base64,' + btoa(svg),
            filename: 'export.svg'
        });
    });

}