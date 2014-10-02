define('SubjectModel', ['jquery', 'underscore', 'backbone', 'CategoryModel'], function($, _, Backbone, CategoryModel) {
    var SubjectModel = Backbone.Model.extend({

        urlRoot: '/subject',

        defaults: function() {
            return {
                _id: '',
                category: CategoryModel,
                categoryId: "",
                title: '',
                color: '',
                approved: false
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

        getCategoryId: function() {
            return this.get('categoryId');
        },

        setApproved: function(value) {
            this.set('approved', value);
        },

        getApproved: function() {
            return this.get('approved');
        },

        validate: function (attrs) {
            var errors = [];
            if ( attrs.title <= 1 ) {
                errors.push({
                    field: 'subjectTitle',
                    message: 'Title must be longer then 1 sign!'});
            }

            return errors.length ? errors : false;
        }




    });

    return SubjectModel;
});
