'use strict';

angular.module('socketModule',[]).factory('socket', function(baseUrl){
  io.sails.url = baseUrl;
  return io.sails;
});
