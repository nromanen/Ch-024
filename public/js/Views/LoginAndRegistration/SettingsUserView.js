define('SettingsUserView', [
    'jquery',
    'underscore',
    'backbone',
    'text',
    'text!settingsTemplate'
], function(
    $,
    _,
    Backbone,
    text,
    settingsTemplate) {

    var SettingsUserView = Backbone.View.extend({

        template: _.template(settingsTemplate),

        selectors: {
            changeSurname: "#changeSurname",
            changePhone: "#changePhone",
            currentPassword: "#currentPassword",
            changePassword: "#changePassword",
            repeatPassword: "#repeatPassword",
        },

        initialize: function(options) {
            this.$el.html(this.template());

            this.profileModel = options.profileModel;
            this.passwordModel = options.passwordModel;
            this.profileModel.on("invalid", $.proxy(this._defineErrorProfile, this));
            this.passwordModel.on("invalid", $.proxy(this._defineErrorPassword, this));
        },

        _attachEvents: function() {
            this.$('#saveProfileButton').on('click', $.proxy(this._checkFormProfile, this));
            this.$('#savePasswordButton').on('click', $.proxy(this._checkFormPassword, this));
        },

        _keyPressEvent: function() {
            $('html').keypress(jQuery.proxy(function(event) {
                if (event.keyCode === 13) {
                    this.$("#saveProfileButton").click();
                }
            }));
        },

        _defineErrorProfile: function(model, errors) {
            // console.log(model);
            $('.groupProfile .errors').html('');
            $('.groupProfile input').removeClass('borderRed');
            _.each(errors, function(error) {
                this.$('#' + error.field).removeClass('borderRed');
                this.$('.form-group #' + error.field + ' + .errors').append('<span>' + error.message + '</span>');
                this.$('#' + error.field).addClass('borderRed');
            }, this);
        },

        _defineErrorPassword: function(model, errors) {
            // console.log(model);
            $('.groupPassword .errors').html('');
            $('.groupPassword input').removeClass('borderRed');
            _.each(errors, function(error) {
                this.$('#' + error.field).removeClass('borderRed');
                this.$('.form-group #' + error.field + ' + .errors').append('<span>' + error.message + '</span>');
                this.$('#' + error.field).addClass('borderRed');
            }, this);
        },

        _checkFormProfile: function() {
            var dataProfile = {};

            dataProfile.changeName = $('#changeName').val();
            dataProfile.changeSurname = $(this.selectors.changeSurname).val();
            dataProfile.changePhone = $(this.selectors.changePhone).val();

            this.profileModel.set(dataProfile, {
                validate: true
            });
        },

        _checkFormPassword: function() {
            var dataPassword = {};

            dataPassword.currentPassword = $(this.selectors.currentPassword).val();
            dataPassword.changePassword = $(this.selectors.changePassword).val();
            dataPassword.repeatPassword = $(this.selectors.repeatPassword).val();

            this.passwordModel.set(dataPassword, {
                validate: true
            });
        },

        render: function() {
            this._attachEvents();
            this._keyPressEvent();
            $('main').html(this.$el);
            return this;
        }

    });

    return SettingsUserView;

});
