define('SubjectModel', ['jquery', 'underscore', 'backbone'], function($, _, Backbone) {
    var SubjectModel = Backbone.Model.extend({

    defaults:function() {
        return {
            //subjectId - model id will be changed
            category: new CategoryModel,
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
    }

    });

    return SubjectModel;
});
