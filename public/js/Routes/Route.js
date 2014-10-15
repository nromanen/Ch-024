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
    'AdminCategoriesCollection',
    'ControllerView'
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
    AdminCategoriesCollection,
    ControllerView) {

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
            if (!this.session.get('user')) {
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
                });
                new SubjectsView({
                    collectionSubject: this.subjectsCollection,
                    collectionCategory: this.categoriesCollection,
                    model: new SubjectModel
                });
                this._checkAuth();
                ControllerView.selectMenuItem('home-menu');
            });

            this.on('route:helpPage', function() {

                new ContainerCalendarTemplateView().render();
                this._headerFooterContainersRender();
                new HelpTemplateView().render();
                this._checkAuth();
                ControllerView.selectMenuItem('help-menu');

            });

            this.on('route:aboutPage', function() {
                new ContainerCalendarTemplateView().render();
                this._headerFooterContainersRender();
                new AboutTemplateView().render();
                this._checkAuth();
                ControllerView.selectMenuItem('about-menu');
            });

            this.on('route:settingsPage', function() {
                new ContainerCalendarTemplateView().render();
                this._headerFooterContainersRender();
                new SettingsTemplateView().render();
                new SettingsUserView({
                    model: new SettingsUserModel
                }).render();
                this._checkAuth();
                ControllerView.selectMenuItem('');

            });
            this.on('route:loginPage', function() {
                new LoginUserView().render();
                this._checkAuth();
            });

            this.on('route:adminPage', function() {
                new ContainerCalendarTemplateView().render();
                this._headerFooterContainersRender();
                new AdminTemplateView().render();
                this.notapprovedTeachersCollection = new AdminTeachersCollection();
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
                ControllerView.selectMenuItem('admin-menu');
            });
        },

        _headerFooterContainersRender: function() {
            new ContainerCalendarTemplateView().render();
            new NavBarTemplateView().render();
            new FooterTemplateView().render();
        }

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
