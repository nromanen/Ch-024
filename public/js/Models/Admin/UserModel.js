define('UserModel', [
    'jquery',
    'underscore',
    'backbone'
], function(
    $,
    _,
    Backbone) {

    var UserModel = Backbone.Model.extend({

        urlRoot: '/user',
        idAttribute: "_id",

        defaults: function() {
            return {
                _id: '', //- model id will be replaced with id from db
                username: '',
                surname: '',
                email: '',
                phone: '',
                role: '',
                approved: false
            }
        },

        deleteThis: function() {
            this.destroy();
        },

        setName: function(value) {
            this.set('username', value);
        },

        getName: function() {
            return this.get('username');
        },

        setSurname: function(value) {
            this.set('surname', value);
        },

        getSurname: function() {
            return this.get('surname');
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
            this.set('approved', value);
        },

        getConfirmed: function() {
            return this.get('approved');
        }

    });

    return UserModel;

});
