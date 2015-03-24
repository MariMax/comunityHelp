'use strict';

angular.module('socketModule',[]).factory('socket', function(baseUrl){
 var socket = {};
  var sumscribedModels = [];

  return {
    subscribeEvent:function(){
    },
    subscribeModel:function(url, model, callback){
      if (_.include(sumscribedModels, model)) {
        return;
      }
      if (!socket.get){
        socket = io.sails.connect(baseUrl);
      }
      socket.get(baseUrl+url);
      socket.on(model, callback);
      sumscribedModels.push(model);
    }
  };
});
