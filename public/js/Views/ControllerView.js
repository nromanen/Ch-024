define('ControllerView', ['jquery', 'underscore', 'backbone'], 
    function($, _, Backbone) {

    var ControllerView = Backbone.View.extend({

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
        }

    });
    return new ControllerView;
});
