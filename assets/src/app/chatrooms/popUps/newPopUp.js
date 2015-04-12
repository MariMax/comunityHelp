'use strict';

angular.module('chatroomsModule').factory('chatroomNewPopUp',function ($modal, $q, userDataService, chatroomsDataService) {
  function createDialog(user, message){
    return chatroomsDataService.createDialog(user, message).then(function(resp){
      return resp.data;
    });
  }

  function ctrl($scope, $modalInstance){
    var scope = $scope;

    scope.spinner = false;

    scope.getUser = function(val) {
      return userDataService.getUserByEmail(val);
    };

    scope.save = function(){
      if (scope.chatRoomForm.$invalid){
        return;
      }

      scope.spinner = true;

      var description = document.getElementById('wysiwyg');

      scope.message = angular.element(description).html();

      scope.errorHandler = function(message){
        scope.spinner = false;
        scope.chatRoomError = message;
      };

      if (typeof scope.user === 'string'){
        scope.getUser(scope.user).then(function(user){
          scope.spinner = false;
          if (user.length&&user[0].email===scope.user) {
            createDialog(user[0], scope.message).then(function(chatRoom){
              $modalInstance.close(chatRoom);
            }, function(){
              scope.errorHandler('Cannot start dialog, please try again later');
            });
          } else {
            scope.errorHandler('Cannot find user with email = '+scope.user);
          }
        }, function(){
          scope.errorHandler('Cannot start dialog, please try again later');
        });
      } else {
        createDialog(scope.user, scope.message).then(function(chatRoom) {
          $modalInstance.close(chatRoom);
        }, function(){
          scope.errorHandler('Cannot start dialog, please try again later');
        });
      }
    };

    scope.cancel = function(){
      $modalInstance.dismiss('cancel');
    };
  }

  return {
    open: function() {
      var defer = $q.defer();
      var modalInstance = $modal.open({
        templateUrl: 'app/chatrooms/views/popUps/newPopUp.html',
        controller: ctrl,
        size: 'lg'
      });

      modalInstance.result.then(function(chatRoom) {
        defer.resolve(chatRoom);
      }, function() {
        defer.reject();
      });

      return defer.promise;
    }
  };
});
