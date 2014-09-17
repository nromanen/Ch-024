var RegistrationUserModel = Backbone.Model.extend({
    url: '/signup',
	defaults: {
        //id - model id will be replaced with id from db
	name:'',
        surname:'',
        email:'',
        password:'',
        repeatPassword:'',
        phone:'',
        role: false
	},

	validate: function(attrs){

        var errors = [];
        var PATTERN_NAME = /^[A-Z][a-z]+[-]?[A-Za-z]*$/;
        var PATTERN_SURNAME = /^[A-Z][a-z]+[-]?[A-Za-z]*$/;
        var PATTERN_MAIL = /^\w+[-_\.]*\w+@\w+-?\w+\.[a-z]{2,4}$/;
        var PATTERN_PHONE = /^[+](380)-\d{2}-\d{3}-\d{2}-\d{2}$/; //+380-##-###-##-##

        if ( attrs.name.search(PATTERN_NAME)== -1 || attrs.name.length <= 1 ) {
            errors.push({field: 'name', message: 'Name is not correct!'});
        }

        if ( attrs.surname.search(PATTERN_SURNAME)== -1 || attrs.surname.length <= 1 ) {
            errors.push({field: 'surname', message: 'Surname is not correct!'});
        }

        if ( attrs.email.search(PATTERN_MAIL)== -1 ) {
            errors.push({field: 'email', message: 'Mail is not correct!'});
        }

        if ( attrs.password.length <= 6 ) {
            errors.push({field: 'password', message: 'Password is short!'});
        }

        if ( attrs.password !== attrs.repeatPassword) {
            errors.push({field: 'repeatPassword', message: 'Password adn repeat password do not similar!'});
        }

        if ( attrs.phone.search(PATTERN_PHONE)== -1) {
            errors.push({field: 'phone', message: 'Phone is not correct!'});
        }
        //return errors;
        return true;

	}
});