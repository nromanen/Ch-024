define('TeacherCabinetTemplateView', ['jquery', 'underscore', 'backbone', 'text', 'text!teacherCabinetTemplate'],
    function($, _, Backbone, text, teacherCabinetTemplate) {

    var TeacherCabinetTemplateView = Backbone.View.extend({
        
        template: _.template(teacherCabinetTemplate),

        selectors: {
            mainTag: 'main'
        },

        render: function() {
            $(this.selectors.mainTag).html(this.template());
            return this;
        }
    });
    return TeacherCabinetTemplateView;
});