define([
    'jquery',
    'underscore',
    'backbone',
    'RegistrationUserModel',
    'maskedinput'
], function ($, _, Backbone, RegistrationUserModel) {

    describe('Test registration user model', function () {
        var registrationUserModel;

        beforeEach(function () {
            registrationUserModel = new RegistrationUserModel();
        });

        it('should exist', function() {
            expect(registrationUserModel).toBeDefined();
        });
    });
    });
