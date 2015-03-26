'use strict';

angular.module('eventsModule').factory('eventsDataService', function (eventsBackEnd, socket, $q, $timeout) {
  var events = [];
  var count = {count:0};

  function subscribe() {
    socket.subscribeModel('/event/subscribe', 'event', function (msg) {
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
    subscribe:subscribe,
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
    },
    get:function(eventId){
      var defer = $q.defer();
      var el = _.find(events, {id:eventId});
      if (el){
        defer.resolve(el);
      } else {
        eventsBackEnd.get(eventId).then(function(resp){
          defer.redolve(resp.data);
        }, function () {
          defer.reject();
        });
      }
      return defer.promise;
    }
  };
});
