define('HomeTemplateView', [
    'jquery',
    'underscore',
    'backbone',
    'ControllerView',
    'SessionModel',
    'AssignedEventsView',
    'SubscribeCollection',
    'SubscribeModel',
    'text',
    'text!homeTemplate',
    'text!subjectContainerTemplate'
], function(
    $,
    _,
    Backbone,
    ControllerView,
    Session,
    AssignedEventsView,
    SubscribeCollection,
    SubscribeModel,
    text,
    homeTemplate,
    subjectContainerTemplate) {

    var HomeTemplateView = Backbone.View.extend({

        template: _.template(homeTemplate),

        selectors: {
            mainTag: 'main',
            navTabs: '#navTabs',
            buttonCreate: '#buttonCreate'
        },

        _changeTemplate: function() {
            this.role = Session.getRole();
            if ((this.role === 'admin') || (this.role === 'teacher')) {
                this.subjectTemplate = _.template(subjectContainerTemplate)();
            } else {
                this.subscribeCollection = new SubscribeCollection();

                this.subjectTemplate = new AssignedEventsView({
                    collection: this.subscribeCollection
                }).render();
            }
        },

        render: function() {
            this._changeTemplate();
            this.$el.html(this.template());
            this.$('.subjectContainer').append(this.subjectTemplate);
            $(this.selectors.mainTag).html(this.$el);

            return this;
        }

    });

    return HomeTemplateView;

});
