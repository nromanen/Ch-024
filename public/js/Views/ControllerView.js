define('ControllerView', ['jquery', 'underscore', 'backbone', 'text!alertError', 'text!alertSuccess'], 
    function($, _, Backbone, alertError, alertSuccess) {

    var ControllerView = Backbone.View.extend({

        templateAlertError: _.template(alertError),
        templateAlertSuccess: _.template(alertSuccess),

        showElements: function() {
            if (Calendar.Controller.session.hasPermission('category', 'watch')) {
                for (var i in arguments) {
                    $(arguments[i]).css({
                        display: 'block',
                        visibility: 'visible'
                    });
                }
            }
        },

        showWrongLogin: function() {
            $('.incorrectLogin').fadeIn(200);
        },

        selectMenuItem: function(menuItem) {
            $('.navbar .nav li').removeClass('active');
            if (menuItem) {
                $('.' + menuItem).addClass('active');
            }
        },

        showAlertSuccess: function(message) {
            $('.forAlert').html(this.templateAlertSuccess(message));
        },

        showAlertError: function(message) {
            $('.forAlert').html(this.templateAlertError(message));
        }

    });
    return new ControllerView;
});
