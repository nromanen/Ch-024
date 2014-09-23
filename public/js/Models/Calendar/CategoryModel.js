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