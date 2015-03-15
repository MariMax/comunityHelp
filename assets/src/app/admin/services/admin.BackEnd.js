'use strict';

angular.module('adminModule').factory('backEnd', function(baseUrl, $http, $q){
	return {
		signUp: function(user){
			return $http.post(baseUrl+'/auth/local/register', user, {withCredentials:true}).then(function(data){
				return data.data;
			});
		},
		signIn: function(user){
			return $http.post(baseUrl+'/auth/local', user, {withCredentials:true}).then(function(data){
				return data.data;
			});
		},
		checkAuth: function(){
			var defer = $q.defer();
			$http.get(baseUrl+'/auth/checkAuth',{withCredentials:true}).then(function(data){
				defer.resolve(data.data);
			}, function(resp){
				if(resp.status===401){
					defer.resolve('unauthorized'); 
				} else {
					defer.reject(resp);
				}
			});
			return defer.promise;
		},
		logout:function(){
			$http.get(baseUrl+'/auth/logout',{withCredentials:true});
		}
	};
});