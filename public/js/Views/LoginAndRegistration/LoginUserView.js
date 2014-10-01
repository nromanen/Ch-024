define('LoginUserView', ['jquery', 'underscore', 'backbone', 'jqueryjson', 'LoginUserModel', 'RegistrationUserModel',
        'RegistrationUserView', 'text!loginTemplate'
    ],
    function($, _, Backbone, jqJSON, LoginUserModel, RegistrationUserModel, RegistrationUserView, loginTemplate) {
        var LoginUserView = Backbone.View.extend({

            selectors: {
                userLoginButton: '#submitButton',
                userRegisterButton: '#registerButton',
                loginForm: '.b_loginForm'
            },

            loginFormContainer: $('body'),

            template: _.template(loginTemplate),

            initialize: function(options) {
                this.router = options.router;
            },

            /* PRIVATE METHODS */

            _attachEvents: function() {
                $(this.selectors.userLoginButton).on('click', $.proxy(this._loginUser, this));
                $(this.selectors.userRegisterButton).on('click', $.proxy(this._registerUser, this));
            },

            _loginUser: function() {
                /*You can write here everything you need for login*/
                var formData = ($(this.selectors.loginForm).serializeJSON());

                this.model.set(formData);
                this.model.save(null, {
                    success: _.bind(this.model._redirectToHome, this)
                });
            },

            /*
             * Open registration form
             */
            _registerUser: function() {
                new RegistrationUserView({
                    model: new RegistrationUserModel
                }).render();
            },

            /*PUBLIC METHODS*/

            render: function() {
                this.loginFormContainer.html(this.template());
                this._attachEvents();
                return this;
            }
        });

        return LoginUserView;
    });
