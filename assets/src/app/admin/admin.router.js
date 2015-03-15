'use strict';

angular.module('adminModule').config(function($stateProvider) {

    function permissions() {
        function permittionChecker(adminUserService, $q, $state) {
            var defer = $q.defer();
            //adminUserService.testCheck();
            adminUserService.getUser().then(function(user) {
                if (user.admin) {
                    defer.resolve();
                } else {
                    $state.go('home');
                    defer.reject();
                }
            }, function() {
                $state.go('home');
                defer.reject();
            });
            return defer.promise;
        }

        permittionChecker.$inject = ['adminUserService', '$q', '$state'];
        return permittionChecker;
    }



    $stateProvider
        .state('admin', {
//            abstract: true,
            template: '<div ui-view class="fade-in-right-big smooth"></div>'
        })
        .state('admin.signin', {
            url: '/admin/signin',
            templateUrl: 'app/admin/views/signIn.html',
            controller: 'SignInController'
        })
        .state('admin.forgotpwd', {
            url: '/admin/forgot',
            templateUrl: 'app/admin/views/forgot.html',
            controller: 'ForgotController'
        })
        .state('admin.signUp', {
            url: '/admin/signup',
            templateUrl: 'app/admin/views/signUp.html',
            controller: 'SignUpController'
        })
        .state('admin.actionPannel', {
            url: '/admin/action',
            templateUrl: 'app/admin/views/action.html',
            controller: 'ActionController',
            resolve: {
                permittions: permissions()
            }
        })
        .state('admin.actionPannel.users',{
            url: '/users',
            templateUrl: 'app/admin/views/actionUsers.html',
            controller: 'UsersActionsController',
        })
        .state('admin.actionPannel.events',{
            url: '/events',
            templateUrl: 'app/admin/views/actionEvents.html',
            controller: 'EventsActionsController',
        })
        .state('admin.actionPannel.profile',{
            url: '/profile',
            templateUrl: 'app/admin/views/actionProfile.html',
            controller: 'ProfileActionsController',
        });
});
