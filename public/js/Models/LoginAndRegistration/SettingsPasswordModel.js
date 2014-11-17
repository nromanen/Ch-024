define('SettingsPasswordModel', [
    'jquery',
    'underscore',
    'backbone'
],
    function(
        $,
        _,
        Backbone) {

        var SettingsPasswordModel = Backbone.Model.extend({

            url: '/updatepass',

            validate: function(attrs) {
                var errors = [];

                if (attrs.currentPassword.length <= 6) {

                    errors.push({
                        field: 'currentPassword',
                        message: 'Password is short! Must be over 6 symbol'
                    });

                }

                if (attrs.currentPassword == attrs.changePassword) {

                    errors.push({
                        field: 'currentPassword',
                        message: 'Old password mustn\'t be similar your new password'
                    });

                }

                if (attrs.changePassword.length <= 6) {

                    errors.push({
                        field: 'changePassword',
                        message: 'Password is short!'
                    });

                }

                if (attrs.changePassword !== attrs.repeatPassword) {

                    errors.push({
                        field: 'repeatPassword',
                        message: 'Password and repeat password do not similar!'
                    });

                }

                if (errors.length) {
                    return errors;
                }
            }

        });

        return SettingsPasswordModel;

    }

);
