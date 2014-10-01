define('CalendarEventModel', ['jquery', 'underscore', 'backbone', 'SubjectModel'], function($, _, Backbone, SubjectModel) {
    var CalendarEventModel = Backbone.Model.extend({

        defaults:function() {
            return {
                //eventId - change model id with id from db
                //  user: UserModel,
                subject: SubjectModel,
                subjectId: '',
                title: '',
                start: null,
                end: null,
                editable: true,
                color: '',
                textColor: 'red',
                classroom : '',
                amountOfStudents: 0
            }
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
        }

    });

    return CalendarEventModel;
});
