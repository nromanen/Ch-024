define('UserModel', ['jquery', 'underscore', 'backbone'], 
    function($, _, Backbone) {
    var UserModel = Backbone.Model.extend({

        //url: '/teachers'

    	defaults: function() {
           return{
            id:'', //- model id will be replaced with id from db
    		name:'',
            surname:'',
            email:'',
            phone:'',
            role: '',
            confirmed: false
        }
    	},
    
    	deleteThis: function() {
            this.destroy();
        },

        setName: function(value) {
            this.set('name', value);
        },

        getName: function() {
            return this.get('name');
        },

        setSourname: function(value) {
            this.set('sourname', value);
        },

        getSourname: function() {
            return this.get('sourname');
        },

        setEmail: function(value) {
            this.set('email', value);
        },

        getEmail: function() {
            return this.get('email');
        },

        setPhone: function(value) {
            this.set('phone', value);
        },

        getPhone: function() {
            return this.get('phone');
        },

        setRole: function(value) {
            this.set('role', value);
        },

        getRole: function() {
            return this.get('role');
        },

        setConfirmed: function(value) {
            this.set('confirmed', value);
        },

        getConfirmed: function() {
            return this.get('confirmed');
        },
    });
    return UserModel;
});