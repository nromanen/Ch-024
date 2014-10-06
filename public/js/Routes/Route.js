require([
    'jquery',
    'underscore',
    'backbone',
    'TemplateView',
    'LoginUserModel',
    'LoginUserView',
    'CalendarEventsCollection',
    'CalendarView',
    'SubjectModel',
    'SubjectsCollection',
    'SubjectsView',
    'CategoryModel',
    'CategoriesView',
    'CategoriesCollection',
    'SettingsUserView',
    'SettingsUserModel'
], function($, _, Backbone, TemplateView, LoginUserModel, LoginUserView, EventsCollection,
            CalendarView, SubjectModel, SubjectsCollection, SubjectsView, CategoryModel,
            CategoriesView, CategoriesCollection, SettingsUserView, SettingsUserModel) {

    var Router = Backbone.Router.extend({

        routes: {
            "": "loginPage",
            "home": "homePage",
            "help": "helpPage",
            "about": "aboutPage",
            "settings": "settingsPage",
            "login": "loginPage"
        },

        initialize: function() {
            this._initializeEvents();
        },

        _initializeEvents: function() {
            this.on('route:homePage', function() {
                new TemplateView.ContainerCalendarView().render();
                this._headerFooterContainersRender();
                new TemplateView.HomeTemplateView().render();
                this.eventsCollection = new EventsCollection();
                this.categoriesCollection = new CategoriesCollection();
                this.subjectsCollection = new SubjectsCollection();
                new CalendarView({
                    collection: this.eventsCollection
                }).render();
                new CategoriesView({
                    collection: this.categoriesCollection,
                    model : new CategoryModel
                });
                new SubjectsView({
                    collectionSubject: this.subjectsCollection,
                    collectionCategory: this.categoriesCollection,
                    model: new SubjectModel
                });
                
                // this.categoriesCollection.add([
                //      {title: "IT and Configuration Management"},
                //     {title: "Quality Control"},
                //     {title: "Software Development"}]);
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
                    model: new LoginUserModel,
                    router: this
                }).render();

            });
        },

        _headerFooterContainersRender: function() {
            new TemplateView.NavBarTemplateView().render();
            new TemplateView.FooterTemplateView().render();
        },

        redirectToHome: function() {
            this.navigate('#home', {trigger: true});
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
