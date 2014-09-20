define('CategoryView', ['jquery', 'underscore', 'backbone'], function($, _, Backbone) {
    var CategoryView = Backbone.View.extend({

        tagName: 'li',

        selectors: {
            createCategoryButton: ".createCategory"
        },

        template: _.template($('#navTabCategoryTemplate').html()),

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            console.log(this.el);
            return this;
        }
    });
    
    return CategoryView;
});
