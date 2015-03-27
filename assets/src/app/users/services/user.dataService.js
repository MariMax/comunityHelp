'use strict';

angular.module('userModule').factory('userDataService', function (userBackEnd, socket, $q, authUserService) {
  var users = [];

  socket.subscribeModel('user', function (msg) {
    switch (msg.verb) {
      case 'updated':
          authUserService.getUser().then(function(user){
            if (user.id === msg.id){
              userBackEnd.getUser(user.id).then(function(userFromBase){
                user.name = userFromBase.name;
                user.lastName = userFromBase.lastName;
                user.admin = userFromBase.admin;
                authUserService.setUser(user);
              });
            }
          });
        break;
      default:
        return;
    }
  });

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
    }
  };
});
