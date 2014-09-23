var CategoryView = Backbone.View.extend({

    selectors: {
        navTabContainer: "#navTabContainer",
        navTabPaneContainer: "#navTabPaneContainer"
    },

    _createNavTabPane: function() {
      return  new navTabPaneCategoryView({
          model: this.model
      }).render().el;
    },

    _createNavTab: function() {
        return  new navTabCategoryView({
            model: this.model
        }).render().el;
    },


	render: function () {
		this.$el = $('#subjectContainer');
        this.$(this.selectors.navTabContainer).append(this._createNavTab());
        this.$(this.selectors.navTabPaneContainer).append(this._createNavTabPane());
		return this;
	}
});