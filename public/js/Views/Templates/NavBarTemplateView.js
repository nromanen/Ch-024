<<<<<<< HEAD
define('NavBarTemplateView', ['jquery', 'underscore', 'backbone', 'SessionModel', 'text', 'text!navBarTemplate'],
	function($, _, Backbone, Session, text, navBarTemplate) {
=======
define('NavBarTemplateView', ['jquery', 'underscore', 'backbone', 'text', 'SessionModel', 'text!navBarTemplate'],
	function($, _, Backbone, text, Session, navBarTemplate) {
>>>>>>> b787ac029d513919e2640b1172be47451dacb698

    var NavBarTemplateView = Backbone.View.extend({

        template: _.template(navBarTemplate),

        selectors: {
            headerTeg: 'header',
            logOutButton: '#logout'
        },

        initialize: function() {
            this.$el.html(this.template());
            this._attachEvents();

        },

        _attachEvents: function() {
            this.$(this.selectors.logOutButton).on("click", $.proxy(this._logout, this));
        },

        _logout: function() {
            Session.logout();
        },

        render: function() {
            $(this.selectors.headerTeg).html(this.$el);
            return this;
        }
    });
    return NavBarTemplateView;
});
