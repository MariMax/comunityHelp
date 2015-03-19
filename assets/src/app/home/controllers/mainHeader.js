'use strict';

angular.module('homeModule')
  .controller('mainHeader', function ($scope, authActions) {

    authActions.checkAuth().then(function(user){
      $scope.user = user;
    });

    $scope.logout = function () {
      authActions.logout();
    };
  });
