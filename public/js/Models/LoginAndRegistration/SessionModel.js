define([
    'jquery',
    'backbone',
    'ControllerView'
], function($, Backbone, ControllerView) {

    var SessionModel = Backbone.Model.extend({

        url: '/session',

        initialize: function() {
            //Check for sessionStorage support
            if (Storage && sessionStorage) {
                this.supportStorage = true;
            }
        },

        get: function(key) {
            if (this.supportStorage) {
                var data = sessionStorage.getItem(key);
                if (data && data[0] === '{') {
                    return JSON.parse(data);
                } else {
                    return data;
                }
            }
        },

        set: function(key, value) {
            if (this.supportStorage) {
                sessionStorage.setItem(key, value);
            }
            return this;
        },

        clear: function() {
            if (this.supportStorage) {
                sessionStorage.clear();
            }
        },

        login: function(credentials) {
            var that = this;
            var login = $.ajax({
                url: '/login',
                data: credentials,
                type: 'POST'
            });
            login.done(function(response) {
                // that.set('authenticated', true);
                var res = JSON.stringify(response);
                that.set('user', res);
                that.set('userId', res.userId);
                // console.log(that.get('user')['session']['user']);

                Backbone.history.navigate("#home", {
                    trigger: true
                });

            });
            login.fail(function() {
                ControllerView.showWrongLogin();
                Backbone.history.navigate('/', {
                    trigger: true
                });
                return false;
            });
        },

        logout: function() {
            var that = this;
            $.ajax({
                url: '/logout',
                type: 'POST'
            }).done(function(response) {
                    that.clear();
                    that.initialize();

                    Backbone.history.navigate('/', {
                        trigger: true
                    });
                });
        },

        hasPermission: function(feature, action) {
            var user = this.get("user");
            if(!(user===null)){
                return user.rights[feature][action];
            } else {
                return false;
            }
            
        },

        getAuth: function(callback) {
            return this.get('user.session');
        }
    });

    return new SessionModel();
});
