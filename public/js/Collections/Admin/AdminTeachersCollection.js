define('AdminTeachersCollection', [
    'jquery',
    'underscore',
    'backbone',
    'UserModel'
], function(
    $,
    _,
    Backbone,
    UserModel) {

    var AdminTeachersCollection = Backbone.Collection.extend({

        url: '/users/notapproved',
        model: UserModel

    });

    return AdminTeachersCollection;

});
