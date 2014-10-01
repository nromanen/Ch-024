define('CalendarEventsCollection', ['jquery', 'underscore', 'backbone', 'CalendarEventModel'], function($, _, Backbone, CalendarEventModel) {
    var CalendarEventsCollection = Backbone.Collection.extend({

        model: CalendarEventModel,
        url: 'events'

    });

    return CalendarEventsCollection;
});
