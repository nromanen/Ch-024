var LoginUserModel = Backbone.Model.extend({
    defaults:function(){
        return{
            login:'',
            password: ''
        }
    },
	url: '/signin'
});