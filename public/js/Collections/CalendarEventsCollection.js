define('CalendarEventsCollection', ['jquery', 'underscore', 'backbone', 'CalendarEventModel'], function($, _, Backbone, CalendarEventModel) {
    var CalendarEventsCollection = Backbone.Collection.extend({

    	url: '/events',

        model: CalendarEventModel
        
    });

    return CalendarEventsCollection;
});
