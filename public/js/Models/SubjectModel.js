var SubjectModel = Backbone.Model.extend({

    defaults:function() {
        return {
            //subjectId - model id will be changed
            //category: CategoryModel,
            title: '',
            color:''
        }
    },

    deleteSubject: function() {
    	this.destroy();
    }

});