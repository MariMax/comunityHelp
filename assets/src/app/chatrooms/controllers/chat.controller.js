'use strict';

angular.module('chatroomsModule')
  .controller('ChatListController', function($scope, chatrooms) {
    var scope = $scope;
    scope.chatrooms = chatrooms.data;
  });
