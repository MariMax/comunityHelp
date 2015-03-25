'use strict';

angular.module('eventsModule').directive('eventsTableView', function(eventsDataService, eventEditPopUp){
  return {
    restrict:'E',
    replace:true,
    link:function($scope){
      var scope = $scope;
      eventsDataService.getEvents().then(function(events){
        scope.events = events;
      });

      scope.remove = function(id){
        eventsDataService.removeEvent(id);
      };

      scope.create = function(){
        eventEditPopUp.open();
      };

      scope.edit = function(event){
        eventEditPopUp.open(event);
      };
    },
    templateUrl:'app/events/views/eventsTableView.html'
  };
});
