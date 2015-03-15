'use strict';

angular.module('sailsApp').factory('sharedSettings', function($http, baseUrl, $q){
	var settings;

	return {
		getSettings: function(){
			var defer = $q.defer();
			if (settings){
				defer.resolve(settings);
			}
			else {
				$http.get(baseUrl+'/settings').then(function(resp){
					settings = resp.data;
					defer.resolve(settings);
				}, function(err){
					defer.reject(err);
				});
			}
			return defer.promise;
		}
	};
});