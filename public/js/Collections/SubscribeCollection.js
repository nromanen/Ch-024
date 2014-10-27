define('SubscribeCollection', ['jquery',
    'underscore',
    'backbone',
    'SubscribeModel'
], function($,
    _,
    Backbone,
    SubscribeModel) {
    var SubscribeCollection = Backbone.Collection.extend({

        url: '/subscribe',

        model: SubscribeModel

    });

    return SubscribeCollection;
});
