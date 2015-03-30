'use strict';

angular.module('chatroomsModule').factory('chatroomsBackEnd', function ($http, baseUrl, authUserService) {
  return {
    get: function (id) {
      return authUserService.getUser().then(function () {
        return $http.post(baseUrl + '/chatrooms/get', {id: id});
      });
    },
    join: function (chatroom) {
      return authUserService.getUser().then(function () {
        return $http.post(baseUrl + '/chatrooms/join', chatroom);
      });
    },
    invite: function (chatroom, user) {
      return authUserService.getUser().then(function () {
        return $http.post(baseUrl + '/chatrooms/invite', {chatroomId:chatroom.id, userId:user.id});
      });
    },
    getList: function (user) {
        return $http.post(baseUrl + '/chatrooms/getList', {userId:user.id});
    },
    leave: function (id) {
      return authUserService.getUser().then(function () {
        return $http.post(baseUrl + '/chatrooms/leave', {id: id});
      });
    }
  };
});
