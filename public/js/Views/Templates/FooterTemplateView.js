define('FooterTemplateView', ['jquery', 'underscore', 'backbone', 'text', 'text!footerTemplate'],
    function($, _, Backbone, text, footerTemplate) {

    var FooterTemplateView = Backbone.View.extend({

        template: _.template(footerTemplate),

        selectors: {
            footerTag: 'footer'
        },

        render: function() {
            $(this.selectors.footerTag).html(this.template());
            return this;
        }
    });
    return FooterTemplateView;
});
