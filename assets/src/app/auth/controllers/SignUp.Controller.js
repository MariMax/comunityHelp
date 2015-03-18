'use strict';

angular.module('authModule')
    .controller('SignUpController', function($scope, authActions, $state, authUserService, sharedSettings) {
    	var scope = $scope;
    	scope.user = {};
        scope.minLength = 1000;
        sharedSettings.getSettings().then(function(settings){
            scope.minLength = settings.passwordMinLength;
        });
    	scope.signUp = function(){
    		return authActions.signUp(scope.user).then(function(resp){
          authUserService.setUser(resp);
    			$state.go('home');
    		}, function(resp){
    			scope.authError = resp.data.message;
    		});
    	};
    });
