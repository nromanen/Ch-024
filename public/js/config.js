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
        'SessionModel': 'Models/LoginAndRegistration/SessionModel',
        'UserModel': 'Models/Admin/UserModel',

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
        'SettingsUserView': 'Views/LoginAndRegistration/SettingsUserView',
        'LoginUserView': 'Views/LoginAndRegistration/LoginUserView',
        'RegistrationUserView': 'Views/LoginAndRegistration/RegistrationUserView',
        'CategoryView': 'Views/Calendar/CategoryView',
        'CategoriesView': 'Views/Calendar/CategoriesView',
        'navTabPaneCategoryView': 'Views/Calendar/navTabPaneCategoryView',
        'navTabCategoryView': 'Views/Calendar/navTabCategoryView',
        'NavBarTemplateView': 'Views/Templates/NavBarTemplateView',
        'FooterTemplateView': 'Views/Templates/FooterTemplateView',
        'ContainerCalendarTemplateView': 'Views/Templates/ContainerCalendarTemplateView',
        'AboutTemplateView': 'Views/Templates/AboutTemplateView',
        'HomeTemplateView': 'Views/Templates/HomeTemplateView',
        'SettingsTemplateView': 'Views/Templates/SettingsTemplateView',
        'AdminTemplateView': 'Views/Templates/AdminTemplateView',
        'HelpTemplateView': 'Views/Templates/HelpTemplateView',
        'AdminActionBar': 'Views/Admin/AdminActionBar',
        'AdminActionBarGroup': 'Views/Admin/AdminActionBarGroup',
        'NavBarTemplateView': 'Views/Templates/NavBarTemplateView',
        'FooterTemplateView': 'Views/Templates/FooterTemplateView',
        'ContainerCalendarTemplateView': 'Views/Templates/ContainerCalendarTemplateView',
        'AboutTemplateView': 'Views/Templates/AboutTemplateView',
        'HomeTemplateView': 'Views/Templates/HomeTemplateView',
        'SettingsTemplateView': 'Views/Templates/SettingsTemplateView',
        'HelpTemplateView': 'Views/Templates/HelpTemplateView',
        'AdminTemplateView': 'Views/Templates/AdminTemplateView',


        // Template
<<<<<<< HEAD
=======

>>>>>>> b787ac029d513919e2640b1172be47451dacb698
        'aboutTemplate': '../templates/aboutTemplate.html',
        'navBarTemplate': '../templates/navBarTemplate.html',
        'footerTemplate': '../templates/footerTemplate.html',
        'homeTemplate': '../templates/homeTemplate.html',
        'helpTemplate': '../templates/helpTemplate.html',
        'settingsTemplate': '../templates/settingsTemplate.html',
        'saveEventModalWindowTemplate': '../templates/saveEventModalWindowTemplate.html',
        'deleteEventModalWindowTemplate': '../templates/deleteEventModalWindowTemplate.html',
        'ownPopoverTemplate': '../templates/ownPopoverTemplate.html',
        'createCategoryModalWindowTemplate': '../templates/createCategoryModalWindowTemplate.html',
        'navTabCategoryTemplate': '../templates/navTabCategoryTemplate.html',
        'createSubjectModalWindowTemplate': '../templates/createSubjectModalWindowTemplate.html',
        'optionForSelect': '../templates/optionForSelect.html',
        'newSubjectTemplate': '../templates/newSubjectTemplate.html',
        'loginTemplate': '../templates/loginTemplate.html',
        'registrationTemplate': '../templates/registrationTemplate.html',
        'containerCalendarTemplate': '../templates/containerCalendarTemplate.html',
<<<<<<< HEAD
        'categoryInfoTemplate': '../templates/categoryInfoTemplate.html',
        'subjectInfoTemplate': '../templates/subjectInfoTemplate.html',
        'teacherInfoTemplate': '../templates/teacherInfoTemplate.html',
        'adminTemplate': '../templates/adminTemplate.html'

=======
        'adminTemplate': '../templates/adminTemplate.html',
        'categoryInfoTemplate': '../templates/categoryInfoTemplate.html',
        'subjectInfoTemplate': '../templates/subjectInfoTemplate.html',
        'teacherInfoTemplate': '../templates/teacherInfoTemplate.html'
>>>>>>> b787ac029d513919e2640b1172be47451dacb698
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
