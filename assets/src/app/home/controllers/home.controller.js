'use strict';

angular.module('homeModule')
    .controller('HomeController', function($scope, authUserService) {
    var scope = $scope;
      authUserService.getUser().then(function(user){
        if (user.admin){
          scope.addAdminButton = true;
        }
      });
    });
