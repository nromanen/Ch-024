var LoginUserModel = Backbone.Model.extend({
    defaults: function() {
        return{
            login:'',
            password: ''
        }
    },

	urlRoot: '/signin'
});