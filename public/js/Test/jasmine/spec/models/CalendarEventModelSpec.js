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

   /*

        getId: function() {
            return this.get('_id');
        },

        setSubject: function(value) {
            this.set('subject', value);
        },

        getSubject: function() {
            return this.get('subject');
        },

        setTitle: function(value) {
            this.set('title', value);
        },

        getTitle: function() {
            return this.get('title');
        },

        setStart: function(value) {
            this.set('start', value);
        },

        getStart: function() {
            return this.get('start');
        },

        setEnd: function(value) {
            this.set('end', value);
        },

        getEnd: function() {
            return this.get('end');
        },

        setEditable: function(value) {
            this.set('editable', value);
        },

        getEditable: function() {
            return this.get('editable');
        },

        setColor: function(value) {
            this.set('color', value);
        },

        getColor: function() {
            return this.get('color');
        },

        setTextColor: function(value) {
            this.set('textColor', value);
        },

        getTextColor: function() {
            return this.get('textColor');
        },

        setClassroom: function(value) {
            this.set('classroom', value);
        },

        getClassroom: function() {
            return this.get('classroom');
        },

        setAmountOfStudents: function(value) {
            this.set('amountOfStudents', value);
        },

        getAmountOfStudents: function() {
            return this.get('amountOfStudents');
        },

        getCid: function() {
            return this.get('cid');
        },

        setCid: function(value) {
            return this.set('cid', value);
        },

        validate: function(attrs) {
            var errors = [];
            if (attrs.classroom <= 1) {
                errors.push({
                    field: 'classForExam',
                    message: 'The number of classroom is required and must be number!'
                });
            }
            console.log(attrs.amountOfStud);
            if (isNaN(+(attrs.amountOfStudents))) {
                errors.push({
                    field: 'amountOfStud',
                    message: 'The amount of students is required and must be number!!'
                });
            }

            return errors.length ? errors : false;
        }

    });

    return CalendarEventModel;*/
});
