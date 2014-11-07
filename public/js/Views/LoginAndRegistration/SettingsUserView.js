define('SettingsUserView', [
    'jquery',
    'underscore',
    'backbone'
], function(
    $,
    _,
    Backbone) {

    var SettingsUserView = Backbone.View.extend({

        selectors: {
            changeName: "#changeName",
            changeSurname: "#changeSurname",
            changePhone: "#changePhone",
            currentPassword: "#currentPassword",
            changePassword: "#changePassword",
            repeatPassword: "#repeatPassword",
            saveProfileButton: "#saveProfileButton"
        },

        initialize: function(options) {
            this.profileModel = options.profileModel;
            this.passwordModel = options.passwordModel;
            this.profileModel.on("invalid", $.proxy(this._defineError, this));
            this.passwordModel.on("invalid", $.proxy(this._defineError, this));
        },

        _attachEvents: function() {
            $(this.selectors.saveProfileButton).on('click', $.proxy(this._checkForm, this));
        },

        _keyPressEvent: function() {
            $('html').keypress(jQuery.proxy(function(event) {
                if (event.keyCode === 13) {
                    $("#saveProfileButton").click();
                }
            }));
        },

        _defineError: function(model, errors) {
            // console.log(model);
            $('.errors').html('');
            $('.form-group input').removeClass('borderRed');
            _.each(errors, function(error) {
                // console.log(error);
                $('#' + error.field).removeClass('borderRed');
                $('.form-group #' + error.field + ' + .errors').append('<span>' + error.message + '</span>');
                $('#' + error.field).addClass('borderRed');
                console.log($('.form-group #' + error.field + ' + .errors'));
            }, this);
            // console.log(errors);
        },

        _checkForm: function() {
            var dataProfile = {};
            var dataPassword = {};
            dataProfile.changeName = $(this.selectors.changeName).val();
            dataProfile.changeSurname = $(this.selectors.changeSurname).val();
            dataProfile.changePhone = $(this.selectors.changePhone).val();
            dataPassword.currentPassword = $(this.selectors.currentPassword).val();
            dataPassword.changePassword = $(this.selectors.changePassword).val();
            dataPassword.repeatPassword = $(this.selectors.repeatPassword).val();

            this.profileModel.set(dataProfile, {
                validate: true
            });

            this.passwordModel.set(dataPassword, {
                validate: true
            });
        },

        render: function() {
            this._attachEvents();
            this._keyPressEvent();
            return this;
        }

    });

    return SettingsUserView;

});
