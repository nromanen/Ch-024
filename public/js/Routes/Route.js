require([
    'jquery',
    'underscore',
    'backbone',
    'SessionModel',
    'TemplateView',
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
    'SettingsUserModel',
    'AdminActionBarGroup',
    'AdminTeachersCollection',
    'AdminSubjectsCollection',
    'AdminCategoriesCollection'
], function($, _, Backbone, Session, TemplateView, LoginUserView, EventsCollection,
            CalendarView, SubjectsCollection, SubjectModel, SubjectsView, CategoryModel,
            CategoriesView, CategoriesCollection, SettingsUserView, SettingsUserModel,
            AdminActionBarGroup, AdminTeachersCollection, AdminSubjectsCollection, AdminCategoriesCollection) {

    window.Calendar = {};

    var Router = Backbone.Router.extend({
        session: null,

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
            this.session = Session;
            this._initializeEvents();
        },

        _checkAuth: function() {
             var path = Backbone.history.location.hash;
             if (!Session.get('authenticated')) {
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
                    model: new CategoryModel
                });
                new SubjectsView({
                    collectionSubject: this.subjectsCollection,
                    collectionCategory: this.categoriesCollection,
                    model: new SubjectModel
                });
                this._checkAuth();

                // this.categoriesCollection.add([
                //      {title: "IT and Configuration Management"},
                //     {title: "Quality Control"},
                //     {title: "Software Development"}]);
                //this.selectMenuItem('home-menu');
            });

            this.on('route:helpPage', function() {
                new TemplateView.HelpTemplateView().render();
                this._checkAuth();
                // this.selectMenuItem('help-menu');
            });
            this.on('route:aboutPage', function() {
                new TemplateView.AboutTemplateView().render();
                this._checkAuth();
                // this.selectMenuItem('about-menu');
            });
            this.on('route:settingsPage', function() {
                new TemplateView.SettingsTemplateView().render();
                new SettingsUserView({
                    model: new SettingsUserModel
                }).render();
                this._checkAuth();
                //this.selectMenuItem('');
            });
            this.on('route:loginPage', function() {
                new LoginUserView().render();
                this._checkAuth();

            });
            this.on('route:adminPage', function() {
                new TemplateView.AdminTemplateView().render();
                this.notapprovedTeachersCollection =  new AdminTeachersCollection();
                this.notapprovedSubjectsCollection = new AdminSubjectsCollection();
                this.notapprovedCategoriesCollection = new AdminCategoriesCollection();
                new AdminActionBarGroup({
                    notapprovedTeachersCollection: this.notapprovedTeachersCollection,
                    notapprovedSubjectsCollection: this.notapprovedSubjectsCollection,
                    notapprovedCategoriesCollection: this.notapprovedCategoriesCollection

                    //templateID: '#teacherInfoTemplate',
                   // groupClass: '.teachersInfo'
                });
                this._checkAuth();
            });
        },

        _headerFooterContainersRender: function() {
            new TemplateView.NavBarTemplateView().render();
            new TemplateView.FooterTemplateView().render();
        }

        /*  selectMenuItem: function(menuItem) {
         $('.navbar .nav li').removeClass('active');
         if (menuItem) {
         $('.' + menuItem).addClass('active');
         }
         }*/

    });

    Calendar.Controller = new Router;
    $.ajaxSetup({
        statusCode: {
            401: function() {
                alert('You are not authorized');
                window.location.replace('/');
            }
            /*403: function() {
                alert('Access denied');
                window.location.replace('/');
            }*/
        }
    });
    Backbone.history.start();
});
