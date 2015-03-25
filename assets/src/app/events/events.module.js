'use strict';

angular.module('eventsModule',['authModule','ui.router','sailsApp.config','socketModule']).run(function(eventsDataService){
  eventsDataService.subscribe();
});
