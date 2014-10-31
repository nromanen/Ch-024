define('CabinetModel', ['jquery', 'underscore', 'backbone'], function($, _, Backbone) {
    var CabinetModel = Backbone.Model.extend({

        urlRoot: '/teachers',

        defaults: function() {
            return {
                _id: '',
                title: '',
                event: {},
                students: []
            }
        }
    });

    return CabinetModel;
});

