define('AdminActionBar', ['jquery', 'underscore', 'backbone', 'UserModel'],
    function($, _, Backbone) {
var AdminActionBar = Backbone.View.extend({

	template: null,
	tagName: 'tr',

	initialize: function(options) {
		AdminActionBar.options = options || {};
		this.template = _.template($(AdminActionBar.options.templateID).html());
		this.model.bind('destroy', this.deleteModel, this);
	},

	_attachEvents:function() {
     //this.$('.hideButton').on('click', $.proxy(this.hideView, this));
     this.$('.confirmButton').on('click', $.proxy(this.confirmView, this));
     this.$('.refuseButton').on('click', $.proxy(this.refuseView, this));
	},

	deleteModel: function() {
		this.remove();
	},

	hideView: function() {
		var thisView = this;
		this.$el.fadeOut('200', function(){ //fadeOut for slow element hiding
			thisView.model.deleteThis();
		});
	},	

	confirmView: function() {
		//this.model.fetch({data:{id: this.id, confirmed: true},type:'POST' });
		this.hideView();
	},

	refuseView: function() {
		//this.model.fetch({data:{id: this.id, confirmed: false},type:'POST' });
		this.hideView();
	},

	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
		this._attachEvents();
        return this.$el;
    }
});
	return AdminActionBar;
});
 