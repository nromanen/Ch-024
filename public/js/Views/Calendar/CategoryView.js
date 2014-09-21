define('CategoryView', ['jquery', 'underscore', 'backbone', 'text!../js/Templates/navTabCategoryTemplate.html'], function($, _, Backbone, navTabCategoryTemplate) {
    var CategoryView = Backbone.View.extend({

        tagName: 'li',

        selectors: {
            createCategoryButton: ".createCategory"
        },

        template: _.template(navTabCategoryTemplate),

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            console.log(this.el);
            return this;
        }
    });
    
    return CategoryView;
});
