var Router = Backbone.Router.extend({

    routes: {
        "":         "loginPage",
        "home":     "homePage",
        "help":     "helpPage",
        "about":    "aboutPage",
        "settings": "settingsPage",
        "login":    "loginPage"
    },

    initialize: function() {
        this._headerContainer();
        this._footerContainer();
        this._initializeEvents();
    },

    _initializeEvents: function() {
        this.on('route:homePage', function() {
            new HomeTemplateView().render();
            this.eventsCollection = new EventsCollection();
            this.subjectsCollection = new SubjectsCollection();
            this.categoriesCollection = new CategoriesCollection();
            new CalendarView ({
                collection: this.eventsCollection
            }).render();
            new CategoriesView({
                collection: this.categoriesCollection
            });
            new SubjectsView({
                collectionSubject: this.subjectsCollection,
                collectionCategory: this.categoriesCollection
            });
            this.categoriesCollection.add([
                {title: "IT and Configuration Management"},
                {title: "Quality Control"},
                {title: "Software Development"}]);
            //this.selectMenuItem('home-menu');
        });

        this.on('route:helpPage', function() {
            new HelpTemplateView().render();
            // this.selectMenuItem('help-menu');
        });
        this.on('route:aboutPage', function() {
            new AboutTemplateView().render();
            // this.selectMenuItem('about-menu');
        });
        this.on('route:settingsPage', function() {
            new SettingsTemplateView().render();
            new SettingsUserView({model: new SettingsUserModel}).render();
            //this.selectMenuItem('');
        });
        this.on('route:loginPage', function() {
            new LoginUserView({
                model: new LoginUserModel
            }).render();
        });
    },

    _headerContainer: function() {
        new NavBarTemplateView().render();
    },

    _footerContainer: function() {
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