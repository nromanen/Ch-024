define([
    'jquery',
    'backbone',
    'ControllerView'
], function($, Backbone, ControllerView) {

    var SessionModel = Backbone.Model.extend({

        initialize: function() {
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

        login: function(dataForm) {
            var that = this;
            var login = $.ajax({
                url: '/login',
                data: dataForm,
                type: 'POST'
            });
            login.done(function(response) {
                var res = JSON.stringify(response);
                that.set('userSession', res);
                
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
            var user = this.get("userSession");
            if (user === null) {
                return false;
            }
            return user.rights[feature][action];

        },

        getRole: function() {
            var user = this.get("userSession");
            if (user === null) {
                return false;
            }
            return user.role
        },

        getUserId: function() {
            var user = this.get("userSession");
            if (user === null) {
                return false;
            }
            return user.userId;
        }
    });

    return new SessionModel();
});
