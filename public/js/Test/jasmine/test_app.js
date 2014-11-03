require.config({
    //baseUrl: 'js/',
    paths: {
        'moment': '../../Vendor/jquery/moment.min',
        'jquery': '../../Vendor/jquery/jquery.min',
        'jqueryui': '../../Vendor/jquery/jquery-ui.min',
        'fullcalendar': '../../Vendor/jquery/fullcalendar.min',
        'langall': '../../Vendor/jquery/lang-all',
        'tinycolor': '../../Vendor/pick-a-color/tinycolor.min',
        'pickacolor': '../../Vendor/pick-a-color/pick-a-color.min',
        'underscore': '../../Vendor/underscore',
        'backbone': '../../Vendor/backbone',
        'bootstrap': '../../Vendor/bootstrap/js/bootstrap',
        'ownpopover': '../../Vendor/ownPopover',
        'tooltip': '../../Vendor/tooltip',
        'jqueryjson': '../../Vendor/jqueryJSON',
        'text': '../../Vendor/text',
        'maskedinput': '../../Vendor/jquery.maskedinput',
        'jasmine' : 'lib/jasmine-2.0.2/jasmine',
        'jasmine-html': 'lib/jasmine-2.0.2/jasmine-html',
        'spec' : 'spec/',

        /*
         Our ../../Models, ../../Collections, ../../Views, etc
         */

        // ../../Models
        'CalendarEventModel': '../../Models/Calendar/CalendarEventModel',
        'SubjectModel': '../../Models/Calendar/SubjectModel',
        'SettingsUserModel': '../../Models/LoginAndRegistration/SettingsUserModel',
        'RegistrationUserModel': '../../Models/LoginAndRegistration/RegistrationUserModel',
        'CategoryModel': '../../Models/Calendar/CategoryModel',
        'SessionModel': '../../Models/LoginAndRegistration/SessionModel',
        'UserModel': '../../Models/Admin/UserModel',
        'SubscribeModel': '../../Models/Calendar/SubscribeModel',
        'CabinetModel': '../../Models/Calendar/CabinetModel',

        // ../../Collections
        'CalendarEventsCollection': '../../Collections/CalendarEventsCollection',
        'SubjectsCollection': '../../Collections/SubjectsCollection',
        'CategoriesCollection': '../../Collections/CategoriesCollection',
        'AdminCategoriesCollection': '../../Collections/Admin/AdminCategoriesCollection',
        'AdminSubjectsCollection': '../../Collections/Admin/AdminSubjectsCollection',
        'AdminTeachersCollection': '../../Collections/Admin/AdminTeachersCollection',
        'SubscribeCollection': '../../Collections/SubscribeCollection',

        // ../../Views
        'CalendarView': '../../Views/Calendar/CalendarView',
        'SubjectView': '../../Views/Calendar/SubjectView',
        'CalendarEventView': '../../Views/Calendar/CalendarEventView',
        'SubjectsView': '../../Views/Calendar/SubjectsView',
        'SettingsUserView': '../../Views/LoginAndRegistration/SettingsUserView',
        'LoginUserView': '../../Views/LoginAndRegistration/LoginUserView',
        'RegistrationUserView': '../../Views/LoginAndRegistration/RegistrationUserView',
        'CategoryView': '../../Views/Calendar/CategoryView',
        'CategoriesView': '../../Views/Calendar/CategoriesView',
        'navTabPaneCategoryView': '../../Views/Calendar/navTabPaneCategoryView',
        'navTabCategoryView': '../../Views/Calendar/navTabCategoryView',
        'NavBarTemplateView': '../../Views/Templates/NavBarTemplateView',
        'FooterTemplateView': '../../Views/Templates/FooterTemplateView',
        'ContainerCalendarTemplateView': '../../Views/Templates/ContainerCalendarTemplateView',
        'AboutTemplateView': '../../Views/Templates/AboutTemplateView',
        'HomeTemplateView': '../../Views/Templates/HomeTemplateView',
        'SettingsTemplateView': '../../Views/Templates/SettingsTemplateView',
        'HelpTemplateView': '../../Views/Templates/HelpTemplateView',
        'AdminActionBar': '../../Views/Admin/AdminActionBar',
        'AdminActionBarGroup': '../../Views/Admin/AdminActionBarGroup',
        'AdminTemplateView': '../../Views/Templates/AdminTemplateView',
        'ControllerView': '../../Views/ControllerView',
        'SubscribeView': '../../Views/Calendar/SubscribeView',
        'CabinetEventView': '../../Views/Calendar/CabinetEventView',
        'CabinetEventsView': '../../Views/Calendar/CabinetEventsView',
        'ConfirmModalTemplateView': '../../Views/Templates/ConfirmModalTemplateView',

        // Template
        'aboutTemplate': '../../../templates/aboutTemplate.html',
        'navBarTemplate': '../../../templates/navBarTemplate.html',
        'footerTemplate': '../../../templates/footerTemplate.html',
        'homeTemplate': '../../../templates/homeTemplate.html',
        'helpTemplate': '../../../templates/helpTemplate.html',
        'settingsTemplate': '../../../templates/settingsTemplate.html',
        'saveEventModalWindowTemplate': '../../../templates/saveEventModalWindowTemplate.html',
        'deleteEventModalWindowTemplate': '../../../templates/deleteEventModalWindowTemplate.html',
        'ownPopoverTemplate': '../../../templates/ownPopoverTemplate.html',
        'createCategoryModalWindowTemplate': '../../../templates/createCategoryModalWindowTemplate.html',
        'navTabCategoryTemplate': '../../../templates/navTabCategoryTemplate.html',
        'createSubjectModalWindowTemplate': '../../../templates/createSubjectModalWindowTemplate.html',
        'optionForSelect': '../../../templates/optionForSelect.html',
        'newSubjectTemplate': '../../../templates/newSubjectTemplate.html',
        'loginTemplate': '../../../templates/loginTemplate.html',
        'registrationTemplate': '../../../templates/registrationTemplate.html',
        'containerCalendarTemplate': '../../../templates/containerCalendarTemplate.html',
        'teacherCabinetEventTemplate': '../../../templates/teacherCabinetEventTemplate.html',
        'teacherCabinetTemplate': '../../../templates/teacherCabinetTemplate.html',
        'confirmModalWindowTemplate': '../../../templates/confirmModalWindowTemplate.html',

        'adminTemplate': '../../../templates/adminTemplate.html',
        'categoryInfoTemplate': '../../../templates/categoryInfoTemplate.html',
        'subjectInfoTemplate': '../../../templates/subjectInfoTemplate.html',
        'teacherInfoTemplate': '../../../templates/teacherInfoTemplate.html',
        'alertError': '../../../templates/alertError.html',
        'adminMenuTemplate': '../../../templates/adminMenuTemplate.html',
        'teacherMenuTemplate': '../../../templates/teacherMenuTemplate.html',
        'alertSuccess': '../../../templates/alertSuccess.html'
    },

    shim: {
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },

        'jqueryui': {
            deps: ['jquery']
        },

        'fullcalendar': {
            deps: ['moment', 'jquery', 'jqueryui']
        },

        'bootstrap': {
            deps: ['jquery']
        },

        'pickacolor': {
            deps: ['bootstrap', 'jquery', 'tinycolor']
        },

        'tinycolor': {
            deps: ['bootstrap', 'jquery']
        },

        'ownpopover': {
            deps: ['jquery']
        },

        'maskedinput': {
            deps: ['jquery']
        },

        'jasmine': {
            exports: 'jasmine'
        },

        'jasmine-html': {
            deps: ['jasmine'],
            exports: 'jasmine'
        }
    },

    config: {
        text: {
            useXhr: function(url, protocol, hostname, port) {
                return true;
            }
        }
    }
});

