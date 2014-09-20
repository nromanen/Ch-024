define('SubjectsCollection', ['jquery', 'underscore', 'backbone', 'SubjectModel'], function($, _, Backbone, SubjectModel) {
    var SubjectsCollection = Backbone.Collection.extend({

        model: SubjectModel

    });

    return SubjectsCollection;
});
