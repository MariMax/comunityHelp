'use strict';

angular.module('eventsModule').config(function ($stateProvider) {

  $stateProvider
    .state('events', {
//            abstract: true,
      template: '<div ui-view class="fade-in-right-big smooth"></div>'
    })
    .state('events.list',{
      url:'/events/list',
      controller:'ListController',
      templateUrl: 'app/events/views/events.html',
      resolve:{
        user:function(authUserService, $q, $state){
          var defer = $q.defer();
          authUserService.getUser().then(function(user){
            if (user&&user.loggedIn) {
              defer.resolve();
            } else{
              defer.reject();
              $state.go('auth.signIn');
            }
          }, function(){
            defer.reject();
            $state.go('auth.signIn');
          });

          return defer.promise;
        },
        events:function(eventsBackEnd){
          return eventsBackEnd.getList();
        }
      }
    });
});
