'use strict';
angular.module('adminModule').directive('asideFooter', function () {
  return {
    restrict: 'E',
    templateUrl: 'app/admin/views/aside.footer.html',
    scope: true,

    controller: function ($scope, authActions, authUserService) {
      authUserService.getUser().then(function (user) {
        $scope.user = user;
      });

      $scope.asideFold = function () {
        $scope.app.settings.asideFolded = !$scope.app.settings.asideFolded;
      };

      $scope.logout = function () {
        authActions.logout();
      };
    }
  };
});
