'use strict';
angular.module('adminModule').directive('mbAside', function(){
    return {
        restrict: 'AC',
        templateUrl:'app/admin/views/aside.html',
        scope:true
    };
});