define('AdminSubjectsCollection', [
    'jquery',
    'underscore',
    'backbone',
    'SubjectModel'
],
    function(
        $,
        _,
        Backbone,
        SubjectModel) {

        var AdminSubjectsCollection = Backbone.Collection.extend({

            url: '/subjects/notapproved',
            model: SubjectModel

        });

        return AdminSubjectsCollection;

    }

);
