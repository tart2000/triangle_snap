Template.newDrawing.events({
        
});


Template.newDrawing.onRendered(function() {
 // Get a reference to the canvas object
        var canvas = document.getElementById('preview');
        // Create an empty project and a view for the canvas:
        paper.setup(canvas);
        // Create a Paper.js Path to draw a line into it:
        var path = new paper.Path();
        // Give the stroke a color
        path.strokeColor = 'black';
        var start = new paper.Point(0, 0);
        // Move to start and draw a line from there
        path.moveTo(start);
        // Note that the plus operator on Point objects does not work
        // in JavaScript. Instead, we need to call the add() function:
        path.lineTo(start.add([ 300, 150 ]));
        // Draw the view now:
        paper.view.draw();

});


function readURL(input) {
	
	console.log(input);

    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#blah').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    }
}

Template.newDrawing.events({ 
	'change #file-input': function(e, template) {
        readURL($(e.target)[0])
    },

	'submit form': function(e) {
    e.preventDefault();
	var drawing = {
		title: $(e.target).find('[name=title]').val()
	}
	drawing._id = Drawings.insert(drawing);
    Router.go('drawingPage', drawing);
  }
});