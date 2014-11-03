define([
    'jquery',
    'backbone',
    'ControllerView'
], function(
    $,
    Backbone,
    ControllerView) {

    var SessionModel = Backbone.Model.extend({

        initialize: function() {
            if (Storage && localStorage) {
                this.supportStorage = true;
            }
            this.getRights();
        },

        getRights: function() {
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
                        that.clearSession();
                    });
            }
        },

        getSession: function(key) {
            if (this.supportStorage) {
                var data = localStorage.getItem(key);
                if (data && data[0] === '{') {
                    return JSON.parse(data);
                } else {
                    return data;
                }
            }
        },

        setSession: function(key, value) {
            if (this.supportStorage) {
                localStorage.setItem(key, value);
            }
            return this;
        },

        clearSession: function() {
            if (this.supportStorage) {
                localStorage.clear();
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
                that.setSession('userSession', response.user._id);
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

        getRole: function() {
            var user = this.get("user");
            if ((user === null) || (user === undefined)) {
                return false;
            }
            return user.role;
        },

        getGravatarLink: function() {
            var gravatar = this.get("gravatar");
            if ((gravatar === null) || (gravatar === undefined)) {
                return false;
            }
            return gravatar;
        },

        getFullName: function() {
            var user = this.get("user");
            if ((user === null) || (user === undefined)) {
                return false;
            }
            return user.username + ' ' + user.surname;
        },

        getUserId: function() {
            var userId = this.getSession("userSession");
            if ((userId === null) || (userId === undefined)) {
                return false;
            }
            return userId;
        }

    });

    return new SessionModel();

});
