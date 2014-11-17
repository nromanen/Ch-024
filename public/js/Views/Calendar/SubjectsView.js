define('SubjectsView', [
    'jquery',
    'underscore',
    'backbone',
    'tinycolor',
    'pickacolor',
    'SubjectModel',
    'CategoryModel',
    'SubjectView',
    'text!createSubjectModalWindowTemplate',
    'text!optionForSelect',
    'text!subjectPreviewTemplate'
],
    function(
        $,
        _,
        Backbone,
        tinycolor,
        pickacolor,
        SubjectModel,
        CategoryModel,
        SubjectView,
        createSubjectModalWindowTemplate,
        optionForSelect,
        subjectPreviewTemplate) {

        window.tinycolor = tinycolor;

        var SubjectsView = Backbone.View.extend({

            selectors: {
                addSubjectButton: '.create',
                cancelButton: '.cancelBtn',
                createSubjectButton: '.saveBtn',
                subjectTitleInput: '.subjectTitle',
                colorPickerInput: '.pick-a-color',
                categoryTitleInput: '.categoryTitle',
                subjectContainer: '.tab-content #',
                subjectPreview: '#subjectPreview',
                colorPick: '#backgroundColor',
                textColorPick: '#textColor'
            },

            template: _.template(createSubjectModalWindowTemplate),
            templateOptionForSelectCategory: _.template(optionForSelect),
            templateSubjectPreview: _.template(subjectPreviewTemplate),


            initialize: function(options) {
                $(this.selectors.addSubjectButton).on('click', $.proxy(this.render, this));
                this.collectionSubject = options.collectionSubject;
                this.collectionCategory = options.collectionCategory;
                this.collectionSubject.on('add', $.proxy(this._renderSubject, this));
                this.collectionSubject.fetch();
            },

            _attachEvents: function() {
                this.$(this.selectors.createSubjectButton).on('click', $.proxy(this._addNewSubject, this));
                this.$el.on('keydown', $.proxy(this._keydownEnterEvent, this));
                this.model.on('change', this._renderSubjectPreview, this);
                this.$(this.selectors.subjectTitleInput).on('input', $.proxy(this._titleChange, this));
                this.$(this.selectors.colorPick).on('change', $.proxy(this._colorChange, this));
                this.$(this.selectors.textColorPick).on('change', $.proxy(this._textColorChange, this));
                this.$(this.selectors.cancelButton).on('click', $.proxy(this._cancelModalWindow, this));
                this.model.on("invalid", $.proxy(this._defineValidationError, this));
            },

            _keydownEnterEvent: function(event) {

                if (event.keyCode == 13) {
                    $.proxy(this._addNewSubject(), this)
                };

            },

            _defineValidationError: function(model, errors) {
                this.$('.errors').html('');
                _.each(errors, function(error) {
                    this.$('.form-group #' + error.field + ' + .errors').append('<span>' + error.message + '</span>');
                    this.$('#' + error.field).addClass('borderRed');
                }, this);
            },

            _addNewSubject: function() {
                var subjectTitle = this.$(this.selectors.subjectTitleInput).val();
                var categoryId = this.$(this.selectors.categoryTitleInput).val();
                var categoryModel = this.collectionCategory.findModelById(categoryId);

                this.model.setTitle(subjectTitle);
                this.model.setColor("#" + this.$(this.selectors.colorPick).val());
                this.model.setTextColor("#" + this.$(this.selectors.textColorPick).val());
                this.model.setCategoryId(categoryModel.getId());
                this.model.setAuthorId(Calendar.Controller.session.getUserId());

                if (this.model.save(null, {
                        type: 'POST'
                    })) {
                    this._cancelModalWindow();
                }
            },

            _renderSubject: function(model) {
                var subjectCid = this.collectionCategory.findWhere({
                    _id: model.getCategoryId()
                }).get('cid');
                $(this.selectors.subjectContainer + subjectCid).append(

                    new SubjectView({
                        model: model
                    }).render().el);

                this._cancelModalWindow();
            },

            _clearFieldsInModal: function() {
                $(this.selectors.subjectTitleInput).val('');
                $(this.selectors.categoryTitleInput).html('');
            },

            _fillCategoryList: function() {
                this._clearFieldsInModal();

                this.collectionCategory.each(function(model) {
                    this.$(this.selectors.categoryTitleInput).append(this.templateOptionForSelectCategory(model.toJSON()));
                }, this);
            },

            _renderSubjectPreview: function() {
                this.$(this.selectors.subjectPreview).html(this.templateSubjectPreview(this.model.toJSON()));
            },

            _titleChange: function() {
                this.model.setTitle(this.$(this.selectors.subjectTitleInput).val());
            },

            _colorChange: function() {
                this.model.setColor("#" + this.$(this.selectors.colorPick).val());
            },

            _textColorChange: function() {
                this.model.setTextColor("#" + this.$(this.selectors.textColorPick).val());
            },

            _cancelModalWindow: function() {
                this.remove();
                $('.modal-backdrop').hide();
            },

            render: function() {
                this.$el = $(this.template());
                this.$(this.selectors.colorPickerInput).pickAColor();
                this._titleChange();
                this._colorChange();
                this._textColorChange();
                this._renderSubjectPreview();
                this.$el.modal('show');
                this._fillCategoryList();
                this._attachEvents();
                return this;
            }

        });

        return SubjectsView;

    }

);
