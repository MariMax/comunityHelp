'use strict';

angular.module('eventsModule').factory('eventsDataService', function (eventsBackEnd, socket, $q) {
  var events = [];
  var count = {count:0};
  socket.subscribeModel('/event/subscribe', 'event', function (msg) {
    switch (msg.verb) {
      case 'created':
        eventsBackEnd.get(msg.id).then(function (resp) {
          events.push(resp.data);
          count.count+=1;
        });
        break;
      case 'updated':
        eventsBackEnd.get(msg.id).then(function (resp) {
          var index = _.indexOf(events, {id:msg.id});
          events[index] = resp.data;
        });
        break;
      case 'destroyed':
        _.remove(events, {id:msg.id});
        break;
      default:
        return;
    }
  });

  function getEvents(){
    var defer = $q.defer();

    if (events.length){
      defer.resolve(events);
    } else {
      eventsBackEnd.getList().then(function (resp) {
        _.each(resp.data, function (event) {
          events.push(event);
        });
        defer.resolve(events);
      }, function () {
        defer.reject();
      });
    }
    return defer.promise;
  }

  return {
    getEvents: getEvents,
    getEventsCount: function (init) {
      var defer = $q.defer();
      if (init){
        eventsBackEnd.getCount().then(function(resp){
          count.count = resp.data.count;
          defer.resolve(count);
        }, function(){
          defer.reject();
        });
      } else {
        defer.resolve(count);
      }
      return defer.promise;
    },
    saveEvent: function (event) {
      return eventsBackEnd.save(event);
    },
    removeEvent: function (eventId) {
      return eventsBackEnd.remove(eventId);
    }
  };
});