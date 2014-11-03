define([
    'jquery',
    'underscore',
    'backbone',
    'UserModel',
    'CalendarEventModel',
    'SubscribeModel'
], function($, _, Backbone, UserModel, CalendarEventModel, SubscribeModel) {

    describe('Test Subscribe Model', function() {

        it('should be able to create model', function() {
            var subscribeModel = new SubscribeModel();
            expect(subscribeModel).toBeDefined();
        });

        it('can be instantiated', function() {
            var subscribeModel = new SubscribeModel();
            expect(subscribeModel).not.toBeNull();
        });
    });

});
