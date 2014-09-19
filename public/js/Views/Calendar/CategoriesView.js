var CategoriesView = Backbone.View.extend({

    selectors: {
        createSubjectButton: '.saveBtn',
        cancelButton: '.cancelBtn',
        navTabContainer: "#navTabContainer",
        navTabPaneContainer: "#navTabPaneContainer",
        addCategoryButton: ".createCategory",
        categoryTitleInput: '.categoryTitle'
    },

    templateModalWindow: _.template($('#createCategoryModalWindowTemplate').html()),
    templateTabPane: _.template($('#navTabPaneCategoryTemplate').html()),

    initialize: function() {
        $(this.selectors.addCategoryButton).on('click', $.proxy(this.render, this));
    },

    _attachEvents: function() {
        this.$(this.selectors.createSubjectButton).on('click', $.proxy(this._addNewCategory, this));
    },

    _addNewCategory: function() {
        var CategoryTitle = this.$(this.selectors.categoryTitleInput).val();

        if (CategoryTitle) {
            var categoryModel = new CategoryModel({
                title: CategoryTitle
            });

            $(this.selectors.navTabContainer).append(new CategoryView({
                model: categoryModel
            }).render().el);

            $(this.selectors.navTabPaneContainer).append(this.templateTabPane(categoryModel.toJSON()));

            this.collection.add(categoryModel);
        }

        // console.log(this.collection);
    },

    render: function() {
        this.$el = $(this.templateModalWindow());
        this.$el.modal('show');
        this._attachEvents();
        return this;
    }
});
