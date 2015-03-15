'use strict';

angular.module('adminModule')
    .controller('SignUpController', function($scope, backEnd, $state, adminUserService, sharedSettings) {
    	var scope = $scope;
    	scope.user = {};
        scope.minLength = 1000;

        sharedSettings.getSettings().then(function(settings){
            scope.minLength = settings.passwordMinLength;
        });
    	scope.signup = function(){
    		return backEnd.signUp(scope.user).then(function(resp){
    			adminUserService.setUser(resp);
    			$state.go('admin.actionPannel');
    		}, function(resp){
    			scope.authError = resp.data.message;
    		});
    	};
    });