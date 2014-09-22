var LoginUserView = Backbone.View.extend({

    selectors: {
        userLoginButton:    '#submitButton',
        userRegisterButton: '#registerButton'
    },

    loginFormContainer: $('body'),

    template: _.template($('#loginTemplate').html()),

    /* PRIVATE METHODS */

    _attachEvents: function () {
        $(this.selectors.userLoginButton).on('click', $.proxy(this._loginUser, this));
        $(this.selectors.userRegisterButton).on('click', $.proxy(this._registerUser, this));
    },

    _loginUser: function () {
        /*You can write here everything you need for login*/
        var data = $('form', this.loginFormContainer).serializeJSON();
        var loginModel = new LoginUserModel();
        loginModel.fetch({data:data,type: 'POST'});
        return false;
    },

    /**
     * Open registration form
     */
    _registerUser: function () {
        new RegistrationUserView({
            model: new RegistrationUserModel
        }).render();
    },

    /*PUBLIC METHODS*/

    render: function () {
        this.loginFormContainer.html(this.template());
        this._attachEvents();
        return this;
    }
});