define([
    'jquery',
    'underscore',
    'backbone',
    'CalendarEventModel',
    'SubjectModel'
], function($, _, Backbone, CalendarEventModel, SubjectModel) {
    describe('Test Calendar Event Model', function() {
        var data = {
            subject: new SubjectModel,
            title: 'JS',
            start: null,
            end: null,
            editable: true,
            color: 'black',
            textColor: 'red',
            classroom: '765',
            amountOfStudents: 2,
            currentCount: 2
        };

        it('should be able to create its application test objects', function() {
            var event = new CalendarEventModel({
                subject: new SubjectModel
            });
            expect(event).toBeDefined();
            expect(data).toBeDefined();
        });

        describe('has property getter functions that', function() {
            var event = new CalendarEventModel(data);

            it('should return  title', function() {
                expect(event.getTitle()).toEqual('JS');
            });

            it('should return  start', function() {
                expect(event.getStart()).toEqual(null);
            });

            it('should return end', function() {
                expect(event.getEnd()).toEqual(null);
            });

            it('should return editable', function() {
                expect(event.getEditable()).toEqual(true);
            });

            it('should return color', function() {
                expect(event.getColor()).toEqual('black');
            });

            it('should return text color', function() {
                expect(event.getTextColor()).toEqual('red');
            });

            it('should return classroom', function() {
                expect(event.getClassroom()).toEqual('765');
            });

            it('should return amount of students', function() {
                expect(event.getAmountOfStudents()).toEqual(2);
            });
        });

    });

});
