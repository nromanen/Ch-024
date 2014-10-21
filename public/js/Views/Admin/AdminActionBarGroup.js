define('AdminActionBarGroup', ['jquery', 'underscore', 'backbone', 'AdminActionBar'],
    function($, _, Backbone, AdminActionBar) {
    var AdminActionBarGroup = Backbone.View.extend({

	initialize: function(options) {
        this.notapprovedTeachersCollection = options.notapprovedTeachersCollection;
        this.notapprovedSubjectsCollection = options.notapprovedSubjectsCollection;
        this.notapprovedCategoriesCollection = options.notapprovedCategoriesCollection;

        this.notapprovedTeachersCollection.bind('add', this._renderTeacher, this);
        this.notapprovedSubjectsCollection.bind('add', this._renderSubject, this);
        this.notapprovedCategoriesCollection.bind('add', this._renderCategory, this);
        this.notapprovedTeachersCollection.fetch();
        this.notapprovedSubjectsCollection.fetch();
        this.notapprovedCategoriesCollection.fetch();
	},

    _renderTeacher: function(model) {
        $('.teachersInfo').append(
            new AdminActionBar({
                model: model,
                templateID: 'teacherInfoTemplate'
        }).render()
        );
    },

    _renderSubject: function(model) {
        $('.subjectsInfo').append(
            new AdminActionBar({
                model: model,
                templateID: 'subjectInfoTemplate'
            }).render()
        );
    },

    _renderCategory: function(model) {
        $('.categoriesInfo').append(
            new AdminActionBar({
                model: model,
                templateID: 'categoryInfoTemplate'
            }).render()
        );
    }


});
	return AdminActionBarGroup;
});
