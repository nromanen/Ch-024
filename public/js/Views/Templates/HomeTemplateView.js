define('HomeTemplateView', ['jquery',
    'underscore',
    'backbone',
    'ControllerView',
    'SessionModel',
    'text',
    'text!homeTemplate',
    'text!subjectContainerTemplate',
    'text!assignedEventsTemplate'
], function($,
    _,
    Backbone,
    ControllerView,
    Session,
    text,
    homeTemplate,
    subjectContainerTemplate,
    assignedEventsTemplate) {

    var HomeTemplateView = Backbone.View.extend({

        template: _.template(homeTemplate),

        selectors: {
            mainTag: 'main',
            navTabs: '#navTabs',
            buttonCreate: '#buttonCreate'
        },

        _changeTemplate: function() {
            this.role = Session.getRole();
            if((this.role === 'admin')||(this.role === 'teacher')) {
                this.subjectTemplate = _.template(subjectContainerTemplate)();
            } else {
                this.subjectTemplate = _.template(assignedEventsTemplate)();
            }
        },

        render: function() {
            this._changeTemplate();
            this.$el.html(this.template({subjectContainer: this.subjectTemplate}));
            $(this.selectors.mainTag).html(this.$el);

            return this;
        }
    });
    return HomeTemplateView;
});
