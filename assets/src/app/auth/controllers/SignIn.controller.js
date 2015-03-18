'use strict';

angular.module('authModule')
    .controller('SignInController', function($scope,$state, authUserService, authActions) {
    	var scope = $scope;
    	scope.user = {};
    	scope.login = function(){
    		return authActions.signIn(scope.user).then(function(resp){
          authUserService.setUser(resp);
    			$state.go('home');
    		}, function(resp){
    			scope.authError = resp.data.message;
    		});
    	};
    });
