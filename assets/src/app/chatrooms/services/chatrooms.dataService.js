'use strict';

angular.module('chatroomsModule').factory('chatroomsDataService', function (chatroomsBackEnd, socket, $q, $timeout, authUserService) {
  var chatRooms = [];

  return {
    getList:   function (user){
      var defer = $q.defer();

      if (chatRooms.length){
        defer.resolve(chatRooms);
      } else {
        chatroomsBackEnd.getList(user).then(function (resp) {
          _.each(resp.data, function (chatRoom) {
            chatRooms.push(chatRoom);
          });
          defer.resolve(chatRooms);
        }, function () {
          defer.reject();
        });
      }
      return defer.promise;
    },
    sendMessage:function(message, chatRoomId){
      return chatroomsBackEnd.sendMessage(message, chatRoomId);
    },
    createDialog:function(user, message){
      return chatroomsBackEnd.createNew(user, message);
    },
    invite: function(chatRoomId, user){
      return chatroomsBackEnd.invite(chatRoomId, user);
    },
    get: function(chatRoomId){
      return _.find(chatRooms, {id:chatRoomId});
    },
    getFull: function(chatRoomId){
      return chatroomsBackEnd.getFull(chatRoomId).then(function(resp){
        var chatRoom = resp.data;
        _.remove(chatRooms, {id:chatRoom.id});
        chatRoom.lastMessage = chatRoom.messages[chatRoom.messages.length-1];
        chatRooms.unshift(chatRoom);
        return chatRoom;
      });
    },
    leave: function(chatRoomId){
      return chatroomsBackEnd.leave(chatRoomId);
    },
    subscribe:function(){
      socket.subscribeModel('chatrooms', function (msg) {
        var chatRoom;
        switch (msg.verb) {
          case 'created':
            authUserService.getUser().then(function(user){
              if (_.indexOf(msg.userIds, user.id)>=0) {
                chatroomsBackEnd.get(msg.id).then(function (resp) {
                  chatRooms.push(resp.data);
                  $timeout(function(){return;});
                });              }
            });
            break;
          case 'userGone':
            chatRoom = _.find(chatRooms, {id:msg.id});
            if (chatRoom){
              _.remove(chatRoom.users, function(user){
                return user.id === msg.userId;
              });
            }
            $timeout(function(){return;});
            break;
          case 'newMessage':
            chatRoom = _.find(chatRooms, {id:msg.id});
            authUserService.getUser().then(function(user){
              if (_.indexOf(msg.userIds, user.id)>=0) {
                chatroomsBackEnd.getMessage(msg.messageId).then(function (resp) {
                  chatRoom.messages.push(resp.data);
                  chatRoom.lastMessage = resp.data;
                });
              }
            });
            $timeout(function(){return;});
            break;
          case 'userAdded':
            chatRoom = _.find(chatRooms, {id:msg.id});
            if (chatRoom){

              _.remove(chatRoom.users, function(user){
                return user.id === msg.userId;
              });
            }
            $timeout(function(){return;});
            break;
          default:
            return;
        }
      });
    }
  };
});
