define([
    'jquery',
    'underscore',
    'backbone',
    'CabinetModel',
    'CabinetEventView',
    'text!teacherCabinetEventTemplate'
], function($, _, Backbone, CabinetModel, CabinetEventView, teacherCabinetEventTemplate) {
    describe("Test cabinet event view", function() {
        var cabinetEventView;

        beforeEach(function(){
            cabinetEventView = new CabinetEventView({
                model: new CabinetModel
            });
        });

        it('should exist', function() {
            expect(cabinetEventView).toBeDefined();
        });

        it("should has defined template", function() {
            expect(cabinetEventView.template).toBeDefined();
        });

        it("render method should return this", function() {
            expect(cabinetEventView.render()).toEqual(cabinetEventView)
        });

    });

});
