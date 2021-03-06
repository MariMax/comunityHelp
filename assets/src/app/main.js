'use strict';

angular.module('sailsApp', ['ui.router', 'homeModule', 'adminModule', 'authModule', 'ngAnimate', 'ui.bootstrap', 'ngStorage', 'permissionModule', 'socketModule', 'ui.jq', 'angularFileUpload', 'ngSanitize', 'commonModule', 'configModule', 'xeditable'])
  .config(function ($urlRouterProvider, $httpProvider) {
    $httpProvider.defaults.withCredentials = true;
    $urlRouterProvider.otherwise('/');

    $httpProvider.interceptors.push(function ($window, authUserService, $q) {
      return {
        'responseError': function (response) {
          if (response.status === 401) {
            //$state.go('home');
            authUserService.clean();
            $window.location.href = '#/auth/signIn';
          }
          return $q.reject(response);
        }
      };
    });
  });

angular.module('sailsApp')
  .controller('AppCtrl', function ($scope, $localStorage, $window) {
    function isSmartDevice($window) {
      // Adapted from http://www.detectmobilebrowsers.com
      var ua = $window.navigator.userAgent || $window.navigator.vendor || $window.opera;
      // Checks for iOs, Android, Blackberry, Opera Mini, and Windows mobile devices
      return (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
    }

    // add 'ie' classes to html
    var isIE = !!$window.navigator.userAgent.match(/MSIE/i);
    if (isIE) {
      angular.element($window.document.body).addClass('ie');
    }
    if (isSmartDevice($window)) {
      angular.element($window.document.body).addClass('smart');
    }

    // config
    $scope.app = {
      name: 'Admin page',
      version: '1',
      // for chart colors
      color: {
        primary: '#7266ba',
        info: '#23b7e5',
        success: '#27c24c',
        warning: '#fad733',
        danger: '#f05050',
        light: '#e8eff0',
        dark: '#3a3f51',
        black: '#1c2b36'
      },
      settings: {
        themeID: 1,
        navbarHeaderColor: 'bg-black',
        navbarCollapseColor: 'bg-black',
        asideColor: 'bg-black',
        headerFixed: true,
        asideFixed: true,
        asideFolded: false,
        asideDock: false,
        container: false
      }
    };

    // save settings to local storage
    if (angular.isDefined($localStorage.settings)) {
      $scope.app.settings = $localStorage.settings;
    } else {
      $localStorage.settings = $scope.app.settings;
    }
    $scope.$watch('app.settings', function () {
      if ($scope.app.settings.asideDock && $scope.app.settings.asideFixed) {
        // aside dock and fixed must set the header fixed.
        $scope.app.settings.headerFixed = true;
      }
      // save to local storage
      $localStorage.settings = $scope.app.settings;
    }, true);

  });


angular.module('sailsApp').run(function (editableOptions, editableThemes) {
  editableOptions.theme = 'bs3';
  editableThemes.bs3.buttonsClass = 'btn-sm';
  // $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
  //   if (error === 'AUTH_REQUIRED') {
  //     $state.go('home');
  //   }
  // });
});
