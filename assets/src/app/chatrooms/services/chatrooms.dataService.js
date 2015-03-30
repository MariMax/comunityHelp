'use strict';

angular.module('chatroomsModule').factory('chatroomsDataService', function (eventsBackEnd, socket, $q, $timeout) {
  var chatrooms = [];
  var count = {count:0};

  return {
    getList:   function (user){
      var defer = $q.defer();

      if (chatrooms.length){
        defer.resolve(chatrooms);
      } else {
        chatroomsBackEnd.getList(user).then(function (resp) {
          _.each(resp.data, function (event) {
            chatrooms.push(event);
          });
          defer.resolve(events);
        }, function () {
          defer.reject();
        });
      }
      return defer.promise;
    },
    //saveEvent: function (event) {
    //  return eventsBackEnd.save(event);
    //},
    //removeEvent: function (eventId) {
    //  return eventsBackEnd.remove(eventId);
    //},
    //get:function(eventId){
    //  var defer = $q.defer();
    //  var el = _.find(events, {id:eventId});
    //  if (el){
    //    defer.resolve(el);
    //  } else {
    //    eventsBackEnd.get(eventId).then(function(resp){
    //      defer.redolve(resp.data);
    //    }, function () {
    //      defer.reject();
    //    });
    //  }
    //  return defer.promise;
    //},
    subscribe:function(){
      socket.subscribeModel('chatrooms', function (msg) {
        switch (msg.verb) {
          case 'created':
            count.count += 1;
            eventsBackEnd.get(msg.id).then(function (resp) {
              events.push(resp.data);
            });
            break;
          case 'updated':
            eventsBackEnd.get(msg.id).then(function (resp) {
              var el = _.find(events, {id: msg.id});
              var index = _.indexOf(events, el);
              events[index] = resp.data;
            });
            break;
          case 'destroyed':
            _.remove(events, {id: msg.id});
            $timeout(function(){count.count -= 1;});
            break;
          default:
            return;
        }
      });
    }
  };
});
