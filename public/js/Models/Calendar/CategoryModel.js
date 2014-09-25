define('CategoryModel', ['jquery', 'underscore', 'backbone'], function($, _, Backbone) {
    var CategoryModel = Backbone.Model.extend({

        urlRoot: '/category',

        defaults: function() {
            return {
                id: '',
                title: ''
            }
        },

        deleteCategory: function() {
            this.destroy();
        },

        setTitle: function(value) {
            this.set('title', value);
        },

        getTitle: function() {
            return this.get('title');
        },

        getId: function() {
            return this.get('id');
        }
    });
    return CategoryModel;
});
