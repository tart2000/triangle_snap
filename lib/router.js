Router.configure({
  layoutTemplate: 'layout', 
  loadingTemplate: 'loading',
	waitOn: function() { 
		// return Meteor.subscribe('drawings'); 
	}
});

Router.map(function() { 
	this.route('drawingList', {path: '/'});

	this.route('drawingPage', { 
		path: '/drawings/:_id',
		data: function() { return Drawings.findOne(this.params._id); }
	});

	this.route('newDrawing', { 
		path: '/new'
	});
});

Router.onBeforeAction('loading');