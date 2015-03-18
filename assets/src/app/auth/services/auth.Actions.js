'use strict';

angular.module('authModule').factory('authActions', function(authBackEnd, authUserService, $state){
  return {
    signUp: authBackEnd.signUp,
    signIn: authBackEnd.signIn,
    checkAuth: authUserService.getUser,
    logout:function(){
      authBackEnd.logout();
      authUserService.clean();
      $state.go('home');
    }
  };
});
