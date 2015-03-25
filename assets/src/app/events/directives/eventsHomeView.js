'use strict';

angular.module('eventsModule').directive('eventsHomeView', function(eventsDataService){
  return {
    restrict:'E',
    replace:true,
    link:function($scope){
      var scope = $scope;
      eventsDataService.getEventsCount(true).then(function(data){
        scope.count = data.count;
      });
    },
    templateUrl:'app/events/views/eventsHomeView.html'
  };
});
