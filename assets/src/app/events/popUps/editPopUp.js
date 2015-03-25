'use strict';

angular.module('eventsModule').factory('eventEditPopUp',function ($modal, $q, $timeout) {
  function ctrl($scope, $modalInstance, event, FileUploader, baseUrl, eventsDataService){
    var scope = $scope;
    scope.spinner = false;


    var uploader = scope.uploader = new FileUploader({
      url: baseUrl+'/file/upload',
      withCredentials:true,
      removeAfterUpload:true
    });

    scope.getWysywig = function(){
      var description = document.getElementById('wysiwyg');
      if (!description){
        $timeout(scope.getWysywig, 100);
        return;
      }
      angular.element(description).html(scope.event.description);
    };

    if (event){
      scope.header = 'Edit event';
      eventsDataService.get(event).then(function(event){
        scope.event = event;
        $timeout(scope.getWysywig, 100);
      });
    } else {
      scope.header = 'Create event';
      scope.event = {};
    }

    scope.cancel = function(){
      $modalInstance.dismiss('cancel');
    };

    scope.saveHandler = function(){
      eventsDataService.saveEvent(scope.event).then(function(){
        $modalInstance.close();
      }, function(){
        scope.spinner = false;
        scope.eventError = 'Cannot save event, please try again later';
      });
    };

    scope.save = function(){
      if (scope.eventForm.$invalid){
        return;
      }

      scope.spinner = true;

      var description = document.getElementById('wysiwyg');
      scope.fileError = null;
      scope.event.description = angular.element(description).html();
      if (uploader.queue.length===0){
        scope.saveHandler();
      }
      uploader.uploadAll();
    };

    uploader.onSuccessItem = function(fileItem, response, status, headers) {
      console.info('onSuccessItem', fileItem, response, status, headers);
      scope.event.image = response.prefix+'/'+response.bucket+'/'+response.files[0].fd;
      scope.saveHandler();
    };
    uploader.onErrorItem = function(fileItem, response, status, headers) {
      console.info('onErrorItem', fileItem, response, status, headers);
      scope.fileError = 'Cannot upload file, please try again later';
    };
  }

  return {
    open: function(item) {
      var defer = $q.defer();
      var modalInstance = $modal.open({
        templateUrl: 'app/events/views/popUps/editPopUp.html',
        controller: ctrl,
        size: 'lg',
        resolve: {
          event: function() {
            return item;
          }
        }
      });

      modalInstance.result.then(function() {
        defer.resolve();
      }, function() {
        defer.reject();
      });

      return defer.promise;
    }
  };
});
