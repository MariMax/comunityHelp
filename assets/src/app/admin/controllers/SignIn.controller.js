'use strict';

angular.module('adminModule')
    .controller('SignInController', function($scope, backEnd, $state,adminUserService) {
    	var scope = $scope;
    	scope.user = {};
    	scope.login = function(){
    		return backEnd.signIn(scope.user).then(function(resp){
    			adminUserService.setUser(resp);
                //$cookieStore.put('user', resp);
    			$state.go('admin.actionPannel');
    		}, function(resp){
    			scope.authError = resp.data.message;
    		});
    	};
    });
