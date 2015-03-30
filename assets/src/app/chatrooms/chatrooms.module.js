'use strict';

angular.module('chatroomsModule',['authModule','ui.router','configModule','socketModule']).run(function(chatroomsDataService){
  chatroomsDataService.subscribe();
});
