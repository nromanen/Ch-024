define('CabinetEventView', ['jquery', 'underscore', 'backbone', 'text!teacherCabinetEventTemplate'], function($, _, Backbone, teacherCabinetEventTemplate) {
    var CabinetEventView = Backbone.View.extend({

        template: _.template(teacherCabinetEventTemplate),

        selectors: {
            numberOfStudents: '.numberOfStudents'
        },

        initialize: function() {
            this.model.on('destroy', this.render, this);
            this.model.on('change', this.render, this);
        },

        attachEvents: function() {
            this.$(this.selectors.numberOfStudents).on('click', $.proxy(this._getStudents, this));
        },

        _getStudents: function() {
            var that = this;
            $.ajax({
                url: '/teachers/students/' + that.model.get('event')._id,
                type: 'GET'
            })
                .done(function(res) {
                    that.model.set({students: res});
                    console.log(that.model.toJSON());
                    var studentsData = [];
                    for(var i in Object.keys(that.model.get('students'))) {
                        studentsData.push(that.model.get('students')[i].user.username);
                    }
                    that.$(that.selectors.numberOfStudents).popover({content: studentsData});
                    that.$(that.selectors.numberOfStudents).popover('toggle');
                })
                .error(function(res) {
                    console.log(res);
                }).always(function() {
                    setTimeout(function() {
                        that.$(that.selectors.numberOfStudents).popover('destroy');
                    }, 10000);
                });
        },

        render: function() {
            this.model.set('amountOfFreePlace', this.model.get('event').amountOfStudents - this.model.get('event').currentCount);
            this.$el.html(this.template(this.model.toJSON()));
            this.attachEvents();
            return this;
        }

    });

    return CabinetEventView;
});
