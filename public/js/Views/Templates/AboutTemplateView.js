define('AboutTemplateView', ['jquery', 'underscore', 'backbone', 'text', 'text!aboutTemplate'],
    function($, _, Backbone, text, aboutTemplate) {

    var AboutTemplateView = Backbone.View.extend({
        
        template: _.template(aboutTemplate),

        selectors: {
            mainTag: 'main'
        },

        render: function() {
            $(this.selectors.mainTag).html(this.template());
            return this;
        }
    });
    return AboutTemplateView;
});
