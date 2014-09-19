var SettingsUserModel = Backbone.Model.extend({
    defaults: {
        editEmail: '',
        currentPassword: '',
        changePassword: '',
        repeatPassword: '',
        editPhone: ''
    },



    validate: function(attrs) {
        var errors = [];
        var PATTERN_MAIL = /^\w+[-_\.]*\w+@\w+-?\w+\.[a-z]{2,4}$/;
        var PATTERN_PHONE = /^[+](380)-\d{2}-\d{3}-\d{2}-\d{2}$/;


        if (attrs.editEmail.search(PATTERN_MAIL) === -1) {
            errors.push({
                field: 'editEmail',
                message: 'Email is not correct!'
            });
        }

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
                message: 'Password adn repeat password do not similar!'
            });
        }

        if (attrs.editPhone.search(PATTERN_PHONE) === -1) {
            errors.push({
                field: 'editPhone',
                message: 'Phone is not correct!'
            });
        }

        return errors;
    }
});
