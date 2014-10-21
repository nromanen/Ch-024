define('SubscribeCollection', ['jquery',
    'underscore',
    'backbone',
    'SubsсribeModel'
], function($,
    _,
    Backbone,
    SubsсribeModel) {
    var SubscribeCollection = Backbone.Collection.extend({

        url: '/subscribe',

        model: SubsсribeModel

    });

    return SubscribeCollection;
});
