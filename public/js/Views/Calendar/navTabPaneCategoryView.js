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