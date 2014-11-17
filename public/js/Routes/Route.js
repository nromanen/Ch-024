require([
    'jquery',
    'underscore',
    'backbone',
    'NavBarTemplateView',
    'FooterTemplateView',
    'ContainerCalendarTemplateView',
    'HomeTemplateView',
    'HelpTemplateView',
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
    'SettingsProfileModel',
    'SettingsPasswordModel',
    'AdminActionBarGroup',
    'AdminTeachersCollection',
    'AdminSubjectsCollection',
    'AdminCategoriesCollection',
    'ControllerView',
    'TeacherCabinetTemplateView',
    'CabinetEventsView',
    'CabinetCollection',
    'CabinetModel'
],
    function(
        $,
        _,
        Backbone,
        NavBarTemplateView,
        FooterTemplateView,
        ContainerCalendarTemplateView,
        HomeTemplateView,
        HelpTemplateView,
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
        SettingsProfileModel,
        SettingsPasswordModel,
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

                    this.role = this.session.getRole();
                    this._headerFooterContainersRender();
                    this.eventsCollection = new EventsCollection();

                    new HomeTemplateView().render();

                    new CalendarView({
                        collection: this.eventsCollection
                    }).render();

                    if ((this.role === 'admin') || (this.role === 'teacher')) {
                        this.categoriesCollection = new CategoriesCollection();
                        this.subjectsCollection = new SubjectsCollection();

                        new CategoriesView({
                            collection: this.categoriesCollection,
                            model: new CategoryModel
                        });

                        new SubjectsView({
                            collectionSubject: this.subjectsCollection,
                            collectionCategory: this.categoriesCollection,
                            model: new SubjectModel
                        });
                    }

                    ControllerView.selectMenuItem('home-menu');
                });

                this.on('route:helpPage', function() {
                    this._headerFooterContainersRender();
                    new HelpTemplateView().render();
                    ControllerView.selectMenuItem('help-menu');

                });

                this.on('route:settingsPage', function() {
                    this._headerFooterContainersRender();

                    new SettingsUserView({
                        profileModel: new SettingsProfileModel,
                        passwordModel: new SettingsPasswordModel
                    }).render();

                    ControllerView.selectMenuItem('');

                });

                this.on('route:loginPage', function() {
                    new LoginUserView().render();
                });

                this.on('route:adminPage', function() {

                    this.role = this.session.getRole();

                    if ((this.role === 'admin')) {
                        this._headerFooterContainersRender();
                        this.notapprovedTeachersCollection = new AdminTeachersCollection();
                        this.notapprovedSubjectsCollection = new AdminSubjectsCollection();
                        this.notapprovedCategoriesCollection = new AdminCategoriesCollection();

                        new AdminTemplateView().render();

                        new AdminActionBarGroup({
                            notapprovedTeachersCollection: this.notapprovedTeachersCollection,
                            notapprovedSubjectsCollection: this.notapprovedSubjectsCollection,
                            notapprovedCategoriesCollection: this.notapprovedCategoriesCollection
                        });

                        ControllerView.selectMenuItem('admin-menu');
                    }
                });

                this.on('route:cabinetPage', function() {

                    this.role = this.session.getRole();

                    if ((this.role === 'teacher')) {
                        this._headerFooterContainersRender();

                        new TeacherCabinetTemplateView().render();

                        new CabinetEventsView({
                            collection: new CabinetCollection
                        });

                        ControllerView.selectMenuItem('сabinet-menu');
                    }
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

    }

);
