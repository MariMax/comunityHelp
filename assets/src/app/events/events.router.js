'use strict';

angular.module('eventsModule').config(function ($stateProvider) {

  $stateProvider
    .state('events', {
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
