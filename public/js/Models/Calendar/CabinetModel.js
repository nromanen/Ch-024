define('CabinetModel', [
    'jquery',
    'underscore',
    'backbone'
], function( $, _, Backbone) {

    var CabinetModel = Backbone.Model.extend({

        urlRoot: '/teachers',

        defaults: function() {
            return {
                _id: '',
                title: '',
                event: {},
                students: {}
            }
        },

        getStudents: function() {
            return this.get('students');
        },

        getEvent: function() {
            return this.get('event');
        },

        setStudents: function(value) {
            return this.set('students', value);
        }

    });

    return CabinetModel;

});
