define('CategoriesView', ['jquery', 'underscore', 'backbone', 'CategoryModel', 'CategoryView',
    'text!../js/Templates/createCategoryModalWindowTemplate.html', 'text!../js/Templates/navTabPaneCategoryTemplate.html'],
    function($, _, Backbone, CategoryModel, CategoryView, createCategoryModalWindowTemplate, navTabPaneCategoryTemplate) {
    var CategoriesView = Backbone.View.extend({

        selectors: {
            createSubjectButton: '.saveBtn',
            cancelButton: '.cancelBtn',
            navTabContainer: "#navTabContainer",
            navTabPaneContainer: "#navTabPaneContainer",
            addCategoryButton: ".createCategory",
            categoryTitleInput: '.categoryTitle'
        },

        templateModalWindow: _.template(createCategoryModalWindowTemplate),
        templateTabPane: _.template(navTabPaneCategoryTemplate),

        initialize: function() {
            $(this.selectors.addCategoryButton).on('click', $.proxy(this.render, this));
        },

        _attachEvents: function() {
            this.$(this.selectors.createSubjectButton).on('click', $.proxy(this._addNewCategory, this));
            this.$(this.selectors.cancelButton).on('click', $.proxy(this._deleteCategory, this));
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
            $('.modal-backdrop').remove();
            // console.log(this.collection);
        },

        _deleteCategory: function() {
            this.$el.modal('hide');
            $('.modal-backdrop').remove();
        },

        render: function() {
            this.$el = $(this.templateModalWindow());
            this.$el.modal('show');
            this._attachEvents();
            return this;
        }
    });

    return CategoriesView;
});
