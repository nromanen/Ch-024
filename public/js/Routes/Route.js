require([
    'jquery',
    'underscore',
    'backbone',
    'NavBarTemplateView',
    'FooterTemplateView',
    'ContainerCalendarTemplateView',
    'AboutTemplateView',
    'HomeTemplateView',
    'HelpTemplateView',
    'SettingsTemplateView',
    'SessionModel',
    'LoginUserView',
    'CalendarEventsCollection',
    'CalendarView',
    'SubjectsCollection',
    'SubjectModel',
    'SubjectsView',
    'CategoryModel',
    'CategoriesView',
    'CategoriesCollection',
    'SettingsUserView',
    'SettingsUserModel'
], function(
    $,
    _,
    Backbone,
    NavBarTemplateView,
    FooterTemplateView,
    ContainerCalendarTemplateView,
    AboutTemplateView,
    HomeTemplateView,
    HelpTemplateView,
    SettingsTemplateView,
    Session,
    LoginUserView,
    EventsCollection,
    CalendarView,
    SubjectsCollection,
    SubjectModel,
    SubjectsView,
    CategoryModel,
    CategoriesView,
    CategoriesCollection,
    SettingsUserView,
    SettingsUserModel) {

    var Router = Backbone.Router.extend({

        routes: {
            "": "loginPage",
            "home": "homePage",
            "help": "helpPage",
            "about": "aboutPage",
            "settings": "settingsPage",
            "login": "loginPage",
            "admin": "adminPage"
        },

        initialize: function() {
            this._initializeEvents();
        },

        _checkAuth: function(callback) {
            Session.getAuth(function() {
                var isAuth = Session.get('authenticated');
                var path = Backbone.history.location.hash;
                if (!isAuth) {
                    Backbone.history.navigate('/', {
                        trigger: true
                    });
                } else if (path === '') {
                    Backbone.history.navigate('#home', {
                        trigger: true
                    });
                } else {
                    Backbone.history.navigate(path, {
                        trigger: true
                    });
                }
            });
            callback();
        },

        _initializeEvents: function() {
            var that = this;
            this.on('route:homePage', function() {
                this._checkAuth(function() {
                    that._headerFooterContainersRender();
                    new HomeTemplateView().render();
                    this.eventsCollection = new EventsCollection();
                    this.categoriesCollection = new CategoriesCollection();
                    this.subjectsCollection = new SubjectsCollection();
                    new CalendarView({
                        collection: this.eventsCollection
                    }).render();
                    new CategoriesView({
                        collection: this.categoriesCollection,
                        model: new CategoryModel
                    });
                    new SubjectsView({
                        collectionSubject: this.subjectsCollection,
                        collectionCategory: this.categoriesCollection,
                        model: new SubjectModel
                    });
                });
                // this.categoriesCollection.add([
                //      {title: "IT and Configuration Management"},
                //     {title: "Quality Control"},
                //     {title: "Software Development"}]);
                //this.selectMenuItem('home-menu');
            });

            this.on('route:helpPage', function() {
                that._headerFooterContainersRender();
                this._checkAuth(function() {
                    new HelpTemplateView().render();
                });
                // var template;
                // if (!template) { 
                //     template = new TemplateView.HelpTemplateView().render();
                // } else {
                //     template.render();
                // }

                // this.selectMenuItem('help-menu');
            });
            this.on('route:aboutPage', function() {
                that._headerFooterContainersRender();
                this._checkAuth(function() {
                    new AboutTemplateView().render();
                });
                // this.selectMenuItem('about-menu');
            });
            this.on('route:settingsPage', function() {
                that._headerFooterContainersRender();
                this._checkAuth(function() {
                    new SettingsTemplateView().render();
                    new SettingsUserView({
                        model: new SettingsUserModel
                    }).render();
                });
                //this.selectMenuItem('');
            });
            this.on('route:loginPage', function() {
                that._headerFooterContainersRender();
                this._checkAuth(function() {
                    new LoginUserView().render();
                });
            });
        },

        _headerFooterContainersRender: function() {
            new ContainerCalendarTemplateView().render();
            new NavBarTemplateView().render();
            new FooterTemplateView().render();
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
