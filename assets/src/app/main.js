'use strict';

angular.module('sailsApp', ['ui.router', 'homeModule','adminModule', 'ui.bootstrap', 'ngAnimate'])
    .config(function($urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
    });



angular.module('sailsApp').run(function() {
  // $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
  //   if (error === 'AUTH_REQUIRED') {
  //     $state.go('home');
  //   }
  // });
});