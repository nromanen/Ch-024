var SubjectsView = Backbone.View.extend({

    selectors: {
        addSubjectButton:    '.create',
        cancelButton:        '.cancelBtn',
        createSubjectButton: '.saveBtn',
        subjectTitleInput:   '.subjectTitle',
        subjectBackground:   '.subjectBackground',
        colorPickerInput:    '.pick-a-color',
        subjectContainer:    '.tab-content .active'
    },

    template: _.template($('#createSubjectModalWindowTemplate').html()),

    initialize: function(options) {
        this.collection = options.collection;
        $(this.selectors.addSubjectButton).on('click', $.proxy(this.render, this));
    },

    /* PRIVATE METHODS */

    _attachEvents: function() {
        this.$(this.selectors.createSubjectButton).on('click', $.proxy(this._addNewSubjectInCollection, this));
        this.$(this.selectors.cancelButton).on('click', $.proxy(this._shutdownModalWindow, this));
    },


    /**
     * Add new subject in collection
     */
    _addNewSubjectInCollection: function() {
        var subjectTitle = this.$(this.selectors.subjectTitleInput).val();
        var subjectModel = new SubjectModel;

        if (subjectTitle) {
            subjectModel.setTitleAttribute(subjectTitle);
            subjectModel.setColorAttribute("#" + this.$(this.selectors.colorPickerInput).val()) ;
            $(this.selectors.subjectContainer).append(new SubjectView({
                model: subjectModel
            }).render().el);
            this.collection.add(subjectModel);
        }

        this._shutdownModalWindow();
    },

    /**
     * Shutdown modal window
     */
    _shutdownModalWindow: function() {
        this.remove();
        $('.modal-backdrop').remove();
    },

    /* PUBLIC METHODS */

    render: function() {
        this.$el = $(this.template());
        this.$el.modal('show');
        this.$(this.selectors.colorPickerInput).pickAColor();
        this._attachEvents();
        return this;
    }
});
