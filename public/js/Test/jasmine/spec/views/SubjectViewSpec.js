define([
    'jquery',
    'underscore',
    'backbone',
    'jqueryui',
    'fullcalendar',
    'text!newSubjectTemplate',
    'SubjectModel',
    'SubjectView'
], function($, _, Backbone, jqueryui, fullcalendar, newSubjectTemplate, SubjectModel, SubjectView) {
    describe("Test Subject View", function() {

        beforeEach(function(){
            this.subjectView = new SubjectView({
                model: new SubjectModel({})
            });
        });

        it("should has defined template", function() {
            expect(this.subjectView.template).toBeDefined();
        });

        it("render method should return this", function() {
            expect(this.subjectView.render()).toEqual(this.subjectView)
        });
    });

});
