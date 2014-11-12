define('CabinetModalView', [
    'jquery',
    'underscore',
    'backbone',
    'text!teacherCabinetModalTemplate'
], function (
    $,
    _,
    Backbone,
    teacherCabinetModalTemplate) {

    var CabinetModalView = Backbone.View.extend({
        
        template: _.template(teacherCabinetModalTemplate),

        initialize: function(options) {
            this.model = options.model;
            this.$el = $(this.template(options.model.toJSON()));
            this.$('#closeTeacherModal').off().on('click', $.proxy(this._cabinetDelete, this));
        },

        _cabinetDelete: function() {
            this.model.destroy();
            this.remove();
            $('.modal-backdrop').hide();
        },

        render: function() {
            this.$el.modal('show');
            return this;
        }

    });

    return CabinetModalView;

});