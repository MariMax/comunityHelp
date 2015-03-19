'use strict';

angular.module('permissionModule').factory('checkPermission', function ($q, authUserService) {
  return {
    check: function () {
      var defer = $q.defer();
      authUserService.getUser().then(function (user) {
        if (user.admin) {
          defer.resolve();
        } else {
          defer.reject();
        }
      }, function () {
        defer.reject();
      });

      return defer.promise;
    }
  };
});
