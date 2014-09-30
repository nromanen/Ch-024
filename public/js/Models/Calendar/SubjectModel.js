define('SubjectModel', ['jquery', 'underscore', 'backbone', 'CategoryModel'], function($, _, Backbone, CategoryModel) {
    var SubjectModel = Backbone.Model.extend({

        urlRoot: '/subject',

        defaults: function() {
            return {
                id: this.cid,
                category: CategoryModel,
                catId: '',
                title: '',
                color: ''
            }
        },

        deleteSubject: function() {
            this.destroy();
        },

        setTitle: function(value) {
            this.set('title', value);
        },

        getTitle: function() {
            return this.get('title');
        },

        setColor: function(value) {
            this.set('color', value);
        },

        getColor: function() {
            return this.get('color');
        },

        setCategory: function(value) {
            this.set('category', value);
        },

        getCategory: function() {
            return this.get('category');
        },

        setCategoryId: function(value) {
            this.set('catId', value);
        },

        getCategoryId: function() {
            return this.get('catId');
        }

    });

    return SubjectModel;
});
