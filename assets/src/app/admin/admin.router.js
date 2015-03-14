'use strict';

angular.module('adminModule').config(function($stateProvider) {
    $stateProvider
    	.state('admin',{
    		abstract:true,
        	template: '<div ui-view class="fade-in-right-big smooth"></div>'
    	})
        .state('admin.signin', {
            url: '/admin/signin',
            templateUrl: 'app/admin/views/signIn.html',
            controller: 'SignInController'
        })
        .state('admin.forgotpwd',{
        	url: '/admin/forgot',
        	templateUrl: 'app/admin/views/forgot.html',
        	controller: 'ForgotController'
        })
        .state('admin.signUp',{
        	url: '/admin/signup',
        	templateUrl: 'app/admin/views/signUp.html',
        	controller: 'SignUpController'
        });
});
