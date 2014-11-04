define('RegistrationUserModel', [
    'jquery',
    'underscore',
    'backbone',
    'maskedinput'
], function(
    $,
    _,
    Backbone) {

    var RegistrationUserModel = Backbone.Model.extend({

        urlRoot: '/signup',

        defaults: {
            //id - model id will be replaced with id from db
            name: '',
            surname: '',
            email: '',
            password: '',
            repeatPassword: '',
            phone: '',
            role: ''
        },

        regex: {
            PATTERN_NAME: /^[A-Z][a-z]+[-]?[A-Za-z]*$/,
            PATTERN_SURNAME: /^[A-Z][a-z]+[-]?[A-Za-z]*$/,
            PATTERN_MAIL: /^\w+[-_\.]*\w+@[\w+-]?\w+\.[a-z]{2,4}$/,
            PATTERN_PHONE: /^[+]\d{2}[(]\d{3}[)]\d{3}-\d{2}-\d{2}$/,
            NAME_LENGTH: 1,
            PASS_LENGTH: 6
        },

        validateName: function(value) {
            this.value = value;
            return (this.value.search(this.regex.PATTERN_NAME) === -1 ||
                    this.value.length <= this.regex.NAME_LENGTH) ? false : true;
        },

        validateSurname: function(value) {
            this.value = value;
            return (this.value.search(this.regex.PATTERN_SURNAME) === -1 ||
                    this.value.length <= this.regex.NAME_LENGTH) ? false : true;
        },

        validateEmail: function(value) {
            this.value = value;
            return (this.value.search(this.regex.PATTERN_MAIL) === -1) ? false : true;
        },

        validatePassword: function(value) {
            this.value = value;
            return (this.value.length <= this.regex.PASS_LENGTH) ? false : true;
        },

        validateRepeatPassword: function(value, password) {
            this.value = value;
            this.password = password;
            return (this.value !== this.password || this.value === '') ? false : true;
        },

        validatePhone: function(value) {
            this.value = value;
            return (this.value.search(this.regex.PATTERN_PHONE) === -1) ? false : true;
        },

        validate: function(attrs) {

            var errors = [];
            if (! this.validateName(attrs.name)) {
                errors.push({
                    field: 'name',
                    message: 'Name is not correct!'
                });
            }

            if (! this.validateSurname(attrs.surname)) {
                errors.push({
                    field: 'surname',
                    message: 'Surname is not correct!'
                });
            }

            if (! this.validateEmail(attrs.email)) {
                errors.push({
                    field: 'email',
                    message: 'Mail is not correct!'
                });
            }

            if (! this.validatePassword(attrs.password)) {
                errors.push({
                    field: 'password',
                    message: 'Password is short!'
                });
            }

            if (! this.validateRepeatPassword(attrs.repeatPassword, attrs.password)) {
                errors.push({
                    field: 'repeatPassword',
                    message: 'Password adn repeat password do not similar!'
                });
            }

            if (! this.validatePhone(attrs.phone)) {
                errors.push({
                    field: 'phone',
                    message: 'Phone is not correct!'
                });
            }
            return errors.length ? errors : false;
        }
    });

    return RegistrationUserModel;

});
