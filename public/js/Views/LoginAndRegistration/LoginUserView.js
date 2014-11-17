define('LoginUserView', [
    'jquery',
    'underscore',
    'backbone',
    'jqueryjson',
    'RegistrationUserModel',
    'RegistrationUserView',
    'SessionModel',
    'text!loginTemplate'
],
    function(
        $,
        _,
        Backbone,
        jqJSON,
        RegistrationUserModel,
        RegistrationUserView,
        Session,
        loginTemplate) {

        var LoginUserView = Backbone.View.extend({

            selectors: {
                userLoginButton: '#submitButton',
                userRegisterButton: '#registerButton',
                loginForm: '.b_loginForm'
            },

            loginFormContainer: $('body'),

            template: _.template(loginTemplate),

            _attachEvents: function() {
                $(this.selectors.userLoginButton).on('click', $.proxy(this._loginUser, this));
                $(this.selectors.userRegisterButton).on('click', $.proxy(this._registerUser, this));
            },

            _loginUser: function(jsEvent) {
                jsEvent.preventDefault();
                var formData = ($(this.selectors.loginForm).serializeJSON());
                Session.login(formData);
            },

            _registerUser: function() {

                new RegistrationUserView({
                    model: new RegistrationUserModel
                }).render();

            },

            render: function() {
                this.loginFormContainer.html(this.template());
                this._attachEvents();
                return this;
            }

        });

        return LoginUserView;

    }

);
