define('AdminTeachersCollection', ['jquery', 'underscore', 'backbone', 'UserModel'], function($, _, Backbone, UserModel) {	
	var AdminTeachersCollection = Backbone.Collection.extend({
		url: '/teachers/notapproved',
	    model: UserModel
	});

	return AdminTeachersCollection;
});