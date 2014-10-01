define('LoginUserModel', ['jquery', 'underscore', 'backbone'], function($, _, Backbone) {
    var LoginUserModel = Backbone.Model.extend({

        urlRoot: '/signin',

        defaults: function() {
            return {
                // action: ""
            }
        },

        _redirectToHome: function(loginModel) {
            if (loginModel.get('action') === 'logined') {
                this.router.redirectToHome();
            }
        }
    });

    return LoginUserModel;
});
