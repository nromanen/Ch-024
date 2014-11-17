define('CategoryView', [
    'jquery',
    'underscore',
    'backbone',
    'navTabPaneCategoryView',
    'navTabCategoryView'
],
    function(
        $,
        _,
        Backbone,
        navTabPaneCategoryView,
        navTabCategoryView) {

        var CategoryView = Backbone.View.extend({

            initialize: function() {
                this.model.bind('destroy', this.remove, this);
            },

            selectors: {
                navTabContainer: "#navTabContainer",
                navTabPaneContainer: "#navTabPaneContainer"
            },

            _createNavTabPane: function() {
                return new navTabPaneCategoryView({
                    model: this.model
                }).render().el;
            },

            _createNavTab: function() {
                return new navTabCategoryView({
                    model: this.model
                }).render().el;
            },

            render: function() {
                $('main #subjectContainer #navTabContainer').append(this._createNavTab());
                $('main #subjectContainer #navTabPaneContainer').append(this._createNavTabPane());

                return this;
            }

        });

        return CategoryView;

    }

);
