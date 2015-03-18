'use strict';
angular.module('homeModule').directive('mainHeader', function () {
  return {
    restrict: 'EA',
    templateUrl: 'app/home/views/mainHeader.html',
    scope: true,

    controller: function ($scope, authActions) {

      authActions.checkAuth().then(function(user){
        $scope.user = user;
      });

      $scope.logout = function () {
        authActions.logout();
      };
    }
  };
});
