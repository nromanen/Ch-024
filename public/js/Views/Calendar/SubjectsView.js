var SubjectsView = Backbone.View.extend({

    selectors: {
        addSubjectButton:    '.create',
        cancelButton:        '.cancelBtn',
        createSubjectButton: '.saveBtn',
        subjectTitleInput:   '.subjectTitle',
        colorPickerInput:    '.pick-a-color',
        categoryTitleInput:  '.categoryTitle',
        subjectContainer:    '.tab-content #'
    },

    template: _.template($('#createSubjectModalWindowTemplate').html()), 
    templateOptionForSelectCategory: _.template($('#optionForSelect').html()),

    initialize: function(options) {
        this.$el = $(this.template());
        this.$(this.selectors.colorPickerInput).pickAColor();
        this._attachEvents();

        this.collectionSubject = options.collectionSubject;
        this.collectionCategory = options.collectionCategory;
        this.collectionSubject.on('add', $.proxy(this._renderSubject, this));
    },

    /* PRIVATE METHODS */

    _attachEvents: function() {
        this.$(this.selectors.createSubjectButton).on('click', $.proxy(this._addNewSubject, this));
        $(this.selectors.addSubjectButton).on('click', $.proxy(this.render, this));
    },

    /**
     * Add new subject in collection
     */
    _addNewSubject: function() {
        var subjectTitle = this.$(this.selectors.subjectTitleInput).val();
        var categoryId =  this.$(this.selectors.categoryTitleInput).val();
        var categoryModel = this.collectionCategory.findModelById(categoryId);
        var subjectModel = new SubjectModel;

        if (subjectTitle) {
            subjectModel.setTitle(subjectTitle);
            subjectModel.setColor("#" + this.$(this.selectors.colorPickerInput).val());
            subjectModel.setCategory(categoryModel);
            this.collectionSubject.add(subjectModel);
        }
    },

    _renderSubject: function(model) {
        $(this.selectors.subjectContainer +
            model.getCategory().getId()).append(
                new SubjectView({
                    model: model
                }).render().el);
    },

    _clearFieldsInModal: function() {
        $(this.selectors.subjectTitleInput).val('');
        $(this.selectors.categoryTitleInput).html('');
    },

    /**
     * Add categories into list
     */
    _fillCategoryList: function() {
        this._clearFieldsInModal();

        this.collectionCategory.each(function(model){
            this.$(this.selectors.categoryTitleInput).append(this.templateOptionForSelectCategory(model.toJSON()));
        }, this);
    },

    /* PUBLIC METHODS */

    render: function() {
        this.$el.modal('show');
        this._fillCategoryList();
        return this;
    }
});
