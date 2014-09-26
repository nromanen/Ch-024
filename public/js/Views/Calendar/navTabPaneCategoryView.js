define('navTabPaneCategoryView', ['jquery', 'underscore', 'backbone', 'tinycolor', 'pickacolor'],
    function($, _, Backbone, tinycolor, pickacolor) {

        var navTabPaneCategoryView = Backbone.View.extend({

        className: 'tab-pane',

        id : function() {
            return this.model.getCid();
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