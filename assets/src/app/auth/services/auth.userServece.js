'use strict';

angular.module('adminModule').factory('authUserService', function ($q, authBackEnd) {

  var user ={};

  function setUser(_user) {
    user = _user;
    user.loggedIn = true;
  }

  function clean() {
    user.loggedIn = false;
    user.admin = false;
  }

  return {
    getUser: function () {
      var defer = $q.defer();
      if (user) {
        defer.resolve(user);
      } else {
        authBackEnd.checkAuth().then(function (resp) {
          if (resp === 'unauthorized') {
            defer.reject();
            clean();
          } else {
            setUser(resp);
            defer.resolve(resp);
          }
        }, function () {
          defer.reject();
        });
      }
      return defer.promise;
    },
    setUser: setUser,
    clean: clean
  };
});
