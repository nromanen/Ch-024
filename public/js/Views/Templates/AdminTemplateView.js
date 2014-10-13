define('AdminTemplateView', ['jquery', 'underscore', 'backbone', 'text', 'text!adminTemplate'],
    function($, _, Backbone, text, adminTemplate) {

    var AdminTemplateView = Backbone.View.extend({
        
        template: _.template(adminTemplate),

        selectors: {
            mainTag: 'main'
        },

        render: function() {
            $(this.selectors.mainTag).html(this.template());
            return this;
        }
    });
    return AdminTemplateView;
});