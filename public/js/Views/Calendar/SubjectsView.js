var SubjectsView = Backbone.View.extend({

    selectors: {
        addSubjectButton:    '.create',
        cancelButton:        '.cancelBtn',
        createSubjectButton: '.saveBtn',
        subjectTitleInput:   '.subjectTitle',
        subjectBackground:   '.subjectBackground',
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
        this.collectionSubject.on('add', $.proxy(this._renderSubjectsFromCollection, this));
    },

    /* PRIVATE METHODS */

    _attachEvents: function() {
        this.$(this.selectors.createSubjectButton).on('click', $.proxy(this._addNewSubjectInCollection, this));
        $(this.selectors.addSubjectButton).on('click', $.proxy(this.render, this));
    },

    /**
     * Add new subject in collection
     */
    _addNewSubjectInCollection: function() {
        var subjectTitle = this.$(this.selectors.subjectTitleInput).val();
        var idCategory =  this.$(this.selectors.categoryTitleInput).val();
        var categoryModel = this.collectionCategory.findModelById(idCategory);
        var subjectModel = new SubjectModel;

        if (subjectTitle) {
            subjectModel.set({
                title: subjectTitle,
                color: "#" + this.$(this.selectors.colorPickerInput).val(),
                category: categoryModel
            });
            this.collectionSubject.add(subjectModel);
            this._clearFieldsInModal();
        }
    },

    _renderSubjectsFromCollection: function(model) {
        $(this.selectors.subjectContainer +
            model.getCategoryAttribute().getIdAttribute()).append(
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
