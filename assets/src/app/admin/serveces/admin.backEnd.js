'use strict';

angular.module('adminModule').factory('adminBackEnd', function(baseUrl, $http){
  return {
    events:{
      save:function(event){
        return $http.post(baseUrl+'/event/save',event);
      },
      getList:function(){
        return $http.get(baseUrl+'/event/getList');
      },
      get:function(id){
        return $http.post(baseUrl+'/event/get',{id:id});
      },
      remove:function(id){
        return $http.delete(baseUrl+'/event/delete',{id:id});
      }
    }
  };
});
