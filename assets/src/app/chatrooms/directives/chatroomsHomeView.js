'use strict';

angular.module('chatroomsModule').directive('chatroomsHomeView', function(){
  return {
    restrict:'E',
    replace:true,
    templateUrl:'app/chatrooms/views/chatroomsHomeView.html'
  };
});
