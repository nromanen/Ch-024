define('CabinetEventView', [
    'jquery',
    'underscore',
    'backbone',
    'text!teacherCabinetEventTemplate',
    'ControllerView'
], function(
    $,
    _,
    Backbone,
    teacherCabinetEventTemplate,
    ControllerView) {

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
            this.$(this.selectors.numberOfStudents).on('mouseover', $.proxy(this._getStudents, this));
            this.$(this.selectors.numberOfStudents).on('mouseleave', $.proxy(this._removePopoverToggle, this));
        },

        _getStudents: function() {
            var that = this;
            $.ajax({
                    url: '/teachers/students/' + that.model.getEvent()._id,
                    type: 'GET'
                })
                .done(function(res) {
                    that.model.setStudents(res);
                    var studentsData = '';
                    _.each(that.model.getStudents(), function(element, index) {
                        studentsData += (that.model.getStudents()[index].user.surname + ' : ' + that.model.getStudents()[index].user.phone + ' ');
                    });
                    that.$(that.selectors.numberOfStudents).popover({
                        content: studentsData,
                        title: "Students"
                    });
                })
                .error(function(res) {
                    ControllerView.showAlertError({message: 'Sorry, but our service has a unknown error!'});
                })
                .always(function() {
                    that.$(that.selectors.numberOfStudents).popover('show');
            });
        },

        _removePopoverToggle: function() {
            this.$(this.selectors.numberOfStudents).popover('destroy');
        },

        render: function() {
            this.model.set('amountOfFreePlace', this.model.get('event').amountOfStudents - this.model.getEvent().currentCount);
            this.$el.html(this.template(this.model.toJSON()));
            this.attachEvents();
            return this;
        }

    });

    return CabinetEventView;

});
