var require = {
    'baseUrl': 'js/',
    "paths": {
        'moment': 'Vendor/jquery/moment.min',
        'jquery': 'Vendor/jquery/jquery.min',
        'jqueryui': 'Vendor/jquery/jquery-ui.min',
        'fullcalendar': 'Vendor/jquery/fullcalendar.min',
        'langall': 'Vendor/jquery/lang-all',
        'tinycolor': 'Vendor/pick-a-color/tinycolor.min',
        'pickacolor': 'Vendor/pick-a-color/pick-a-color.min',
        'underscore': 'Vendor/underscore',
        'backbone': 'Vendor/backbone',
        'bootstrap': 'Vendor/bootstrap/js/bootstrap',
        'ownpopover': 'Vendor/ownPopover',
        'tooltip': 'Vendor/tooltip',
        'jqueryjson': 'Vendor/jqueryJSON',
        'text': 'Vendor/text',
        'maskedinput': 'Vendor/jquery.maskedinput',

        /*
        Our models, collections, views, etc
         */

        // Models
        'CalendarEventModel': 'Models/Calendar/CalendarEventModel',
        'SubjectModel': 'Models/Calendar/SubjectModel',
        'SettingsUserModel': 'Models/LoginAndRegistration/SettingsUserModel',
        'RegistrationUserModel': 'Models/LoginAndRegistration/RegistrationUserModel',
        'CategoryModel': 'Models/Calendar/CategoryModel',
        'SessionModel' : 'Models/LoginAndRegistration/SessionModel',
        'TeacherModel' : 'Models/Admin/TeacherModel',

        // Collections
        'CalendarEventsCollection': 'Collections/CalendarEventsCollection',
        'SubjectsCollection': 'Collections/SubjectsCollection',
        'CategoriesCollection': 'Collections/CategoriesCollection',
        'AdminCategoriesCollection': 'Collections/Admin/AdminCategoriesCollection',
        'AdminSubjectsCollection': 'Collections/Admin/AdminSubjectsCollection',
        'AdminTeachersCollection': 'Collections/Admin/AdminTeachersCollection',

        // Views
        'CalendarView': 'Views/Calendar/CalendarView',
        'SubjectView': 'Views/Calendar/SubjectView',
        'CalendarEventView': 'Views/Calendar/CalendarEventView',
        'SubjectsView': 'Views/Calendar/SubjectsView',
        'TemplateView': 'Views/TemplateView',
        'SettingsUserView': 'Views/LoginAndRegistration/SettingsUserView',
        'LoginUserView': 'Views/LoginAndRegistration/LoginUserView',
        'RegistrationUserView': 'Views/LoginAndRegistration/RegistrationUserView',
        'CategoryView': 'Views/Calendar/CategoryView',
        'CategoriesView': 'Views/Calendar/CategoriesView',
        'navTabPaneCategoryView': 'Views/Calendar/navTabPaneCategoryView',
        'navTabCategoryView': 'Views/Calendar/navTabCategoryView',
        'AdminActionBar': 'Views/Admin/AdminActionBar',
        'AdminActionBarGroup': 'Views/Admin/AdminActionBarGroup',

        // Template
        'TemplateView': 'Views/TemplateView',
        'aboutTemplate': '../js/Templates/aboutTemplate.html',
        'navBarTemplate': '../js/Templates/navBarTemplate.html',
        'footerTemplate': '../js/Templates/footerTemplate.html',
        'homeTemplate': '../js/Templates/homeTemplate.html',
        'helpTemplate': '../js/Templates/helpTemplate.html',
        'settingsTemplate': '../js/Templates/settingsTemplate.html',
        'saveEventModalWindowTemplate': '../js/Templates/saveEventModalWindowTemplate.html',
        'deleteEventModalWindowTemplate': '../js/Templates/deleteEventModalWindowTemplate.html',
        'ownPopoverTemplate': '../js/Templates/ownPopoverTemplate.html',
        'createCategoryModalWindowTemplate': '../js/Templates/createCategoryModalWindowTemplate.html',
        'navTabCategoryTemplate': '../js/Templates/navTabCategoryTemplate.html',
        'createSubjectModalWindowTemplate': '../js/Templates/createSubjectModalWindowTemplate.html',
        'optionForSelect': '../js/Templates/optionForSelect.html',
        'newSubjectTemplate': '../js/Templates/newSubjectTemplate.html',
        'loginTemplate': '../js/Templates/loginTemplate.html',
        'registrationTemplate': '../js/Templates/registrationTemplate.html',
        'containerCalendarTemplate': '../js/Templates/containerCalendarTemplate.html',
        'adminTemplate': '../js/Templates/adminTemplate.html',
        'categoryInfoTemplate': '../js/Templates/categoryInfoTemplate.html',
        'subjectInfoTemplate': '../js/Templates/subjectInfoTemplate.html',
        'teacherInfoTemplate': '../js/Templates/teacherInfoTemplate.html'
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
        }
    },

    config: {
        text: {
            useXhr: function(url, protocol, hostname, port) {
                return true;
            }
        }
    }
};
