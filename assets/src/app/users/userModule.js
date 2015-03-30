'use strict';

angular.module('userModule',['permissionModule','socketModule','authModule']).run(function(userDataService){
  userDataService.subscribe();
});
