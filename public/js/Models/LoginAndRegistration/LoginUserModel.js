define('LoginUserModel', ['jquery', 'underscore', 'backbone'], function($, _, Backbone) {
    var LoginUserModel = Backbone.Model.extend({
        defaults: function() {
            return {
                login: '',
                password: ''
            }
        },
        urlRoot: '/signin'
    });

    return LoginUserModel;
});
