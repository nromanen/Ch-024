define([
    'jquery',
    'backbone'
], function($, Backbone) {

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
                that.set('authenticated', true);
                that.set('user', JSON.stringify(response));

                Backbone.history.navigate("#home", {
                    trigger: true
                });

            });
            login.fail(function() {
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
                type: 'DELETE'
            }).done(function(response) {
                that.clear();
                that.initialize();

                Backbone.history.navigate('/', {
                    trigger: true
                });
            });
        },


        getAuth: function(callback) {
            var that = this;
            var Session = this.fetch();


            Session.done(function(response) {
                that.set('authenticated', true);
                that.set('user', JSON.stringify(response.user));
            });

            Session.fail(function(response) {
                that.clear();
                that.initialize();
            });
            Session.always(callback);
        }
    });

    return new SessionModel();
});
