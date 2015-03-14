'use strict';

angular.module('homeModule').config(function($stateProvider) {
    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'app/home/views/home.html',
            controller: 'HomeController'
        });
});