require(['underscore', 'jquery', 'jasmine', 'jasmine-html'], function(_, $, jasmine){
    /**
     Starting with version 2.0, this file "boots" Jasmine, performing all of the necessary initialization before executing the loaded environment and all of a project's specs. This file should be loaded after `jasmine.js`, but before any project source files or spec files are loaded. Thus this file can also be used to customize Jasmine for a project.

     If a project is using Jasmine via the standalone distribution, this file can be customized directly. If a project is using Jasmine via the [Ruby gem][jasmine-gem], this file can be copied into the support directory via `jasmine copy_boot_js`. Other environments (e.g., Python) will have different mechanisms.

     The location of `boot.js` can be specified and/or overridden in `jasmine.yml`.

     [jasmine-gem]: http://github.com/pivotal/jasmine-gem
     */
    var specs = [];

    specs.push('spec/models/SubjectModelSpec');
    specs.push('spec/models/RegistrationUserModelSpec');
    specs.push('spec/models/CalendarEventModelSpec');
    specs.push('spec/models/CabinetModelSpec');
    specs.push('spec/models/CategoryModelSpec');
    specs.push('spec/models/SubscribeModelSpec');

    specs.push('spec/views/SubjectViewSpec');
    specs.push('spec/views/SubjectsViewSpec');
    specs.push('spec/views/RegistrationUserViewSpec');
    specs.push('spec/views/CabinetEventViewSpec');
    /**
     * ## Require &amp; Instantiate
     *
     * Require Jasmine's core files. Specifically, this requires and attaches all of Jasmine's code to the `jasmine` reference.
     */
    window.jasmine = jasmineRequire.core(jasmineRequire);

    /**
     * Since this is being run in a browser and the results should populate to an HTML page, require the HTML-specific Jasmine code, injecting the same reference.
     */
    jasmineRequire.html(jasmine);

    /**
     * Create the Jasmine environment. This is used to run all specs in a project.
     */
    var env = jasmine.getEnv();

    /**
     * ## The Global Interface
     *
     * Build up the functions that will be exposed as the Jasmine public interface. A project can customize, rename or alias any of these functions as desired, provided the implementation remains unchanged.
     */
    var jasmineInterface = jasmineRequire.interface(jasmine, env);

    /**
     * Add all of the Jasmine global/public interface to the proper global, so a project can use the public interface directly. For example, calling `describe` in specs instead of `jasmine.getEnv().describe`.
     */
    if (typeof window == "undefined" && typeof exports == "object") {
        extend(exports, jasmineInterface);
    } else {
        extend(window, jasmineInterface);
    }

    /**
     * ## Runner Parameters
     *
     * More browser specific code - wrap the query string in an object and to allow for getting/setting parameters from the runner user interface.
     */

    var queryString = new jasmine.QueryString({
        getWindowLocation: function() { return window.location; }
    });

    var catchingExceptions = queryString.getParam("catch");
    env.catchExceptions(typeof catchingExceptions === "undefined" ? true : catchingExceptions);

    /**
     * ## Reporters
     * The `HtmlReporter` builds all of the HTML UI for the runner page. This reporter paints the dots, stars, and x's for specs, as well as all spec names and all failures (if any).
     */
    var htmlReporter = new jasmine.HtmlReporter({
        env: env,
        onRaiseExceptionsClick: function() { queryString.setParam("catch", !env.catchingExceptions()); },
        getContainer: function() { return document.body; },
        createElement: function() { return document.createElement.apply(document, arguments); },
        createTextNode: function() { return document.createTextNode.apply(document, arguments); },
        timer: new jasmine.Timer()
    });

    /**
     * The `jsApiReporter` also receives spec results, and is used by any environment that needs to extract the results  from JavaScript.
     */
    env.addReporter(jasmineInterface.jsApiReporter);
    env.addReporter(htmlReporter);

    /**
     * Filter which specs will be run by matching the start of the full name against the `spec` query param.
     */
    var specFilter = new jasmine.HtmlSpecFilter({
        filterString: function() { return queryString.getParam("spec"); }
    });

    env.specFilter = function(spec) {
        return specFilter.matches(spec.getFullName());
    };

    /**
     * Setting up timing functions to be able to be overridden. Certain browsers (Safari, IE 8, phantomjs) require this hack.
     */
    window.setTimeout = window.setTimeout;
    window.setInterval = window.setInterval;
    window.clearTimeout = window.clearTimeout;
    window.clearInterval = window.clearInterval;

    /**
     * ## Execution
     *
     * Replace the browser window's `onload`, ensure it's called, and then run all of the loaded specs. This includes initializing the `HtmlReporter` instance and then executing the loaded Jasmine environment. All of this will happen after all of the specs are loaded.
     */
    var currentWindowOnload = window.onload;

    $(document).ready(function() {

        if (currentWindowOnload) {
            currentWindowOnload();
        }
        htmlReporter.initialize();

        require(specs, function() {
            env.execute();
        });
    });

    /**
     * Helper function for readability above.
     */
    function extend(destination, source) {
        for (var property in source) destination[property] = source[property];
        return destination;
    }

});