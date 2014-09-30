define('CategoriesView', ['jquery', 'underscore', 'backbone', 'CategoryModel', 'CategoryView',
    'text!createCategoryModalWindowTemplate'],
    function($, _, Backbone, CategoryModel, CategoryView, createCategoryModalWindowTemplate) {
    var CategoriesView = Backbone.View.extend({

    selectors: {
        createCategoryButton: '.saveBtn',
        cancelButton: '.cancelBtn',
        navTabContainer: "#navTabContainer",
        navTabPaneContainer: "#navTabPaneContainer",
        addCategoryButton: ".createCategory",
        categoryTitleInput: '.categoryTitle'
    },

    template: _.template(createCategoryModalWindowTemplate),

    initialize: function(options) {
        this.$el = $(this.template());
        this._attachEvents();
        this.collection = options.collection;
        this.collection.fetch();

        this.collection.on('add', $.proxy(this._renderCategory, this));
    },

    _attachEvents: function() {
        this.$(this.selectors.createCategoryButton).off().on('click', $.proxy(this._addNewCategory, this));
        this.$(this.selectors.cancelButton).off().on('click', $.proxy(this._cancelModalWindow, this));
        $(this.selectors.addCategoryButton).off().on('click', $.proxy(this.render, this));


    },

    _renderCategory: function (model) {
        new CategoryView({
            model: model
        }).render();
        $(this.selectors.navTabContainer + " li:first").addClass('active');
        $(this.selectors.navTabPaneContainer + " div:first").addClass('active');

    },

    _addNewCategory: function() {
        var CategoryTitle = this.$(this.selectors.categoryTitleInput).val();

        if (CategoryTitle) {
            var categoryModel = new CategoryModel;
            categoryModel.setTitle(CategoryTitle);
            this._cancelModalWindow();
            categoryModel.isNew(true);
            categoryModel.save();
            this.collection.add(categoryModel);
        }
    },

    _cancelModalWindow: function() {
            this.remove();
         //this.$el.modal('hide');
            $('.modal-backdrop').remove();

    },

    render: function() {
        this.$el = $(this.template());
        this.$el.modal('show');
        this._attachEvents();
        return this;
    }
});
        return CategoriesView;
    });
