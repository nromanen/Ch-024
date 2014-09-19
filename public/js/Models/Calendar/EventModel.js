var EventModel = Backbone.Model.extend ({

    defaults:function() {
        return {
            //eventId - change model id with id from db
            //  user: UserModel,
            subject: SubjectModel,
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

    setSubjectAttribute: function(value) {
        this.set('subject', value);
    },

    getSubjectAttribute: function() {
        return this.get('subject');
    },

    setTitleAttribute: function(value) {
        this.set('title', value);
    },

    getTitleAttribute: function() {
        return this.get('title');
    },

    setStartAttribute: function(value) {
        this.set('start', value);
    },

    getStartAttribute: function() {
        return this.get('start');
    },

    setEndAttribute: function(value) {
        this.set('end', value);
    },

    getEndAttribute: function() {
        return this.get('end');
    },

    setEditableAttribute: function(value) {
        this.set('editable', value);
    },

    getEditableAttribute: function() {
        return this.get('editable');
    },

    setColorAttribute: function(value) {
        this.set('color', value);
    },

    getColorAttribute: function() {
        return this.get('color');
    },

    setTextColorAttribute: function(value) {
        this.set('textColor', value);
    },

    getTextColorAttribute: function() {
        return this.get('textColor');
    },

    setClassroomAttribute: function(value) {
        this.set('classroom', value);
    },

    getClassroomAttribute: function() {
        return this.get('classroom');
    },

    setAmountOfStudentsAttribute: function(value) {
        this.set('amountOfStudents', value);
    },

    getAmountOfStudentsAttribute: function() {
        return this.get('amountOfStudents');
    }

});