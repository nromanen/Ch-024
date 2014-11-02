define(['jquery',
    'underscore',
    'backbone',
    'tinycolor',
    'pickacolor',
    'SubjectModel',
    'CategoryModel',
    'SubjectView',
    'SubjectsView',
    'CategoriesCollection',
    'SubjectsCollection',
    'text!createSubjectModalWindowTemplate',
    'text!optionForSelect'
],
    function($, _, Backbone, tinycolor, pickacolor, SubjectModel, CategoryModel, SubjectView, SubjectsView, CollectionCategories, CollectionSubjects, createSubjectModalWindowTemplate, optionForSelect) {
        describe("Test subjects view", function() {
            var subjectsView;

            beforeEach(function(){
                subjectsView = new SubjectsView({
                    model: new SubjectModel,
                    collectionSubject: new CollectionSubjects,
                    collectionCategory: new CollectionCategories
                });
            });

            it('should exist', function() {
                expect(subjectsView).toBeDefined();
            });

            it("should has defined template", function() {
                expect(subjectsView.template).toBeDefined();
            });

            describe('When view is rendered', function() {
                beforeEach(function(){
                     subjectsView.render();
                });

                afterEach(function() {
                    subjectsView.remove();
                    $('.modal-backdrop, .modal').remove();
                });

                it(' should name field be empty', function() {
                    expect(subjectsView.$el.find('.subjectTitle').val()).toEqual('');
                });

            });

            describe('when form is submitted', function () {
                beforeEach(function () {
                    subjectsView.render();
                });

                afterEach(function() {
                    subjectsView.remove();
                    $('.modal-backdrop, .modal').remove();
                });

                describe('no inputs are filled', function () {
                    beforeEach(function () {
                        subjectsView.$el.find('.subjectTitle').val('').trigger('change');
                    });

                    beforeEach(function () {
                        subjectsView.$el.find('.saveBtn').trigger('click');
                    });

                    it('subject title field should be invalidated', function () {
                        expect(subjectsView.$el.find('.subjectTitle').val()).toEqual('');
                    });
                });

                xdescribe('subject title input filled', function () {

                    beforeEach(function () {
                        subjectsView.$el.find('.subjectTitle').val('Subject').trigger('change');
                        subjectsView.$el.find('.saveBtn').trigger('click');
                    });

                    xit('should save model', function () {
                        spyOn(subjectsView.model, 'save').and().callThrough();
                        expect(subjectsView.model.save).toHaveBeenCalled();
                    });

                });
            });

        });

    });