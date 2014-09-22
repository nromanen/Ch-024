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

    setTitleAttribute: function(value) {
        this.set('title', value);
    },

    getTitleAttribute: function() {
        return this.get('title');
    },

    setColorAttribute: function(value) {
        this.set('color', value);
    },

    getColorAttribute: function() {
        return this.get('color');
    },

    setCategoryAttribute: function(value) {
        this.set('category', value);
    },

    getCategoryAttribute: function() {
        return this.get('category');
    }

});