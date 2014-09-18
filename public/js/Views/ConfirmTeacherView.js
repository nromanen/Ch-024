var ConfirmTeacherView = Backbone.View.extend({

	template: _.template($('#caruselTeacherTemplate').html()),

	render: function() {
        this._setTemplate();
        this.$el = $(this.template(this.model.toJSON()));
        return this;
    },
    
    initialize: function() {
		render();
	}
})