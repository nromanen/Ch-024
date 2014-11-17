define('SettingsUserModel', [
    'jquery',
    'underscore',
    'backbone'
],
    function(
        $,
        _,
        Backbone) {

        var SettingsUserModel = Backbone.Model.extend({

            defaults: {
                editEmail: '',
                editPassword: '',
                changePassword: '',
                repeatPassword: '',
                editPhone: ''
            },

            regex: {
                PATTERN_MAIL : /^\w+[-_\.]*\w+@\w+-?\w+\.[a-z]{2,4}$/,
                PATTERN_PHONE : /^[+](380)-\d{2}-\d{3}-\d{2}-\d{2}$/
            },

            validate: function(attrs) {
                var errors = [];

                if (attrs.editEmail.search(this.regex.PATTERN_MAIL) === -1) {

                    errors.push({
                        field: 'editEmail',
                        message: 'Email is not correct!'
                    });
                }


                if (attrs.changePassword.length <= 6) {

                    errors.push({
                        field: 'changePassword',
                        message: 'Password is short!'
                    });

                }

                if (attrs.editPassword !== attrs.repeatPassword) {

                    errors.push({
                        field: 'repeatPassword',
                        message: 'Password adn repeat password do not similar!'
                    });

                }

                if (attrs.editPhone.search(this.regex.PATTERN_PHONE) === -1) {

                    errors.push({
                        field: 'editPhone',
                        message: 'Phone is not correct!'
                    });

                }

                return errors;
            }

        });

        return SettingsUserModel;

    }

);
