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

            var that = this;

            if (!(this.getSession('userSession') === null)) {
                $.ajax({
                        url: '/rights/' + this.getSession('userSession'),
                        dataType: 'json',
                        type: 'GET'
                    })
                    .done(function(response) {
                        that.set(response);
                    })
                    .fail(function() {
                        console.log("error");
                    });
            }
        },

        getSession: function(key) {
            if (this.supportStorage) {
                var data = sessionStorage.getItem(key);
                if (data && data[0] === '{') {
                    return JSON.parse(data);
                } else {
                    return data;
                }
            }
        },

        setSession: function(key, value) {
            if (this.supportStorage) {
                sessionStorage.setItem(key, value);
            }
            return this;
        },

        clearSession: function() {
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
                that.setSession('userSession', response.userId);
                that.set(response);

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
                that.clearSession();

                Backbone.history.navigate('/', {
                    trigger: true
                });
            });
        },

        // hasPermission: function(feature, action) {
        //     var rights = this.get("rights");
        //     if (rights === null) {
        //         return false;
        //     }
        //     return rights[feature][action];
        // },

        getRole: function() {
            var role = this.get("role");
            if (role === null) {
                return false;
            }
            return role;
        },

        getUserId: function() {
            var userId = this.getSession("userSession");
            if (userId === null) {
                return false;
            }
            return userId;
        }
    });

    return new SessionModel();
});
