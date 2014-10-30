define('HomeTemplateView', ['jquery', 'underscore', 'backbone', 'ControllerView', 'text', 'text!homeTemplate'],
    function($, _, Backbone, ControllerView, text, homeTemplate) {

    var HomeTemplateView = Backbone.View.extend({

        template: _.template(homeTemplate),

        selectors: {
            mainTag: 'main',
            navTabs: '#navTabs',
            buttonCreate: '#buttonCreate'
        },

        render: function() {
            this.$el.html(this.template());
            $(this.selectors.mainTag).html(this.$el);
            ControllerView.showElements('category', 'watch', [this.selectors.navTabs, this.selectors.buttonCreate]);
            return this;
        }
    });
    return HomeTemplateView;
});
