'use strict';

angular.module('chatroomsModule')
  .controller('ChatListController', function($scope, chatRooms, chatroomNewPopUp, $state) {
    var scope = $scope;
    scope.chatRooms = chatRooms;

    scope.spinner = false;

    scope.newChat = function(){
      scope.spinner = true;
      chatroomNewPopUp.open().then(function(chatRoom){
        scope.spinner = false;
        $state.go('chats.item', {id:chatRoom.id});
      }).catch(function(){
        scope.spinner = false;
      });
    };
  });
