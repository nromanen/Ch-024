define('SettingsPasswordModel', [
    'jquery',
    'underscore',
    'backbone'
], function(
    $,
    _,
    Backbone) {

    var SettingsPasswordModel = Backbone.Model.extend({

        defaults: {
            currentPassword: '',
            changePassword: '',
            repeatPassword: ''
        },

        validate: function(attrs) {
            var errors = [];

            //we must check current password

            if (attrs.changePassword.length <= 6) {
                errors.push({
                    field: 'changePassword',
                    message: 'Password is short!'
                });
            }

            if (attrs.editPassword !== attrs.repeatPassword) {
                errors.push({
                    field: 'repeatPassword',
                    message: 'Password and repeat password do not similar!'
                });
            }

            return errors;
        }

    });

    return SettingsPasswordModel;

});
