'use strict';

angular.module('adminModule').config(function ($stateProvider) {

  function permissions() {
    function permissionsChecker(authUserService, $q, $state) {
      var defer = $q.defer();
      authUserService.getUser().then(function (user) {
        if (user.admin) {
          defer.resolve();
        } else {
          $state.go('home');
          defer.reject();
        }
      }, function () {
        $state.go('home');
        defer.reject();
      });
      return defer.promise;
    }

    permissionsChecker.$inject = ['authUserService', '$q', '$state'];
    return permissionsChecker;
  }


  $stateProvider
    .state('admin', {
//            abstract: true,
      template: '<div ui-view class="fade-in-right-big smooth"></div>'
    })
    .state('admin.actionPanel', {
      url: '/admin/action',
      templateUrl: 'app/admin/views/action.html',
      controller: 'ActionController',
      resolve: {
        permissions: permissions()
      }
    })
    .state('admin.actionPanel.users', {
      url: '/users',
      templateUrl: 'app/admin/views/actionUsers.html',
      controller: 'UsersActionsController'
    })
    .state('admin.actionPanel.events', {
      url: '/events',
      templateUrl: 'app/admin/views/actionEvents.html',
      controller: 'EventsActionsController'
    })
    .state('admin.actionPanel.profile', {
      url: '/profile',
      templateUrl: 'app/admin/views/actionProfile.html',
      controller: 'ProfileActionsController'
    });
});
