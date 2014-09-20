var CategoryModel = Backbone.Model.extend({

    defaults:function() {
        return {
            id: this.cid,
            title: ''
        }
    },

    deleteCategory: function() {
    	this.destroy();
    }

});