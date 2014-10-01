define('LoginUserModel', ['jquery', 'underscore', 'backbone'], function($, _, Backbone) {
    var LoginUserModel = Backbone.Model.extend({

        urlRoot: '/signin',

        defaults: function() {
            return {
                action: ""
            }
        }
    });

    return LoginUserModel;
});
