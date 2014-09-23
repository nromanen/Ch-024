define('SubjectsView', ['jquery', 'underscore', 'backbone', 'tinycolor', 'pickacolor', 'SubjectModel',
    'SubjectView', 'text!../js/Templates/createSubjectModalWindowTemplate.html'],
    function($, _, Backbone, tinycolor, pickacolor, SubjectModel, SubjectView, createSubjectModalWindowTemplate) {

        var navTabPaneCategoryView = Backbone.View.extend({

        className: 'tab-pane',

        id : function() {
            return this.model.cid;
        },

        initialize: function() {
            this.model.bind('destroy', this.remove, this);
        },

        render: function() {
            return this;
        }
    });
    return navTabPaneCategoryView;
});