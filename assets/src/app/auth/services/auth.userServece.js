'use strict';

angular.module('adminModule').factory('authUserService', function($q, authBackEnd) {
    var user;
    return {
        getUser: function() {
            var defer = $q.defer();
            if (user) {
                defer.resolve(user);
            } else {
              authBackEnd.checkAuth().then(function(resp) {
                    if (resp === 'unauthorized') {
                        defer.reject();
                    } else {
                        defer.resolve(resp);
                    }
                }, function() {
                    defer.reject();
                });
            }
            return defer.promise;
        },
        setUser: function(_user) {
            user = _user;
            user.loggedIn = true;
        },
        clean: function(){
            user.loggedIn = false;
            user.admin = false;
        }
    };
});
