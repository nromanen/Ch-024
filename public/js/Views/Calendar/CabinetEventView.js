define('CabinetEventView', [
    'jquery',
    'underscore',
    'backbone',
    'moment',
    'text!teacherCabinetEventTemplate',
    'ControllerView',
    'CabinetModalView'
], function(
    $,
    _,
    Backbone,
    moment,
    teacherCabinetEventTemplate,
    ControllerView,
    CabinetModalView) {

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
                    url: '/teachers/students/' + that.model.getEvent()._id,
                    type: 'GET'
                })
                .done(function(res) {
                    that.model.setStudents(res);
                    new CabinetModalView({model: that.model}).render();
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
            this.model.set('start', moment(this.model.getEvent().start).format('HH:mm Do MMM YYYY'));
            this.model.set('end', moment(this.model.getEvent().end).format('HH:mm Do MMM YYYY'));
            this.$el.html(this.template(this.model.toJSON()));
            this.attachEvents();
            return this;
        }

    });

    return CabinetEventView;

});
