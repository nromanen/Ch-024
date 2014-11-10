define('SettingsProfileModel', [
    'jquery',
    'underscore',
    'backbone'
], function(
    $,
    _,
    Backbone) {

    var SettingsProfileModel = Backbone.Model.extend({

        url: '/profile',

        validate: function(attrs) {
            var errors = [];

            var PATTERN_PHONE = /^[+]\d{2}[(]\d{3}[)]\d{3}-\d{2}-\d{2}$/,
                PATTERN_NAME = /^[A-Z][a-z]+[-]?[A-Za-z]*$/,
                PATTERN_SURNAME = /^[A-Z][a-z]+[-]?[A-Za-z]*$/;

            if (attrs.changeName.search(PATTERN_NAME) === -1) {
                errors.push({
                    field: 'changeName',
                    message: 'Name is not correct!'
                });
            }

            if (attrs.changeSurname.search(PATTERN_NAME) === -1) {
                errors.push({
                    field: 'changeSurname',
                    message: 'Surname is not correct!'
                });
            }

            if (attrs.changePhone.search(PATTERN_PHONE) === -1) {
                errors.push({
                    field: 'changePhone',
                    message: 'Phone is not correct!'
                });
            }

            if (errors.length) {
                return errors;
            }
        }

    });

    return SettingsProfileModel;

});
