define('NavBarTemplateView', ['jquery',
    'underscore',
    'backbone',
    'ControllerView',
    'text',
    'SessionModel',
    'text!navBarTemplate',
    'text!adminMenuTemplate',
    'text!teacherMenuTemplate'
], function($,
    _,
    Backbone,
    ControllerView,
    text,
    Session,
    navBarTemplate,
    adminMenuTemplate,
    teacherMenuTemplate) {

    var NavBarTemplateView = Backbone.View.extend({

        template: _.template(navBarTemplate),
        adminMenuTemplate: _.template(adminMenuTemplate),
        teacherMenuTemplate: _.template(teacherMenuTemplate),

        selectors: {
            headerTeg: 'header',
            logOutButton: '#logout',
            adminMenu: '.admin-menu'
        },

        initialize: function() {
            this._choseTemplateMenu();
            this.$el.html(this.template({liMenu: this.menuTemplate}));
            this._attachEvents();
        },

        _attachEvents: function() {
            this.$(this.selectors.logOutButton).on("click", $.proxy(this._logout, this));
        },

        _logout: function() {
            Session.logout();
        },


        _choseTemplateMenu: function() {
            var role = Session.getRole();
            if(role === 'admin') this.menuTemplate = this.adminMenuTemplate();
            if(role === 'teacher') this.menuTemplate = this.teacherMenuTemplate();
            if(role === 'user')  this.menuTemplate = ' ';
        },

        render: function() {
            this.$el.find('.userPic').attr('src',Session.getGravatarLink());
            this.$el.find('.username').html(Session.getFullName());
            $(this.selectors.headerTeg).html(this.$el);
            return this;
        }
    });
    return NavBarTemplateView;
});
