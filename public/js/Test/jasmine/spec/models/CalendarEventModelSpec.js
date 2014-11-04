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

        it('should be able to create model', function() {
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

        describe('has property setter functions that', function() {
            var event = new CalendarEventModel(data);

            it('should set title', function() {
                event.setTitle('JavaScript');
                expect(event.get('title')).toEqual('JavaScript');
            });

            it('should set start', function() {
                event.setStart(2);
                expect(event.get('start')).toEqual(2);
            });

            it('should set end', function() {
                event.setEnd(3);
                expect(event.get('end')).toEqual(3);
            });

            it('should set editable', function() {
                event.setEditable(false);
                expect(event.get('editable')).toEqual(false);
            });

            it('should set color', function() {
                event.setColor('red');
                expect(event.get('color')).toEqual('red');
            });

            it('should set text color', function() {
                event.setTextColor('blue');
                expect(event.get('textColor')).toEqual('blue');
            });

            it('should set classroom', function() {
                event.setClassroom('645');
                expect(event.get('classroom')).toEqual('645');
            });

            it('should set amount of students', function() {
                event.setAmountOfStudents(10);
                expect(event.get('amountOfStudents')).toEqual(10);
            });
        });

    });

});
