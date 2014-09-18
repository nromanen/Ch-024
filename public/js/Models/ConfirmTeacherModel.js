var ConfirmTeacherModel = Backbone.Model.extend({
	defaults: {
        //id - model id will be replaced with id from db
	    name:'',
        surname:'',
        email:'',
        phone:'',
        role: '',
        confirmed: false
	}
})
