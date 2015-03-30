'use strict';

angular.module('userModule').directive('userWidget',function(userDataService, authUserService){
  return {
    restrict: 'E',
    replace:true,
    templateUrl:'app/users/views/usersView.html',
    link:function($scope){
      var scope = $scope;
      userDataService.getUsers(true).then(function(users){
        scope.users = users;
      });

      authUserService.getUser().then(function(me){
        scope.me = me;
      });

      scope.submit = function(user){
        userDataService.updateUser(user);
      };
    }
  };
});
