var RegistrationUserView = Backbone.View.extend({
    selectors:{
        registerButton: "#register",
        cancelButton: "#cancel",
        nameInput: '#name',
        surnameInput: '#surname',
        emailInput: '#email',
        passwordInput: '#password',
        repeatPasswordInput: '#repeatPassword',
        phoneInput: '#phone',
        regForm: '#regForm'

    },
    template: _.template($('#registrationTemplate').html()),

    serializeForm: function (selector) {
        var out = {};
        var arr = selector.serializeArray();
        $.each(arr, function() {
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
            /* Треба замінити цей  .css('border', '1px solid red')  на шось розумне*/
            this.$('#' + error.field).css('border', '1px solid red');
        }, this);
    },

    /**
     *Validate user registration form
     */
    _checkForm:function(){
        var data = {};
        data.name = this.$(this.selectors.nameInput).val();
        data.surname = this.$(this.selectors.surnameInput).val();
        data.email = this.$(this.selectors.emailInput).val();
        data.password = this.$(this.selectors.passwordInput).val();
        data.repeatPassword = this.$(this.selectors.repeatPasswordInput).val();
        data.phone = this.$(this.selectors.phoneInput).val();
        this.model.set(data, {validate:true});

		var str = this.serializeForm($(this.selectors.regForm));
        var sendParams = new RegistrationUserModel();
        sendParams.fetch({data:{name:str.name,surname:str.surname,phone:str.phone,email:str.email,hash:str.password },type:'POST' });
    },

    /**
     *Shutdown modal window
     */
    _shutdownModalWindow: function(){
        this.remove();
        $('.modal-backdrop').remove();
    },

    render:function(){
        this.$el = $(this.template());
        this.$el.modal('show');
        this._attachEvents();
        return this;
    }
});


