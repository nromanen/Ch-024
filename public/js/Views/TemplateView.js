define('TemplateView', ['jquery', 'underscore', 'backbone', 'text', 'text!aboutTemplate',
        'text!navBarTemplate', 'text!footerTemplate', 'text!homeTemplate',
        'text!helpTemplate', 'text!settingsTemplate'],

    function($, _, Backbone, text, aboutTemplate, navBarTemplate, footerTemplate, homeTemplate,
        helpTemplate, settingsTemplate) {

        var NavBarTemplateView = Backbone.View.extend({

            template: _.template(navBarTemplate),

            selectors: {
                headerTeg: 'header'
            },

            render: function() {
                $(this.selectors.headerTeg).html(this.template());
                return this;
            }
        });

        var FooterTemplateView = Backbone.View.extend({

            template: _.template(footerTemplate),

            selectors: {
                footerTag: 'footer'
            },

            render: function() {
                $(this.selectors.footerTag).html(this.template());
                return this;
            }
        });

        var HomeTemplateView = Backbone.View.extend({

            template: _.template(homeTemplate),

            selectors: {
                mainTag: 'main'
            },

            render: function() {
                $(this.selectors.mainTag).html(this.template());
                return this;
            }
        });

        var AboutTemplateView = Backbone.View.extend({

            template: _.template(aboutTemplate),

            selectors: {
                mainTag: 'main'
            },

            render: function() {
                $(this.selectors.mainTag).html(this.template());
                return this;
            }
        });

        var HelpTemplateView = Backbone.View.extend({

            template: _.template(helpTemplate),

            selectors: {
                mainTag: 'main'
            },

            render: function() {
                $(this.selectors.mainTag).html(this.template());
                return this;
            }
        });

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

        return {
            NavBarTemplateView: NavBarTemplateView,
            FooterTemplateView: FooterTemplateView,
            HomeTemplateView: HomeTemplateView,
            AboutTemplateView: AboutTemplateView,
            HelpTemplateView: HelpTemplateView,
            SettingsTemplateView: SettingsTemplateView
        };
    });
