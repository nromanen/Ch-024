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
    }

});