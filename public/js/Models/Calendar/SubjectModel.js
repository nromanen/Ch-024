define('SubjectModel', [
    'jquery',
    'underscore',
    'backbone',
    'CategoryModel'
],
    function(
        $,
        _,
        Backbone,
        CategoryModel) {

        var SubjectModel = Backbone.Model.extend({

            urlRoot: '/subject',
            idAttribute: "_id",

            regex: {
                MAX_TITLE_LENGTH: 30
            },

            defaults: function() {
                return {
                    _id: '',
                    categoryId: '',
                    title: '',
                    textColor: '',
                    color: '',
                    authorId: '',
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

            setCategoryId: function(value) {
                this.set('categoryId', value);
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

            setTextColor: function(value) {
                this.set('textColor', value);
            },

            getTextColor: function() {
                return this.get('textColor');
            },

            setAuthorId: function(value) {
                this.set('authorId', value);
            },

            getAuthorId: function() {
                return this.get('authorId');
            },

            validate: function(attrs) {
                var errors = [];

                if(attrs.title.length < 1 ||
                    attrs.title.length > this.regex.MAX_TITLE_LENGTH) {

                    errors.push({
                        field: 'subjectTitle',
                        message: 'Title must contain at least 1 symbol and not be longer 30 symbols!'
                    });

                }

                return errors.length ? errors : false;
            }

        });

        return SubjectModel;

    }

);
