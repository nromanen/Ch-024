define('SettingsUserView', [
    'jquery',
    'underscore',
    'backbone',
    'ControllerView',
    'text',
    'text!settingsTemplate'
], function(
    $,
    _,
    Backbone,
    ControllerView,
    text,
    settingsTemplate) {

    var SettingsUserView = Backbone.View.extend({

        template: _.template(settingsTemplate),

        initialize: function(options) {
            this.$el.html(this.template());

            this.profileModel = options.profileModel;
            this.passwordModel = options.passwordModel;
            this.profileModel.on("invalid", $.proxy(this._defineErrorProfile, this));
            this.passwordModel.on("invalid", $.proxy(this._defineErrorPassword, this));
            this._addProfileValuesInInputs();

            this.$("#changePhone").mask("+99(999)999-99-99", {
                placeholder: "_"
            });

        },

        _attachEvents: function() {
            this.$('#saveProfileButton').on('click', $.proxy(this._checkFormProfile, this));
            this.$('#savePasswordButton').on('click', $.proxy(this._checkFormPassword, this));
        },

        _keyPressEvent: function() {
            var that = this
            $('html').keypress(jQuery.proxy(function(event) {
                if (event.keyCode === 13) {
                    that.$(".tab-content .active .btn").click();
                }
            }));
        },

        _defineErrorProfile: function(model, errors) {
            $('.groupProfile .errors').html('');
            $('.groupProfile input').removeClass('borderRed');
            _.each(errors, function(error) {
                this.$('#' + error.field).removeClass('borderRed');
                this.$('.form-group #' + error.field + ' + .errors').append('<span>' + error.message + '</span>');
                this.$('#' + error.field).addClass('borderRed');
            }, this);
        },

        _addProfileValuesInInputs: function() {
            var that = this;

            this.profileModel.fetch({
                type: 'GET',
                success: function() {
                    that.setProfileInput(that.profileModel.toJSON());
                }
            });

        },

        _defineErrorPassword: function(model, errors) {
            $('.groupPassword .errors').html('');
            $('.groupPassword input').removeClass('borderRed');
            _.each(errors, function(error) {
                this.$('#' + error.field).removeClass('borderRed');
                this.$('.form-group #' + error.field + ' + .errors').append('<span>' + error.message + '</span>');
                this.$('#' + error.field).addClass('borderRed');
            }, this);
        },

        clearProfileInput: function() {
            this.$('#changeName').val("");
            this.$('#changeSurname').val("");
            this.$('#changePhone').val("");
        },

        setProfileInput: function(modelObject) {
            this.$('#changeName').val(modelObject.username);
            this.$('#changeSurname').val(modelObject.surname);
            this.$('#changePhone').val(modelObject.phone);
        },

        _checkFormProfile: function() {
            var dataProfile = {};

            dataProfile.changeName = this.$('#changeName').val();
            dataProfile.changeSurname = this.$('#changeSurname').val();
            dataProfile.changePhone = this.$('#changePhone').val();

            this.profileModel.set(dataProfile, {
                validate: true
            });

            if (!this.profileModel.validationError) {
                this.profileModel.save(null, {
                    type: 'PUT',
                    statusCode: {
                        201: function(model, response) {
                            ControllerView.showAlertSuccess({
                                message: "Your profile has changed"
                            });
                        }
                    }
                });
            }
        },

        clearPasswordInput: function() {
            this.$('#currentPassword').val("");
            this.$('#changePassword').val("");
            this.$('#repeatPassword').val("");
        },

        _checkFormPassword: function() {
            var dataPassword = {},
                that = this;

            dataPassword.currentPassword = this.$('#currentPassword').val();
            dataPassword.changePassword = this.$('#changePassword').val();
            dataPassword.repeatPassword = this.$('#repeatPassword').val();

            this.passwordModel.set(dataPassword, {
                validate: true
            });
            if (!this.passwordModel.validationError) {
                this.passwordModel.save(null, {
                    type: 'PUT',
                    statusCode: {
                        201: function(model, response) {
                            ControllerView.showAlertSuccess({
                                message: "Your password have changed"
                            });
                            that.clearPasswordInput();
                        },
                        401: function(model, response) {
                            ControllerView.showAlertError({
                                message: "Current password is wrong"
                            });
                            that.clearPasswordInput();
                        }
                    }
                });
            };
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
