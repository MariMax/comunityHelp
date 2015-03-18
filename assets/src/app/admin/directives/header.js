'use strict';
angular.module('adminModule').directive('header', function () {
  return {
    restrict: 'A',
    templateUrl: 'app/admin/views/header.html',
    scope: true,

    controller: function ($scope, authActions) {

      $scope.logout = function () {
        authActions.logout();
      };
    }
  };
});
