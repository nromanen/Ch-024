var SettingsUserView = Backbone.View.extend({
    selectors: {
        editEmail: "#editEmail",
        currentPassword: "#currentPassword",
        changePassword: "#changePassword",
        repeatPassword: "#repeatPassword",
        editPhone: "#editPhone",
        saveProfileButton: "#saveProfileButton"
    },

    _attachEvents: function() {
        $(this.selectors.saveProfileButton).on('click', $.proxy(this._checkForm, this));
        this.model.on("invalid", $.proxy(this._defineError, this));
    },

    /**
     * @param {Backbone Model} model
     * @param {Object} errors
     *Display errors
     */
    _defineError: function(model, errors) {
        $('.errors').html('');
        $('.form-group input').removeClass('borderRed');
        _.each(errors, function(error) {
             $('#' + error.field).removeClass('borderRed');
            $('.form-group #' + error.field + ' + .errors').append('<span>' + error.message + '</span>');
            $('#' + error.field).addClass('borderRed');
        }, this);
        console.log(errors);
    },

    /**
     *Validate user settings form
     */
    _checkForm: function() {
        var data = {};
        data.editEmail = $(this.selectors.editEmail).val();
        data.currentPassword = $(this.selectors.currentPassword).val();
        data.changePassword = $(this.selectors.changePassword).val();
        data.repeatPassword = $(this.selectors.repeatPassword).val();
        data.editPhone = $(this.selectors.editPhone).val();

        this.model.set(data, {
            validate: true
        });
    },

    render: function() {
        this._attachEvents();
        return this;
    }
});
