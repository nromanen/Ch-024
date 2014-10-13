define('AdminActionBar', ['jquery', 'underscore', 'backbone', 'text!teacherInfoTemplate',
    'text!subjectInfoTemplate','text!categoryInfoTemplate'],
    function($, _, Backbone, teacherInfoTemplate, subjectInfoTemplate, categoryInfoTemplate) {
var AdminActionBar = Backbone.View.extend({

	templates: {
        teacherInfoTemplate: teacherInfoTemplate,
        subjectInfoTemplate: subjectInfoTemplate,
        categoryInfoTemplate: categoryInfoTemplate
    },
	tagName: 'tr',

	initialize: function(options) {
		AdminActionBar.options = options || {};
		this.template = _.template(this.templates[options.templateID]);
		this.model.bind('destroy', this._deleteView, this);
	},

	_attachEvents:function() {
     //this.$('.hideButton').on('click', $.proxy(this.hideView, this));
     this.$('.confirmButton').on('click', $.proxy(this._confirmView, this));
     this.$('.refuseButton').on('click', $.proxy(this._refuseView, this));
	},

	_deleteView: function() {
		this.remove();
	},

	_hideView: function() {
		var thisView = this;
		this.$el.fadeOut('200');
	},	

	_confirmView: function() {
        this.model.save();
		this._deleteView();
	},

	_refuseView: function() {
		this.model.destroy();
		this._hideView();
	},

	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
		this._attachEvents();
        return this.$el;
    }
});
	return AdminActionBar;
});
 