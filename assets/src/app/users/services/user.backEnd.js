'use strict';

angular.module('userModule').factory('userBackEnd', function ($http, baseUrl,checkPermission) {
  return {
    get: function () {
      return checkPermission.check().then(function () {
        return $http.post(baseUrl + '/user/get').then(function(resp){
          return resp.data;
        });
      });
    },
    update:function(user){
      return $http.post(baseUrl + '/user/update', user).then(function(resp){
        return resp.data;
      });
    },
    getUser:function(id){
      return $http.post(baseUrl + '/user/get', {id:id}).then(function(resp){
        return resp.data;
      });
    },
    getUserByEmail:function(email){
      return $http.post(baseUrl + '/user/getByEmail', {email:email}).then(function(resp){
        return resp.data;
      });
    }
  };
});
