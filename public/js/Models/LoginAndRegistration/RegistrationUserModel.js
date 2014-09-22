var RegistrationUserModel = Backbone.Model.extend({

	defaults: {
        //id - model id will be replaced with id from db
	    name:'',
        surname:'',
        email:'',
        password:'',
        repeatPassword:'',
        phone:''
	},

    constants: {
        PATTERN_NAME : /^[A-Z][a-z]+[-]?[A-Za-z]*$/,
        PATTERN_SURNAME : /^[A-Z][a-z]+[-]?[A-Za-z]*$/,
        PATTERN_MAIL : /^\w+[-_\.]*\w+@\w+-?\w+\.[a-z]{2,4}$/,
        PATTERN_PHONE : /^[+](380)-\d{2}-\d{3}-\d{2}-\d{2}$/,
        SEARCH_ERR : -1,
        NAME_LENGTH : 1,
        PASS_LENGTH : 6
    },

	validate: function(attrs){

        var errors = [];
        if ( attrs.name.search(this.constants.PATTERN_NAME) === this.constants.SEARCH_ERR ||
            attrs.name.length <= this.constants.NAME_LENGTH ) {
            errors.push({
                field: 'name',
                message: 'Name is not correct!'
            });
        }

        if ( attrs.surname.search(this.constants.PATTERN_SURNAME) === this.constants.SEARCH_ERR ||
            attrs.surname.length <= this.constants.NAME_LENGTH ) {
            errors.push({
                field: 'surname',
                message: 'Surname is not correct!'
            });
        }

        if ( attrs.email.search(this.constants.PATTERN_MAIL) === this.constants.SEARCH_ERR ) {
            errors.push({
                field: 'email',
                message: 'Mail is not correct!'
            });
        }

        if ( attrs.password.length <= this.constants.PASS_LENGTH ) {
            errors.push({
                field: 'password',
                message: 'Password is short!'});
        }

        if ( attrs.password !== attrs.repeatPassword) {
            errors.push({field: 'repeatPassword',
                message: 'Password adn repeat password do not similar!'});
        }

        if ( attrs.phone.search(this.constants.PATTERN_PHONE) === this.constants.SEARCH_ERR) {
            errors.push({field: 'phone',
                message: 'Phone is not correct!'});
        }
      //  return errors.length ? errors : false;
        return false;

	},

    urlRoot: '/signup'
});