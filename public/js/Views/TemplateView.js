define('TemplateView', ['jquery', 'underscore', 'backbone'], function($, _, Backbone) {
    var NavBarTemplateView = Backbone.View.extend({

        template: _.template($('#navBarTemplate').html()),

        selectors: {
            headerTeg: 'header'
        },

        render: function() {
            $(this.selectors.headerTeg).html(this.template());
            return this;
        }
    });

    var FooterTemplateView = Backbone.View.extend({

        template: _.template($('#footerTemplate').html()),

        selectors: {
            footerTag: 'footer'
        },

        render: function() {
            $(this.selectors.footerTag).html(this.template());
            return this;
        }
    });

    var HomeTemplateView = Backbone.View.extend({

        template: _.template($('#homeTemplate').html()),

        selectors: {
            mainTag: 'main'
        },

        render: function() {
            $(this.selectors.mainTag).html(this.template());
            return this;
        }
    });

    var AboutTemplateView = Backbone.View.extend({

        template: _.template($('#aboutTemplate').html()),

        selectors: {
            mainTag: 'main'
        },

        render: function() {
            $(this.selectors.mainTag).html(this.template());
            return this;
        }
    });

    var HelpTemplateView = Backbone.View.extend({

        template: _.template($('#helpTemplate').html()),

        selectors: {
            mainTag: 'main'
        },

        render: function() {
            $(this.selectors.mainTag).html(this.template());
            return this;
        }
    });

    var SettingsTemplateView = Backbone.View.extend({

        template: _.template($('#settingsTemplate').html()),

        selectors: {
            mainTag: 'main'
        },

        render: function() {
            $(this.selectors.mainTag).html(this.template());
            return this;
        }
    });

    return {
        NavBarTemplateView: NavBarTemplateView,
        FooterTemplateView: FooterTemplateView,
        HomeTemplateView: HomeTemplateView,
        AboutTemplateView: AboutTemplateView,
        HelpTemplateView: HelpTemplateView,
        SettingsTemplateView: SettingsTemplateView
    };
});
