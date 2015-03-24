'use strict';

angular.module('eventsModule').factory('eventsBackEnd', function ($http, baseUrl, authUserService) {
  return {
    get: function (id) {
      return authUserService.getUser().then(function () {
        return $http.post(baseUrl + '/event/get', {id: id});
      });
    },
    save: function (event) {
      return authUserService.getUser().then(function () {
        return $http.post(baseUrl + '/event/save', event);
      });
    },
    getList: function () {
      return authUserService.getUser().then(function () {
        return $http.get(baseUrl + '/event/getList');
      });
    },
    remove: function (id) {
      return authUserService.getUser().then(function () {
        return $http.post(baseUrl + '/event/delete', {id: id});
      });
    },
    getCount: function () {
        return $http.get(baseUrl + '/event/count');
    }
  };
});
