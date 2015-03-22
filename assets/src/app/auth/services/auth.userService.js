'use strict';

angular.module('adminModule').factory('authUserService', function ($q, localStorage) {

  var user ={};

  function setUser(_user) {
    user = _user;
    user.loggedIn = true;
    localStorage.setItem('user', angular.toJson(user));
  }

  function clean() {
    user.loggedIn = false;
    user.admin = false;
    localStorage.removeItem('user');
  }

  return {
    getUser: function () {
      var defer = $q.defer();
      var userFromStorage = angular.fromJson(localStorage.getItem('user'))||{};
      user = user.loggedIn?user:userFromStorage;

      if (user.loggedIn) {
        defer.resolve(user);
      } else {
        defer.reject();
      }
      return defer.promise;
    },
    setUser: setUser,
    clean: clean
  };
});
