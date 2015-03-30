'use strict';

angular.module('eventsModule',['authModule','ui.router','configModule','socketModule']).run(function(eventsDataService){
  eventsDataService.subscribe();
});
