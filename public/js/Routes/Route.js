require(['jquery', 'underscore', 'backbone', 'TemplateView', 'LoginUserModel', 'LoginUserView', 'EventsCollection', 'CalendarView',
    'SubjectsCollection', 'SubjectsView', 'CategoriesView', 'CategoriesCollection', 'SettingsUserView', 'SettingsUserModel'],
    function($, _, Backbone, TemplateView, LoginUserModel, LoginUserView, EventsCollection, CalendarView, SubjectsCollection, SubjectsView,
        CategoriesView, CategoriesCollection, SettingsUserView, SettingsUserModel) {

    var Router = Backbone.Router.extend({

        routes: {
            "": "homePage",
            "home": "homePage",
            "help": "helpPage",
            "about": "aboutPage",
            "settings": "settingsPage",
            "login": "loginPage"
        },

        initialize: function() {
            this._headerContainer();
            this._footerContainer();
            this._initializeEvents();
        },

        _initializeEvents: function() {
            this.on('route:homePage', function() {
                new TemplateView.HomeTemplateView().render();
                this.eventsCollection = new EventsCollection();
                this.subjectsCollection = new SubjectsCollection();
                new CalendarView({
                    collection: this.eventsCollection
                }).render();
                new SubjectsView({
                    collection: this.subjectsCollection
                });
                new CategoriesView({
                    collection: new CategoriesCollection
                });
                //this.selectMenuItem('home-menu');
            });

            this.on('route:helpPage', function() {
                new TemplateView.HelpTemplateView().render();
                // this.selectMenuItem('help-menu');
            });
            this.on('route:aboutPage', function() {
                new TemplateView.AboutTemplateView().render();
                // this.selectMenuItem('about-menu');
            });
            this.on('route:settingsPage', function() {
                new TemplateView.SettingsTemplateView().render();
                new SettingsUserView({
                    model: new SettingsUserModel
                }).render();
                //this.selectMenuItem('');
            });
            this.on('route:loginPage', function() {
                new LoginUserView({
                    model: new LoginUserModel
                }).render();
            });
        },

        _headerContainer: function() {
            new TemplateView.NavBarTemplateView().render();
        },

        _footerContainer: function() {
            new TemplateView.FooterTemplateView().render();
        }
        /*  selectMenuItem: function(menuItem) {
        $('.navbar .nav li').removeClass('active');
        if (menuItem) {
            $('.' + menuItem).addClass('active');
        }
    }*/

    });

    new Router;
    Backbone.history.start();
});
