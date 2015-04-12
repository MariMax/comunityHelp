'use strict';

angular.module('chatroomsModule').factory('chatroomsBackEnd', function ($http, baseUrl, authUserService) {
  return {
    sendMessage: function(message, id){
      return authUserService.getUser().then(function () {
        return $http.post(baseUrl + '/chatrooms/addMessage', {chatRoomId: id, message:message});
      });
    },
    getMessage:function(id){
      return authUserService.getUser().then(function () {
        return $http.post(baseUrl + '/chatrooms/getMessage', {messageId: id});
      });
    },
    get: function (id) {
      return authUserService.getUser().then(function () {
        return $http.post(baseUrl + '/chatrooms/get', {chatRoomId: id});
      });
    },
    getFull:function(id){
      return authUserService.getUser().then(function () {
        return $http.post(baseUrl + '/chatrooms/getFull', {chatRoomId: id});
      });
    },
    invite: function (chatRoomId, user) {
      return authUserService.getUser().then(function () {
        return $http.post(baseUrl + '/chatrooms/invite', {chatRoomId:chatRoomId, userId:user.id});
      });
    },
    getList: function (user) {
        return $http.post(baseUrl + '/chatrooms/getList', {userId:user.id});
    },
    leave: function (id) {
      return authUserService.getUser().then(function () {
        return $http.post(baseUrl + '/chatrooms/leave', {chatRoomId: id});
      });
    },
    createNew: function(user, message){
      return authUserService.getUser().then(function () {
        return $http.post(baseUrl + '/chatrooms/new', {message: message, userId:user.id});
      });
    }
  };
});
