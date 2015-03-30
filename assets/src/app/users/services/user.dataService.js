'use strict';

angular.module('userModule').factory('userDataService', function (userBackEnd, socket, $q, authUserService, $timeout, $state) {
  var users = [];

  return {
    getUsers:function(init){
      var defer = $q.defer();
      if (init) {
        userBackEnd.get().then(function (_users) {
          _.remove(users);
          _.each(_users, function(user){
            users.push(user);
          });
          defer.resolve(users);
        });

      } else {
        defer.resolve(users);
      }
      return defer.promise;
    },
    updateUser:function(user){
      userBackEnd.update(user);
    },
    subscribe:function(){
      socket.subscribeModel('user', function (msg) {
        switch (msg.verb) {
          case 'updated':
            authUserService.getUser().then(function(user){
              if (user.id === msg.id){
                userBackEnd.getUser(user.id).then(function(userFromBase){
                  user.name = userFromBase[0].name;
                  user.lastName = userFromBase[0].lastName;
                  user.admin = userFromBase[0].admin;
                  $timeout(function(){authUserService.setUser(user);});
                  if (!user.admin){
                    $state.go('home');
                  }
                });
              }
            });
            break;
          default:
            return;
        }
      });
    }
  };
});
