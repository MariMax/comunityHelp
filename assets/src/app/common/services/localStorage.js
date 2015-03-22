'use strict';
  angular.module('commonModule').factory('localStorage', function ($window) {
    return {
      getItem: function (name) {
        return $window.sessionStorage.getItem(name);
      },
      clear: function () {
        return $window.sessionStorage.clear();
      },
      setItem: function (name, value) {
        return $window.sessionStorage.setItem(name, value);
      },
      removeItem: function (name) {
        return $window.sessionStorage.removeItem(name);
      }
    };
  });
