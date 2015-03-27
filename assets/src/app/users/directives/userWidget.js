'use strict';

angular.module('userModule').directive('userWidget',function(userDataService){
  return {
    restrict: 'E',
    replace:true,
    templateUrl:'app/users/views/usersView.html',
    link:function($scope){
      var scope = $scope;
      userDataService.getUsers(true).then(function(users){
        scope.users = users;
      });
    }
  };
});
