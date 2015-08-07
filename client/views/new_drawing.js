Template.newDrawing.events({ 
	'submit form': function(e) {
    e.preventDefault();
	var drawing = {
		title: $(e.target).find('[name=title]').val()
	}
	drawing._id = Drawings.insert(drawing);
    Router.go('drawingPage', drawing);
  }
});