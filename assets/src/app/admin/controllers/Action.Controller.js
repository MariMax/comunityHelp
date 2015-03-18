'use strict';

angular.module('adminModule')
    .controller('ActionController', function($scope) {
    var scope = $scope;
    scope.app.settings.asideFolded = false;
    scope.app.settings.asideFixed = true;
    scope.app.settings.asideDock = false;
    scope.app.settings.container = false;
    scope.app.hideAside = false;
    });
