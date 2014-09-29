define('CategoryModel', ['jquery', 'underscore', 'backbone'], function($, _, Backbone) {
    var CategoryModel = Backbone.Model.extend({

        urlRoot: '/category',

        defaults: function() {
            return {
                _id: '',
                cid: this.cid,
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
            return this.get('_id');
        },
        //this cid for bind TabNav and TabNavPane
        getCid: function() {
            return this.get('cid');
        }

    });
    return CategoryModel;
});
