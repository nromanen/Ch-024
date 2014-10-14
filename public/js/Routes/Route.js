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
    'AdminTemplateView',
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
    'SettingsUserModel',
    'AdminActionBarGroup',
    'AdminTeachersCollection',
    'AdminSubjectsCollection',
    'AdminCategoriesCollection'
<<<<<<< HEAD
], function($, _, Backbone,    NavBarTemplateView,
            FooterTemplateView,
            ContainerCalendarTemplateView,
            AboutTemplateView,
            HomeTemplateView,
            HelpTemplateView,
            SettingsTemplateView,
            AdminTemplateView,
            Session, LoginUserView, EventsCollection,
            CalendarView, SubjectsCollection, SubjectModel, SubjectsView, CategoryModel,
            CategoriesView, CategoriesCollection, SettingsUserView, SettingsUserModel,
            AdminActionBarGroup, AdminTeachersCollection, AdminSubjectsCollection, AdminCategoriesCollection) {
=======
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
    AdminTemplateView,
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
    SettingsUserModel,
    AdminActionBarGroup,
    AdminTeachersCollection,
    AdminSubjectsCollection,
    AdminCategoriesCollection) {
>>>>>>> b787ac029d513919e2640b1172be47451dacb698

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
            // var user = JSON.parse(sessionStorage.getItem('user'));
            // console.log(user);
            if (!(this.session.get('user')['session']['user'])) {
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
<<<<<<< HEAD
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
=======

            this.on('route:homePage', function() {
                new ContainerCalendarTemplateView().render();
                this._headerFooterContainersRender();
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
>>>>>>> b787ac029d513919e2640b1172be47451dacb698
                });
                // this.categoriesCollection.add([
                //     {title: "IT and Configuration Management"},
                //     {title: "Quality Control"},
                //     {title: "Software Development"}]);
                // this.selectMenuItem('home-menu');
            });

            this.on('route:helpPage', function() {
<<<<<<< HEAD
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

=======

                new ContainerCalendarTemplateView().render();
                this._headerFooterContainersRender();
                new HelpTemplateView().render();
                this._checkAuth();
>>>>>>> b787ac029d513919e2640b1172be47451dacb698
                // this.selectMenuItem('help-menu');

            });

            this.on('route:aboutPage', function() {
<<<<<<< HEAD
                that._headerFooterContainersRender();
                this._checkAuth(function() {
                    new AboutTemplateView().render();
                });
=======
                new ContainerCalendarTemplateView().render();
                this._headerFooterContainersRender();
                new AboutTemplateView().render();
>>>>>>> b787ac029d513919e2640b1172be47451dacb698
                // this.selectMenuItem('about-menu');
                this._checkAuth();
            });

            this.on('route:settingsPage', function() {
<<<<<<< HEAD
                that._headerFooterContainersRender();
                this._checkAuth(function() {
                    new SettingsTemplateView().render();
                    new SettingsUserView({
                        model: new SettingsUserModel
                    }).render();
                });
=======
                new ContainerCalendarTemplateView().render();
                this._headerFooterContainersRender();
                new SettingsTemplateView().render();
                new SettingsUserView({
                    model: new SettingsUserModel
                }).render();
                this._checkAuth();
>>>>>>> b787ac029d513919e2640b1172be47451dacb698
                //this.selectMenuItem('');

            });
            this.on('route:loginPage', function() {
<<<<<<< HEAD
                that._headerFooterContainersRender();
               // this._checkAuth(function() {
                    new LoginUserView().render();
               // });
=======

                new LoginUserView().render();
                this._checkAuth();
>>>>>>> b787ac029d513919e2640b1172be47451dacb698
            });

            this.on('route:adminPage', function() {
<<<<<<< HEAD
                new AdminTemplateView().render();
                this.notapprovedTeachersCollection =  new AdminTeachersCollection();
=======
                new ContainerCalendarTemplateView().render();
                this._headerFooterContainersRender();
                new AdminTemplateView().render();
                this.notapprovedTeachersCollection = new AdminTeachersCollection();
>>>>>>> b787ac029d513919e2640b1172be47451dacb698
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

    Calendar.Controller = new Router;
    $.ajax({
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
