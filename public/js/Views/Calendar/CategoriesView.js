define('CategoriesView', [
    'jquery',
    'underscore',
    'backbone',
    'CategoryModel',
    'CategoryView',
    'ControllerView',
    'text!createCategoryModalWindowTemplate'
],
    function(
        $,
        _,
        Backbone,
        CategoryModel,
        CategoryView,
        ControllerView,
        createCategoryModalWindowTemplate) {

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
                this.collection.on('remove', $.proxy(this._makeActiveTabAfterDelete, this));

            },

            _attachEvents: function() {
                $(this.selectors.addCategoryButton).off().on('click', $.proxy(this.render, this));
                this.$(this.selectors.createCategoryButton).off().on('click', $.proxy(this._addNewCategory, this));
                this.$el.on('keydown', $.proxy(this._keydownEnterEvent, this));
                this.$(this.selectors.cancelButton).off().on('click', $.proxy(this._cancelModalWindow, this));
                this.model.on("invalid", $.proxy(this._defineValidationError, this));
            },

            _makeActiveTabAfterDelete: function() {
                ControllerView.addCategoryInActiveClass();
            },

            _keydownEnterEvent: function(event) {

                if (event.keyCode == 13) {
                    $.proxy(this._addNewCategory(), this)
                }

            },

            _defineValidationError: function(model, errors) {
                this.$('.errors').html('');
                _.each(errors, function(error) {
                    this.$('.form-group #' + error.field + ' + .errors').append('<span>' + error.message + '</span>');
                    this.$('#' + error.field).addClass('borderRed');
                }, this);
            },

            _renderCategory: function(model) {

                new CategoryView({
                    model: model
                }).render();

                ControllerView.addCategoryInActiveClass();
            },

            _addNewCategory: function() {

                var CategoryTitle = this.$(this.selectors.categoryTitleInput).val();
                this.model.setTitle(CategoryTitle);
                this.model.setAuthorId(Calendar.Controller.session.getUserId());
                this.model.isNew(true);

                if (this.model.save(null, {
                        type: 'POST'
                    })) {
                    this._cancelModalWindow();
                }

            },

            _cancelModalWindow: function() {
                this.remove();
                $('.modal-backdrop').remove();
                $('body').removeClass('modal-open');
            },

            render: function() {
                this.$el = $(this.template());
                this.$el.modal('show');
                this._attachEvents();
                return this;
            }




        });


        return CategoriesView;

    }

);
