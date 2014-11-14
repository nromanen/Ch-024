define('CategoryModel', [
    'jquery',
    'underscore',
    'backbone'
], function(
    $,
    _,
    Backbone) {

    var CategoryModel = Backbone.Model.extend({

        urlRoot: '/category',
        idAttribute: "_id",
        
        regex: {
            MAX_TITLE_LENGTH: 30
        },

        defaults: function() {
            return {
                _id: '',
                cid: this.cid,
                title: '',
                authorId: '',
                approved: false
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

        setAuthorId: function(value) {
            this.set('authorId', value);
        },

        getAuthorId: function() {
            return this.get('authorId');
        },

        getId: function() {
            return this.get('_id');
        },
        //this cid for bind TabNav and TabNavPane
        getCid: function() {
            return this.get('cid');
        },

        validate: function(attrs) {
            var errors = [];
            if (attrs.title.length < 1 || attrs.title.length > this.regex.MAX_TITLE_LENGTH){
                errors.push({
                    field: 'categoryTitle',
                    message: 'Title must contain at least 1 symbol and not be longer 30 symbols!'
                });
            }
            return errors.length ? errors : false;
        }

    });

    return CategoryModel;

});
