define('RegistrationUserView', [
    'jquery',
    'underscore',
    'backbone',
    'RegistrationUserModel',
    'ControllerView',
    'text!registrationTemplate'
],
    function(
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
                nameInput: 'example: Oleksij',
                surnameInput: 'example: Ivasiuk',
                emailInput: 'example: tverezo@gmail.com',
                passwordInput: 'example: 365_Days!  (at least 7 characters)',
                repeatPasswordInput: 'passwords should be the same',
                phoneInput: 'example: +380963282780'
            },


            template: _.template(registrationTemplate),

            _attachEvents: function() {
                this.$(this.selectors.registerButton).on('click', $.proxy(this._sendFormData, this));
                this.$(this.selectors.cancelButton).on('click', $.proxy(this._shutdownModalWindow, this));
                this.$(this.selectors.nameInput).on('blur', $.proxy(this._checkName, this));
                this.$(this.selectors.surnameInput).on('blur', $.proxy(this._checkSurname, this));
                this.$(this.selectors.emailInput).on('blur', $.proxy(this._checkEmail, this));
                this.$(this.selectors.passwordInput).on('blur', $.proxy(this._checkPassword, this));
                this.$(this.selectors.repeatPasswordInput).on('blur', $.proxy(this._checkRepeatPassword, this));
                this.$(this.selectors.phoneInput).on('blur', $.proxy(this._checkPhone, this));

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

            _sendFormData: function(jsEvent) {
                var that = this;
                var data = this.$el.serializeJSON();
                var newUser = new RegistrationUserModel(data);
                newUser.save(null, {
                    dataType: 'text',
                    success: function() {
                        that._shutdownModalWindow();
                        ControllerView.showAlertSuccess({
                            message: 'Your registration have been successfuly!'
                        });
                    },
                    error: function() {
                        ControllerView.showAlertError({
                            message: 'Your registration is fail.'
                        });
                    }
                });

                return false;
            },

            _checkName: function() {
                var currentInput = this.$('#name');
                this._operateField(currentInput, this.examples.nameInput, this.model.validateName(currentInput.val()));
            },

            _checkSurname: function() {
                var currentInput = this.$('#surname');
                this._operateField(currentInput, this.examples.surnameInput, this.model.validateSurname(currentInput.val()));
            },

            _checkEmail: function() {
                var currentInput = this.$('#email');
                this._operateField(currentInput, this.examples.emailInput, this.model.validateEmail(currentInput.val()));
            },

            _checkPassword: function() {
                var currentInput = this.$('#password');
                this._operateField(currentInput, this.examples.passwordInput, this.model.validatePassword(currentInput.val()));
            },

            _checkRepeatPassword: function() {
                var currentInput = this.$('#repeatPassword');
                this._operateField(currentInput, this.examples.repeatPasswordInput,
                    this.model.validateRepeatPassword(currentInput.val(), this.$('#password').val()));
            },

            _checkPhone: function() {
                var currentInput = this.$('#phone');
                this._operateField(currentInput, this.examples.phoneInput, this.model.validatePhone(currentInput.val()));
            },

            _operateField: function(currentInput, example, correct) {
                if (correct) {
                    currentInput.popover('hide');
                    currentInput.removeClass('borderRed');
                } else {
                    currentInput.popover({
                        content: example,
                        placement: "left"
                    });
                    currentInput.popover('show');
                    currentInput.addClass('borderRed');
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

    }

);
