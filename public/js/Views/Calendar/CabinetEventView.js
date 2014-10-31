define('CabinetEventView', ['jquery', 'underscore', 'backbone', 'text!teacherCabinetEventTemplate'], function($, _, Backbone, teacherCabinetEventTemplate) {
    var CabinetEventView = Backbone.View.extend({

        template: _.template(teacherCabinetEventTemplate),

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }

    });

    return CabinetEventView;
});
