define([
    'jquery',
    'underscore',
    'backbone',
    'RegistrationUserModel',
    'RegistrationUserView',
    'text!registrationTemplate'],
    function($, _, Backbone, RegistrationUserModel,RegistrationUserView, registrationTemplate) {
        describe("Test registration user view", function() {
            var registrationUserView;

            beforeEach(function(){
                registrationUserView = new RegistrationUserView({
                    model: new RegistrationUserModel

                });

            });

            it('should exist', function() {
                expect(registrationUserView).toBeDefined();
            });

            it("should has defined template", function() {
                expect(registrationUserView.template).toBeDefined();
            });

            describe("'When view is rendered'", function() {

                beforeEach(function(){
                    registrationUserView.render();
                });

                afterEach(function() {
                    registrationUserView.remove();
                    $('.modal-backdrop, .modal').remove();
                });

                it(' should name field be empty', function() {
                    expect(registrationUserView.$el.find('#name').val()).toEqual('');
                });

                it(' should surname field be empty', function() {
                    expect(registrationUserView.$el.find('#surname').val()).toEqual('');
                });

                it(' should email field be empty', function() {
                    expect(registrationUserView.$el.find('#email').val()).toEqual('');
                });

                it(' should password field be empty', function() {
                    expect(registrationUserView.$el.find('#password').val()).toEqual('');
                });

                it(' should repeat password field be empty', function() {
                    expect(registrationUserView.$el.find('#repeatPassword').val()).toEqual('');
                });

            });

            });

    });