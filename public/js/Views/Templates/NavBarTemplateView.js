define('NavBarTemplateView', ['jquery',
    'underscore',
    'backbone',
    'ControllerView',
    'text',
    'SessionModel',
    'UserModel',
    'text!navBarTemplate',
    'text!adminMenuTemplate',
    'text!teacherMenuTemplate'
], function($,
    _,
    Backbone,
    ControllerView,
    text,
    Session,
    UserModel,
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
            this.userModel = new UserModel;
            this._fetchUserModel();

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

        _fetchUserModel: function() {
            var that = this;
            this.userModel.set('_id', Calendar.Controller.session.getUserId());
            this.userModel.fetch({
                success: function() {
                    that.$el.find('.username').html(that.userModel.getName());
                }
            });
        },

        render: function() {
            this.$el.find('.userPic').attr('src',Session.getGravatarLink());

            console.log(this.username)
            console.log(Session.getGravatarLink());
            $(this.selectors.headerTeg).html(this.$el);
            return this;
        }
    });
    return NavBarTemplateView;
});
