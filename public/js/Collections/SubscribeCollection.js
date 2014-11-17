define('SubscribeCollection', [
    'jquery',
    'underscore',
    'backbone',
    'SubscribeModel',
    'ControllerView',
    'moment'
],
    function(
        $,
        _,
        Backbone,
        SubscribeModel,
        ControllerView,
        moment) {

        var SubscribeCollection = Backbone.Collection.extend({

            url: '/subscribe',
            model: SubscribeModel,

            _sortByStartDate: function() {
                this.set(_.sortBy(this.notSortCollection, function(subscribe) {
                    return subscribe.event.start
                }));
            },

            fetchNearestEvents: function(idStudent) {
                var that = this;

                $.ajax({
                        url: '/nearestevents/' + idStudent,
                        type: 'GET',
                        data: {
                            nowTime: moment().format()
                        }
                })

                .done(function(data) {
                    ControllerView.clearHtmlOnElement('.assignContainer');
                    that.notSortCollection = data;

                    if(!that.notSortCollection.length) {
                        ControllerView.showMassageOfClearContainerSubscribe("You don't have any event, please subscrube to event");
                    }

                    that._sortByStartDate();
                })

                .fail(function() {
                    console.log("error");
                });
            },

            fetchPastEvents: function(idStudent) {
                var that = this;

                $.ajax({
                        url: '/pastevents/' + idStudent,
                        type: 'GET',
                        data: {
                            nowTime: moment().format()
                        }
                    })

                .done(function(data) {
                    ControllerView.clearHtmlOnElement('.assignContainer');
                    that.notSortCollection = data;

                    if(!that.notSortCollection.length) {
                        ControllerView.showMassageOfClearContainerSubscribe("You didn't have any event");
                    }

                    that._sortByStartDate();
                })

                .fail(function() {
                    console.log("error");
                });
            }

        });

        return SubscribeCollection;

    }

);
