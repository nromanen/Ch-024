define([
    'jquery',
    'underscore',
    'backbone',
    'SubjectModel',
    'CategoryModel'
], function($, _, Backbone, SubjectModel, CategoryModel) {
    describe('Test Subject Model', function() {
        var data = {
            _id: '12345',
            category: new CategoryModel,
            categoryId: "12345",
            title: 'JavaScript',
            textColor: 'red',
            color: 'red',
            approved: false,
            authorName: 'John',
            authorSurname: 'Milz'

        };

        it('should be able to create its application test objects', function() {
            var subject = new SubjectModel({
                category: new CategoryModel
            });
            expect(subject).toBeDefined();
            expect(data).toBeDefined();
        });

        describe('has property getter functions that', function() {
            var subject = new SubjectModel(data);

            it('should return  title', function() {
                expect(subject.getTitle()).toEqual('JavaScript');
            });

            it('should return  color', function() {
                expect(subject.getColor()).toEqual('red');
            });

            it('should return category id', function() {
                expect(subject.getCategoryId()).toEqual('12345');
            });

            it('should return flag approved', function() {
                expect(subject.getApproved()).toEqual(false);
            });

            it('should return text color', function() {
                expect(subject.getTextColor()).toEqual('red');
            });
        });

        describe('has property setter functions that', function() {
            var subject = new SubjectModel(data);

            it('should set the new title', function() {
                subject.setTitle('JavaScript');
                expect(subject.get('title')).toEqual('JavaScript');
            });

            it('should set the new color', function() {
                subject.setColor('pink');
                expect(subject.get('color')).toEqual('pink');
            });

            it('should set the new ingredients', function() {
                subject.setTextColor('green');
                expect(subject.get('textColor')).toEqual('green');
            });

            it('should set the new author', function() {
                subject.setApproved(true);
                expect(subject.get('approved')).toEqual(true);
            });
        });

    });

});
