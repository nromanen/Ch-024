define('CategoryModel', ['jquery', 'underscore', 'backbone'], function($, _, Backbone) {
    var CategoryModel = Backbone.Model.extend({

        defaults: function() {
            return {
                id: this.cid,
                title: ''
            }
        },

        deleteCategory: function() {
            this.destroy();
        }

    });

    return CategoryModel;
});
