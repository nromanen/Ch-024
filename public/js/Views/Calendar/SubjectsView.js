var SubjectsView = Backbone.View.extend({

    selectors: {
        addSubjectButton:    '.create',
        cancelButton:        '.cancelBtn',
        createSubjectButton: '.saveBtn',
        subjectTitleInput:   '.subjectTitle',
        subjectBackground:   '.subjectBackground',
        colorPickerInput:    '.pick-a-color',
        categoryInputSelect: '.categoryTitle',
        subjectContainer:    '.tab-content #',
    },

    template: _.template($('#createSubjectModalWindowTemplate').html()),
    templateOptionForSelectCategory: _.template($('#optionForSelect').html()),

    initialize: function(options) {
        this.$el = $(this.template());
        this.$(this.selectors.colorPickerInput).pickAColor();
        this._attachEvents();

        this.collectionSubject = options.collectionSubject;
        this.collectionCategory = options.collectionCategory;
        $(this.selectors.addSubjectButton).on('click', $.proxy(this.render, this));
    },

    /* PRIVATE METHODS */

    _attachEvents: function() {
        this.$(this.selectors.createSubjectButton).on('click', $.proxy(this._addNewSubjectInCollection, this));
    },

    /**
     * Add new subject in collection
     */
    _addNewSubjectInCollection: function() {
        var subjectTitle = this.$(this.selectors.subjectTitleInput).val();
        var idCategory =  this.$(this.selectors.categoryInputSelect).val();
        var categoryModel = this.collectionCategory.findModelById(idCategory);
        var subjectModel = new SubjectModel;

        if (subjectTitle) {
            subjectModel.setTitleAttribute(subjectTitle);
            subjectModel.setColorAttribute("#" + this.$(this.selectors.colorPickerInput).val());
            subjectModel.setCategoryAttribute(categoryModel);
            $(this.selectors.subjectContainer + idCategory).append(new SubjectView({
                model: subjectModel
            }).render().el);
            this.collectionSubject.add(subjectModel);
            // console.log(subjectModel);
        }
    },

    /**
     * Add categories into list
     */
    _fillCategoryList: function() {
        $(this.selectors.subjectTitleInput).val('');
        $(this.selectors.categoryInputSelect).html('');

        this.collectionCategory.each(function(model){
            this.$(this.selectors.categoryInputSelect).append(this.templateOptionForSelectCategory(model.toJSON()));
        }, this);
    },

    /* PUBLIC METHODS */

    render: function() {
        this.$el.modal('show');
        this._fillCategoryList();

        return this;
    }
});
