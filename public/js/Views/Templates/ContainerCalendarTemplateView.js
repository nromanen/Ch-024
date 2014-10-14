define('ContainerCalendarTemplateView', ['jquery', 'underscore', 'backbone', 'text', 'text!containerCalendarTemplate'],
    function($, _, Backbone, text, containerCalendarTemplate) {

    var ContainerCalendarTemplateView = Backbone.View.extend({
        
        template: _.template(containerCalendarTemplate),

        selectors: {
            bodyTag: 'body'
        },

        render: function() {
            $(this.selectors.bodyTag).html(this.template());
            return this;
        }
    });
    return ContainerCalendarTemplateView;
});
