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

        constants: {
            PATTERN_NAME: /^[A-Z][a-z]+[-]?[A-Za-z]*$/,
            PATTERN_SURNAME: /^[A-Z][a-z]+[-]?[A-Za-z]*$/,
            PATTERN_MAIL: /^\w+[-_\.]*\w+@[\w+-]?\w+\.[a-z]{2,4}$/,
            PATTERN_PHONE: /^[+]\d{2}[(]\d{3}[)]\d{3}-\d{2}-\d{2}$/,
            NAME_LENGTH: 1,
            PASS_LENGTH: 6
        },

        validate: function(attrs) {

            var errors = [];
            if (attrs.name.search(this.constants.PATTERN_NAME) === -1 ||
                attrs.name.length <= this.constants.NAME_LENGTH) {
                errors.push({
                    field: 'name',
                    message: 'Name is not correct!'
                });
            }

            if (attrs.surname.search(this.constants.PATTERN_SURNAME) === -1 ||
                attrs.surname.length <= this.constants.NAME_LENGTH) {
                errors.push({
                    field: 'surname',
                    message: 'Surname is not correct!'
                });
            }

            if (attrs.email.search(this.constants.PATTERN_MAIL) === -1) {
                errors.push({
                    field: 'email',
                    message: 'Mail is not correct!'
                });
            }

            if (attrs.password.length <= this.constants.PASS_LENGTH) {
                errors.push({
                    field: 'password',
                    message: 'Password is short!'
                });
            }

            if (attrs.password !== attrs.repeatPassword) {
                errors.push({
                    field: 'repeatPassword',
                    message: 'Password adn repeat password do not similar!'
                });
            }

            if (attrs.phone.search(this.constants.PATTERN_PHONE) === -1) {
                errors.push({
                    field: 'phone',
                    message: 'Phone is not correct!'
                });
            }
            return errors.length ? errors : false;
            // return false;

        },

        preValidate: function(fieldName, value, password) {
            if (typeof password != 'undefined') {
                this.password = password
            };
            this.fieldName = fieldName;
            this.value = value;
            switch (this.fieldName) {
                case '#name':
                    return (this.value.search(this.constants.PATTERN_NAME) === -1 ||
                        this.value.length <= this.constants.NAME_LENGTH) ? false : true;

                case '#surname':
                    return (this.value.search(this.constants.PATTERN_SURNAME) === -1 ||
                        this.value.length <= this.constants.NAME_LENGTH) ? false : true;

                case '#email':
                    return (this.value.search(this.constants.PATTERN_MAIL) === -1) ? false : true;

                case '#password':
                    return (this.value.length <= this.constants.PASS_LENGTH) ? false : true;

                case '#repeatPassword':
                    return (this.value !== this.password) ? false : true;

                case '#phone':
                    return (this.value.search(this.constants.PATTERN_PHONE) === -1) ? false : true;

            };
        }

    });

    return RegistrationUserModel;

});
