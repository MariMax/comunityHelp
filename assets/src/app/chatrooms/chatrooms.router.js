'use strict';

angular.module('chatroomsModule').config(function ($stateProvider) {

  $stateProvider
    .state('chats', {
//            abstract: true,
      template: '<div ui-view class="fade-in-right-big smooth"></div>'
    })
    .state('chats.list',{
      url:'/chats/list',
      controller:'ChatListController',
      templateUrl: 'app/chatrooms/views/chatrooms.html',
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
        chatrooms:function(chatroomsBackEnd){
          return authUserService.getUser().then(function(user) {
            return chatroomsBackEnd.getList(user);
          });
        }
      }
    });
});
