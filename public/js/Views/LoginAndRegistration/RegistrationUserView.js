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

    /**
     * @param {Backbone Model} model
     * @param {Object} errors
     *Display errors if they happen
     */
    _defineError:function(model, errors){
        this.$('.errors').html('');
        _.each(errors, function(error){
            this.$('.form-group #'+ error.field + ' + .errors').append('<span>' + error.message + '</span>');
            this.$('#' + error.field).addClass('borderRed');
        }, this);
    },

    /**
     *Validate user registration form
     */
    _checkForm:function(jsEvent){
        var data = this.$el.serializeJSON();
        this.model.save(data);
    },

        /**
         *Shutdown modal window
         */
        _shutdownModalWindow: function() {
            this.remove();
            $('.modal-backdrop').remove();
        },

        render: function() {
            this.$el = $(this.template());
            this.$el.modal('show');
            this._attachEvents();
            return this;
        }
    });
    
    return RegistrationUserView;
});
