var CategoriesView = Backbone.View.extend({

    selectors: {
        createCategoryButton: '.saveBtn',
        cancelButton: '.cancelBtn',
        navTabContainer: "#navTabContainer",
        navTabPaneContainer: "#navTabPaneContainer",
        addCategoryButton: ".createCategory",
        categoryTitleInput: '.categoryTitle'
    },

    template: _.template($('#createCategoryModalWindowTemplate').html()),

    initialize: function(options) {
        this.$el = $(this.template());
        this._attachEvents();
        this.collection = options.collection;
        this.collection.on('add', $.proxy(this._renderCategoriesFromCollection, this));
    },

    _attachEvents: function() {
        this.$(this.selectors.createCategoryButton).off().on('click', $.proxy(this._addNewCategoryFormModal, this));
        $(this.selectors.addCategoryButton).off().on('click', $.proxy(this.render, this));
    },

    _renderCategoriesFromCollection: function (model) {
        new CategoryView({
            model: model
        }).render();
        $(this.selectors.navTabContainer + " li:first").addClass('active');
        $(this.selectors.navTabPaneContainer + " div:first").addClass('active');
    },

    _addNewCategoryFormModal: function() {
        var CategoryTitle = this.$(this.selectors.categoryTitleInput).val();

        if (CategoryTitle) {
            var categoryModel = new CategoryModel;
            categoryModel.setTitleAttribute(CategoryTitle);
            this.collection.add(categoryModel);
        }
    },

    render: function() {
        this.$el.modal('show');
        return this;
    }
});
