define('TemplateView', ['jquery', 'underscore', 'backbone','SessionModel', 'text',
        'text!navBarTemplate', 'text!footerTemplate', 'text!containerCalendarTemplate', 'text!aboutTemplate', 'text!homeTemplate',
        'text!helpTemplate', 'text!settingsTemplate'
    ],

    function($, _, Backbone, Session, text, navBarTemplate, footerTemplate, containerCalendarTemplate, aboutTemplate, homeTemplate,
        helpTemplate, settingsTemplate) {

        var TemplateView = [];

        var NavBarTemplateView = Backbone.View.extend({

            template: _.template(navBarTemplate),

            selectors: {
                headerTeg: 'header',
                logOutButton: '#logout'
            },

            initialize: function() {
                this.$el.html(this.template());
                this._attachEvents();

            },

            _attachEvents: function() {
                this.$(this.selectors.logOutButton).on("click", $.proxy(this._logout, this));
            },

            _logout: function() {
                Session.logout();
            },

            render: function() {
                
                $(this.selectors.headerTeg).html(this.$el);

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

        var ContainerCalendarView = Backbone.View.extend({

            template: _.template(containerCalendarTemplate),

            selectors: {
                bodyTag: 'body'
            },

            render: function() {
                $(this.selectors.bodyTag).html(this.template());
                return this;
            }
        });



        for (var i = 8; i < arguments.length; i++) {
            TemplateView[i - 8] = Backbone.View.extend({

                template: _.template(arguments[i]),

                selectors: {
                    mainTag: 'main'
                },

                render: function() {
                    $(this.selectors.mainTag).html(this.template());
                    return this;
                }
            });
        };



        // var AboutTemplateView = Backbone.View.extend({

        //     template: _.template(aboutTemplate),

        //     selectors: {
        //         mainTag: 'main'
        //     },

        //     render: function() {
        //         $(this.selectors.mainTag).html(this.template());
        //         return this;
        //     }
        // });

        // var HelpTemplateView = Backbone.View.extend({

        //     template: _.template(helpTemplate),

        //     selectors: {
        //         mainTag: 'main'
        //     },

        //     render: function() {
        //         $(this.selectors.mainTag).html(this.template());
        //         return this;
        //     }
        // });

        // var SettingsTemplateView = Backbone.View.extend({

        //     template: _.template(settingsTemplate),

        //     selectors: {
        //         mainTag: 'main'
        //     },

        //     render: function() {
        //         $(this.selectors.mainTag).html(this.template());
        //         return this;
        //     }
        // });

        return {
            NavBarTemplateView: NavBarTemplateView,
            FooterTemplateView: FooterTemplateView,
            ContainerCalendarView: ContainerCalendarView,
            AboutTemplateView: TemplateView[0],
            HomeTemplateView: TemplateView[1],
            HelpTemplateView: TemplateView[2],
            SettingsTemplateView: TemplateView[3],
           // AdminTemplateView: TemplateView[4]
            
        };
    });
