'use strict';

angular.module('adminModule').factory('adminUserService', function($q, backEnd) {
    var user;
    return {
        getUser: function() {
            var defer = $q.defer();
            if (user) {
                defer.resolve(user);
            } else {
                backEnd.checkAuth().then(function(resp) {
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
        },
        clean: function(){
            user = null;
        }
    };
});
