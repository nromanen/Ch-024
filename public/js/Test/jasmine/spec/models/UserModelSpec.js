define([
    'jquery',
    'underscore',
    'backbone',
    'UserModel'
], function( $, _, Backbone, UserModel) {

    describe('Test User Model', function() {
        var data = {
            username: 'User',
            surname: 'User',
            email: 'user@gmail.com',
            phone: '+380987654545',
            role: 'user',
            approved: false
        };

        it('should be able to create ', function() {
            var user = new UserModel();
            expect(user).toBeDefined();
            expect(data).toBeDefined();
        });

        describe('has property getter functions that', function() {
            var user = new UserModel(data);

            it('should return  user name', function() {
                expect(user.getName()).toEqual('User');
            });

            it('should return  user surname', function() {
                expect(user.getSurname()).toEqual('User');
            });

            it('should return user email', function() {
                expect(user.getEmail()).toEqual('user@gmail.com');
            });

            it('should return user phone', function() {
                expect(user.getPhone()).toEqual('+380987654545');
            });

            it('should return user role', function() {
                expect(user.getRole()).toEqual('user');
            });

            it('should return approved flag', function() {
                expect(user.getConfirmed()).toEqual(false);
            });

        });

        describe('has property setter functions that', function() {
            var user = new UserModel(data);

            it('should set  user name', function() {
                user.setName('Teacher');
                expect(user.get('username')).toEqual('Teacher');
            });

            it('should set user surname', function() {
                user.setSurname('Teacher');
                expect(user.get('surname')).toEqual('Teacher');
            });

            it('should set user email', function() {
                user.setEmail('teacher@gmail.com');
                expect(user.get('email')).toEqual('teacher@gmail.com');
            });

            it('should set user phone', function() {
                user.setPhone('+380508766565');
                expect(user.get('phone')).toEqual('+380508766565');
            });

            it('should set user role', function() {
                user.setRole('teacher');
                expect(user.get('role')).toEqual('teacher');
            });

            it('should set approved flag', function() {
                user.setConfirmed(true);
                expect(user.get('approved')).toEqual(true);
            });

        });

    });

});
