define('AdminActionBarGroup', [
    'jquery',
    'underscore',
    'backbone',
    'AdminActionBar'
], function(
    $,
    _,
    Backbone,
    AdminActionBar) {

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

            this._attachEvents();
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
            console.log(model);
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
        },

        _attachEvents: function() {
            $('.panel-heading').bind('click', $.proxy(this._collapseIconChange, this));
            $('.sortTeachers').bind('click', $.proxy(this._sortTeachers, this));
            $('.sortCategories').bind('click', $.proxy(this._sortCategories, this));
            $('.sortSubjects').bind('click', $.proxy(this._sortSubjects, this));
        },

        _collapseIconChange: function(that) {
            targetID = that.currentTarget.dataset.target;
            $(targetID + "Icon").toggleClass("collapseIconOut collapseIconIn");
        },

        _sortTeachers: function(that) {
            this.sortType = that.currentTarget.dataset.type;
            $('.teachersInfo').html('');
            var sortedArray = _.sortBy(this.notapprovedTeachersCollection.models, function(element) {
                return element.attributes[that.currentTarget.dataset.sort];
            });
            if (this.sortType === 'false') {
                sortedArray.reverse();
            }
            $(that.currentTarget).context.dataset.type = (this.sortType === 'true') ? false : true;
            _.each(sortedArray, function(number, value) {
                this._renderTeacher(sortedArray[value]);
            }, this);
        },

        _sortCategories: function(that) {
            this.sortType = that.currentTarget.dataset.type;
            $('.categoriesInfo').html('');
            var sortedArray = _.sortBy(this.notapprovedCategoriesCollection.models, function(element) {
                return element.attributes[that.currentTarget.dataset.sort];
            });
            if (this.sortType === 'false') {
                sortedArray.reverse();
            }
            $(that.currentTarget).context.dataset.type = (this.sortType === 'true') ? false : true;
            _.each(sortedArray, function(number, value) {
                this._renderCategory(sortedArray[value]);
            }, this);
        },

        _sortSubjects: function(that) {
            this.sortType = that.currentTarget.dataset.type;
            $('.subjectsInfo').html('');
            var sortedArray = _.sortBy(this.notapprovedSubjectsCollection.models, function(element) {
                return element.attributes[that.currentTarget.dataset.sort];
            });
            if (this.sortType === 'false') {
                sortedArray.reverse();
            }
            $(that.currentTarget).context.dataset.type = (this.sortType === 'true') ? false : true;
            _.each(sortedArray, function(number, value) {
                this._renderSubject(sortedArray[value]);
            }, this);
        }

    });

    return AdminActionBarGroup;

});
