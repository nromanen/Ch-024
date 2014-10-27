define('NavBarTemplateView', ['jquery', 'underscore', 'backbone','ControllerView', 'text', 'SessionModel', 'text!navBarTemplate'],
	function($, _, Backbone, ControllerView, text, Session, navBarTemplate) {

    var NavBarTemplateView = Backbone.View.extend({

        template: _.template(navBarTemplate),

        selectors: {
            headerTeg: 'header',
            logOutButton: '#logout',
            adminMenu: '.admin-menu'
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
            ControllerView.showElements('navBar', 'adminPage', [this.selectors.adminMenu]);
            return this;
        }
    });
    return NavBarTemplateView;
});
