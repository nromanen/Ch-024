define([
    'jquery',
    'underscore',
    'backbone',
    'CategoryModel'
], function($, _, Backbone, CategoryModel) {
    describe('Test Category Model', function() {
        var data = {
            title: 'JavaScript'
        };

        it('should be able to create ', function() {
            var category = new CategoryModel();
            expect(category).toBeDefined();
            expect(data).toBeDefined();
        });

        describe('has property getter functions that', function() {
            var category = new CategoryModel(data);

            it('should return  title', function() {
                expect(category.getTitle()).toEqual('JavaScript');
            });

        });

        describe('has property setter functions that', function() {
            var category = new CategoryModel(data);

            it('should set the new title', function() {
                category.setTitle('JScript');
                expect(category.get('title')).toEqual('JScript');
            });
        });

    });
});
