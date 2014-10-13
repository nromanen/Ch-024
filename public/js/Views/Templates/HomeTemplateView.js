define('HomeTemplateView', ['jquery', 'underscore', 'backbone', 'text', 'text!homeTemplate'],
    function($, _, Backbone, text, homeTemplate) {

    var HomeTemplateView = Backbone.View.extend({
        
        template: _.template(homeTemplate),

        selectors: {
            mainTag: 'main'
        },

        render: function() {
            $(this.selectors.mainTag).html(this.template());
            return this;
        }
    });
    return HomeTemplateView;
});
