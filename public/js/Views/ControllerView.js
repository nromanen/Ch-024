define('ControllerView', ['jquery', 'underscore', 'backbone', 'text!alertError', 'text!alertSuccess'],
    function($, _, Backbone, alertError, alertSuccess) {

    var ControllerView = Backbone.View.extend({

        templateAlertError: _.template(alertError),
        templateAlertSuccess: _.template(alertSuccess),

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
            $('.forAlert').append(this.templateAlertSuccess(message))
            .children()
            .last()
            .delay(5000)
            .fadeOut(1000);
        },

        showAlertError: function(message) {
            $('.forAlert').append(this.templateAlertError(message))
            .children()
            .last()
            .delay(5000)
            .fadeOut(1000);
        }

    });
    return new ControllerView;
});
