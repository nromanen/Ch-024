define([
    'jquery',
    'underscore',
    'backbone',
    'jqueryui',
    'fullcalendar',
    'ConfirmModalTemplateView',
    'text!newSubjectTemplate',
    'SubjectModel',
    'SubjectView'
], function($, _, Backbone, jqueryui, fullcalendar, ConfirmModalTemplateView, newSubjectTemplate, SubjectModel, SubjectView) {
    describe("Test Subject View", function() {
        var subjectView;
        beforeEach(function(){
            subjectView = new SubjectView({
                model: new SubjectModel
            });
        });

        it("should has defined template", function() {
            expect(subjectView.template).toBeDefined();
        });

        it("render method should return this", function() {
            expect(subjectView.render()).toEqual(subjectView)
        });
    });



});
