'use strict';

angular.module('chatroomsModule')
  .controller('ChatListItemController', function($scope, chatRoom, chatroomsDataService) {
    var scope = $scope;
    scope.chatRoom = chatRoom;

    scope.send = function(){
      chatroomsDataService.sendMessage(scope.message, chatRoom.id).then(function(){
        scope.message = '';
      });
    };


  });
