define('HelpTemplateView', ['jquery', 'underscore', 'backbone', 'text', 'text!helpTemplate'],
    function($, _, Backbone, text, helpTemplate) {

    var HelpTemplateView = Backbone.View.extend({
        
        template: _.template(helpTemplate),

        selectors: {
            mainTag: 'main'
        },

        render: function() {
            $(this.selectors.mainTag).html(this.template());
            return this;
        }
    });
    return HelpTemplateView;
});