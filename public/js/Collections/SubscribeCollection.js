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

        _sortByStartDate: function() {
            this.set(_.sortBy(this.notSortCollection, function(subscribe) {
                return subscribe.event.start
            }))
        },

        fetchAssignedStudent: function(idStudent) {
            var that = this;

            $.ajax({
                    url: '/student/' + idStudent,
                    type: 'GET',
                    data: {
                        nowTime: moment().format()
                    },
                })
                .done(function(data) {
                    that.notSortCollection = data;
                    that._sortByStartDate();
                })
                .fail(function() {
                    console.log("error");
                });
        }
    });

    return SubscribeCollection;
});
