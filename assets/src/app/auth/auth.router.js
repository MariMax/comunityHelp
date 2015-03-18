'use strict';

angular.module('authModule').config(function($stateProvider) {

    $stateProvider
        .state('auth', {
//            abstract: true,
            template: '<div ui-view class="fade-in-right-big smooth"></div>'
        })
        .state('auth.signIn', {
            url: '/auth/signIn',
            templateUrl: 'app/auth/views/signIn.html',
            controller: 'SignInController'
        })
        .state('auth.forgotPWD', {
            url: '/auth/forgot',
            templateUrl: 'app/auth/views/forgot.html',
            controller: 'ForgotController'
        })
        .state('auth.signUp', {
            url: '/auth/signUp',
            templateUrl: 'app/auth/views/signUp.html',
            controller: 'SignUpController'
        });
});
