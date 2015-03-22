'use strict';

angular.module('adminModule')
    .controller('EventsActionsController', function($scope, events, adminBackEnd) {
      var scope = $scope;
      scope.actions = events.data;

      scope.remove = function(id){
        adminBackEnd.events.remove(id).then(function(){
          _.remove(scope.actions, {id:id});
        });
      };
    });
