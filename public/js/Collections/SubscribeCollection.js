define('SubscribeCollection', ['jquery',
    'underscore',
    'backbone',
    'SubscribeModel',
    'moment'
], function($,
    _,
    Backbone,
    SubscribeModel,
    moment) {
    var SubscribeCollection = Backbone.Collection.extend({

        url: '/subscribe',

        model: SubscribeModel,

        fetchAssignedStudent: function(idStudent) {
            var that = this;

            $.ajax({
                url: '/student/' + idStudent,
                type: 'GET',
                data: {nowTime: moment().format()},
            })
            .done(function(data) {
                that.set(data);
            })
            .fail(function() {
                console.log("error");
            });
        }
    });

    return SubscribeCollection;
});
