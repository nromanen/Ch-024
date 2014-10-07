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
                url: this.url + '/login',
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
            });
        },

        logout: function() {
            var that = this;
            $.ajax({
                url: this.url + '/logout',
                type: 'DELETE'
            }).done(function(response) {
                that.clear();
                that.initialize();

                Backbone.history.navigate('/', {
                    trigger: true
                });
            });
        },


        getAuth: function() {
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
        }
    });

    return new SessionModel();
});
