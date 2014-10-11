define('AdminTeachersCollection', ['jquery', 'underscore', 'backbone', 'UserModel'], function($, _, Backbone, UserModel) {	
	var AdminTeachersCollection = Backbone.Collection.extend({
		url: '/teacher/notapproved',
	    model: UserModel
	});

	return AdminTeachersCollection;
});