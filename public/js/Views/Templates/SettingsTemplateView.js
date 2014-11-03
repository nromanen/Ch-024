define('SettingsTemplateView', [
    'jquery',
    'underscore',
    'backbone',
    'text',
    'text!settingsTemplate'
], function(
    $,
    _,
    Backbone,
    text,
    settingsTemplate) {

    var SettingsTemplateView = Backbone.View.extend({

        template: _.template(settingsTemplate),

        selectors: {
            mainTag: 'main'
        },

        render: function() {
            $(this.selectors.mainTag).html(this.template());
            return this;
        }

    });

    return SettingsTemplateView;

});
