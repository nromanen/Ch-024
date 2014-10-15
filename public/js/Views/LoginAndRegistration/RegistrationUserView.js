define('RegistrationUserView', ['jquery', 'underscore', 'backbone', 'RegistrationUserModel', 'text!registrationTemplate'],
    function($, _, Backbone, RegistrationUserModel, registrationTemplate) {
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

        template: _.template(registrationTemplate),

        initialize: function() {
            return true;

        },

        _attachEvents: function () {
            this.$(this.selectors.registerButton).on('click', $.proxy(this._checkForm,this));
            this.$(this.selectors.cancelButton).on('click', $.proxy(this._shutdownModalWindow,this));
            this.model.on("invalid", $.proxy(this._defineError, this));
        },

        _defineError:function(model, errors){
            this.$('.errors').html('');
            _.each(errors, function(error){
                this.$('.form-group #'+ error.field + ' + .errors').append('<span>' + error.message + '</span>');
                this.$('#' + error.field).addClass('borderRed');
            }, this);
        },

        _checkForm:function(jsEvent){
            jsEvent.preventDefault();
            var data = this.$el.serializeJSON();
           if( this.model.save(data)){
               this._shutdownModalWindow();
           }
        },

        _addPhoneMask: function() {
            this.$("#phone").mask("+99(999)999-99-99",{placeholder:"_"});
        },

        _shutdownModalWindow: function() {
            this.remove();
            $('.modal-backdrop').remove();
        },

        render: function() {
            this.$el = $(this.template());
            this.$el.modal('show');
            this._addPhoneMask();
            this._attachEvents();
            return this;
        }
    });

    return RegistrationUserView;
});
