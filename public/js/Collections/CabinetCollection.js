define('CabinetCollection', [
    'jquery',
    'underscore',
    'backbone',
    'CabinetModel'
], function(
    $,
    _,
    Backbone,
    CabinetModel) {

    var CabinetCollection = Backbone.Collection.extend({

        url: '/teachers',
        model: CabinetModel

    });

    return CabinetCollection;

});
