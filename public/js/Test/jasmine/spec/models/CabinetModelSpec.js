define([
    'jquery',
    'underscore',
    'backbone',
    'CabinetModel'
], function($, _, Backbone, CabinetModel) {
    describe('Test Cabinet Model', function() {

        it('should be able to create model', function() {
            var cabinet = new CabinetModel();
            expect(cabinet).toBeDefined();
        });
    });
});

