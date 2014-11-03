define('RegistrationUserView', [
    'jquery',
    'underscore',
    'backbone',
    'RegistrationUserModel',
    'ControllerView',
    'text!registrationTemplate'
], function(
    $,
    _,
    Backbone,
    RegistrationUserModel,
    ControllerView,
    registrationTemplate) {

    var RegistrationUserView = Backbone.View.extend({

        selectors: {
            registerButton: '#register',
            cancelButton: '#cancel',
            nameInput: '#name',
            surnameInput: '#surname',
            emailInput: '#email',
            passwordInput: '#password',
            repeatPasswordInput: '#repeatPassword',
            phoneInput: '#phone',
            regForm: '#regForm'
        },

        examples: {
            nameInput: 'Oleksij',
            surnameInput: 'Ivasiuk',
            emailInput: 'tverezo@gmail.com',
            passwordInput: "365_Days!\n(at least 7 characters)",
            repeatPasswordInput: 'passwords should be the same',
            phoneInput: '+380963282780'
        },


        template: _.template(registrationTemplate),

        initialize: function() {
            return true;
        },

        _attachEvents: function() {
            this.$(this.selectors.registerButton).on('click', $.proxy(this._checkForm, this));
            this.$(this.selectors.cancelButton).on('click', $.proxy(this._shutdownModalWindow, this));

            this.$(this.selectors.nameInput).on('blur', $.proxy(this._checkField, this, "nameInput"));
            this.$(this.selectors.surnameInput).on('blur', $.proxy(this._checkField, this, "surnameInput"));
            this.$(this.selectors.emailInput).on('blur', $.proxy(this._checkField, this, "emailInput"));
            this.$(this.selectors.passwordInput).on('blur', $.proxy(this._checkField, this, "passwordInput"));
            this.$(this.selectors.repeatPasswordInput).on('blur', $.proxy(this._checkRepeatPassword, this, "repeatPasswordInput"));
            this.$(this.selectors.phoneInput).on('blur', $.proxy(this._checkField, this, "phoneInput"));

            this.model.on("invalid", $.proxy(this._defineError, this));
        },

        _keyPressEvent: function() {
            $('html').keypress(jQuery.proxy(function(event) {
                if (event.keyCode === 13) {
                    $("#register").click();
                }
            }));
        },

        _defineError: function(model, errors) {
            this.$('.errors').html('');
            _.each(errors, function(error) {
                this.$('#' + error.field).addClass('borderRed');
            }, this);
        },

        _checkForm: function(jsEvent) {
            jsEvent.preventDefault();
            var that = this;
            var data = this.$el.serializeJSON();
            this.model.save(data, {
                success: function() {
                    that._shutdownModalWindow();
                    ControllerView.showAlertSuccess({
                        message: 'Your registration have been successfuly!'
                    });
                }
            });
        },

        _checkField: function(fieldName) {
            this.fieldName = fieldName;
            var currentInput = this.$(this.selectors[this.fieldName]);
            if (!this.model.preValidate(this.selectors[this.fieldName], currentInput.val())) {
                currentInput.popover({
                    content: "example: " + this.examples[this.fieldName],
                    placement: "left"
                });
                currentInput.popover('show');
                currentInput.addClass('borderRed');
            } else {
                currentInput.popover('hide');
                currentInput.removeClass('borderRed');
            };
        },

        _checkRepeatPassword: function(fieldName) {
            this.fieldName = fieldName;
            var currentInput = this.$(this.selectors[this.fieldName]);
            if (!this.model.preValidate('#repeatPassword', currentInput.val(), this.$(this.selectors.passwordInput).val())) {
                currentInput.popover({
                    content: this.examples[this.fieldName],
                    placement: "left"
                });
                currentInput.popover('show');
                currentInput.addClass('borderRed');
            } else {
                currentInput.popover('hide');
                currentInput.removeClass('borderRed');
            };
        },

        _addPhoneMask: function() {
            this.$("#phone").mask("+99(999)999-99-99", {
                placeholder: "_"
            });
        },

        _shutdownModalWindow: function() {
            this.remove();
            $('.modal-backdrop').remove();
        },

        render: function() {
            this.$el = $(this.template());
            this.$el.modal('show');
            this._addPhoneMask();
            this._keyPressEvent();
            this._attachEvents();
            return this;
        }

    });

    return RegistrationUserView;

});
