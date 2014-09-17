var LoginUserView = Backbone.View.extend({
    selectors: {
        userLoginButton: '#submitButton',
        userRegisterButton: '#registerButton'
    },

    loginFormContainer: $('body'),

    template: _.template($('#loginTemplate').html()),

    serializeForm: function (selector) {
        var out = {};
        var arr = selector.serializeArray();
        $.each(arr, function () {
            if (out[this.name] !== undefined) {
                if (!out[this.name].push) {
                    out[this.name] = [out[this.name]];
                }
                out[this.name].push(this.value || '');
            } else {
                out[this.name] = this.value || '';
            }
        });

        return out;
    },

    /*PROTECTED METHODS*/
    _attachEvents: function () {
        $(this.selectors.userLoginButton).on('click', $.proxy(this._loginUser, this));
        $(this.selectors.userRegisterButton).on('click', $.proxy(this._registerUser, this));
    },

    _loginUser: function () {
        /*You can write here everything you need for login*/
        var str = this.serializeForm($('form', this.loginFormContainer));
        var sendParams = new LoginUserModel();
        sendParams.fetch({data: {email: str.email, hash: str.password }, type: 'POST' });
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