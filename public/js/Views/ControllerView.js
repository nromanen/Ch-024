define('ControllerView', [
    'jquery',
    'underscore',
    'backbone',
    'text!alertError',
    'text!alertSuccess'
], function(
    $,
    _,
    Backbone,
    alertError,
    alertSuccess) {

    var ControllerView = Backbone.View.extend({

        templateAlertError: _.template(alertError),
        templateAlertSuccess: _.template(alertSuccess),

        showWrongLogin: function() {
            $('.incorrectLogin').fadeIn(200);
        },

        clearHtmlOnElement: function(selectors) {
            $(selectors).html('');
        },

        selectMenuItem: function(menuItem) {
            $('.navbar .nav li').removeClass('active');
            if (menuItem) {
                $('.' + menuItem).addClass('active');
            }
        },

        showMassageOfClearContainerSubscribe: function(message) {
            $('.assignContainer').html(message);
        },

        addCategoryInActiveClass: function() {
            $('#navTabContainer li:first').addClass('active');
            $('#navTabPaneContainer div:first').addClass('active');
        },

        showAlertSuccess: function(message) {
            $('.forAlert').html('');
            $('.forAlert').append(this.templateAlertSuccess(message));
        },

        showAlertError: function(message) {
            $('.forAlert').html('');
            $('.forAlert').append(this.templateAlertError(message));
        }

    });

    return new ControllerView;

});
