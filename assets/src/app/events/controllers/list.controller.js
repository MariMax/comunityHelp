'use strict';

angular.module('eventsModule')
  .controller('ListController', function($scope, events) {
    var scope = $scope;
    scope.events = events.data;
  });
