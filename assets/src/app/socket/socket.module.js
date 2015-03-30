'use strict';

angular.module('socketModule',[]).factory('socket', function(baseUrl,subscription){
 var socket = {};
  var sumscribedModels = [];

  if (!socket.get){
    socket = io.sails.connect(baseUrl);
  }

  socket.get(baseUrl+subscription);

  return {
    subscribeModel:function(model, callback){
      if (_.include(sumscribedModels, model)) {
        return;
      }

      //socket.get(baseUrl+url);
      socket.on(model, callback);
      sumscribedModels.push(model);
    }
  };
});
