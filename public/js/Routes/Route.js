require([
    'jquery',
    'underscore',
    'backbone',
    'NavBarTemplateView',
    'FooterTemplateView',
    'ContainerCalendarTemplateView',
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
    'ControllerView',
    'TeacherCabinetTemplateView',
    'CabinetEventsView',
    'CabinetCollection',
    'CabinetModel'
], function($,
    _,
    Backbone,
    NavBarTemplateView,
    FooterTemplateView,
    ContainerCalendarTemplateView,
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
    ControllerView,
    TeacherCabinetTemplateView,
    CabinetEventsView,
    CabinetCollection,
    CabinetModel) {

    window.Calendar = {};

    var Router = Backbone.Router.extend({
        session: null,

        routes: {
            "": "loginPage",
            "home": "homePage",
            "help": "helpPage",
            "settings": "settingsPage",
            "cabinet": "cabinetPage",
            "admin": "adminPage"
        },

        initialize: function() {
            this.session = Session;
            this._initializeEvents();
            this.role = this.session.getRole();
        },

        _checkAuth: function() {
            var path = Backbone.history.location.hash;
            if (!this.session.getSession('userSession')) {
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

            this.on('route', function() {
                this._checkAuth();
            });

            this.on('route:homePage', function() {
                new ContainerCalendarTemplateView().render();
                this._headerFooterContainersRender();
                new HomeTemplateView().render();

                this.eventsCollection = new EventsCollection();
                new CalendarView({
                    collection: this.eventsCollection
                }).render();

                this.categoriesCollection = new CategoriesCollection();
                new CategoriesView({
                    collection: this.categoriesCollection,
                    model: new CategoryModel
                });

                this.subjectsCollection = new SubjectsCollection();
                new SubjectsView({
                    collectionSubject: this.subjectsCollection,
                    collectionCategory: this.categoriesCollection,
                    model: new SubjectModel
                });
                ControllerView.selectMenuItem('home-menu');
            });

            this.on('route:helpPage', function() {

                new ContainerCalendarTemplateView().render();
                this._headerFooterContainersRender();
                new HelpTemplateView().render();
                ControllerView.selectMenuItem('help-menu');

            });

            this.on('route:settingsPage', function() {
                new ContainerCalendarTemplateView().render();
                this._headerFooterContainersRender();
                new SettingsTemplateView().render();
                new SettingsUserView({
                    model: new SettingsUserModel
                }).render();
                ControllerView.selectMenuItem('');

            });
            this.on('route:loginPage', function() {
                new LoginUserView().render();
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
                });
                ControllerView.selectMenuItem('admin-menu');
            });

            this.on('route:cabinetPage', function() {
                new ContainerCalendarTemplateView().render();
                this._headerFooterContainersRender();
                new TeacherCabinetTemplateView().render();
                new CabinetEventsView({
                    collection: new CabinetCollection
                });
                ControllerView.selectMenuItem('сabinet-menu');
            });
        },

        _headerFooterContainersRender: function() {
            new ContainerCalendarTemplateView().render();
            new NavBarTemplateView().render();
            new FooterTemplateView().render();
        }

    });

    Calendar.Controller = new Router;
    Backbone.history.start();
});
