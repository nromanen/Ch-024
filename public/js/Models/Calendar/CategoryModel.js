var CategoryModel = Backbone.Model.extend({

    defaults:function() {
        return {
            id: this.cid,
            title: ''
        }
    },

    deleteCategory: function() {
    	this.destroy();
    },

    setTitleAttribute: function(value) {
        this.set('title', value);
    },

    getTitleAttribute: function() {
        return this.get('title');
    },

});