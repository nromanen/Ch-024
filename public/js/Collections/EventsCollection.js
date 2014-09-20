define('EventsCollection', ['jquery', 'underscore', 'backbone', 'EventModel'], function($, _, Backbone, EventModel) {
    var EventsCollection = Backbone.Collection.extend({

        model: EventModel
        // url: 'events'

    });

    return EventsCollection;
});
