'use strict';

angular.module('adminModule')
  .controller('EditController', function($scope, $state, FileUploader, baseUrl, adminBackEnd, event) {
    var scope = $scope;

    var uploader = scope.uploader = new FileUploader({
      url: baseUrl+'/file/upload',
      withCredentials:true,
      removeAfterUpload:true
    });

    if (event){
      scope.header = 'Edit event';
      scope.event = event.data;// event;
      var description = document.getElementById('wysiwyg');
      angular.element(description).html(scope.event.description);
    } else {
      scope.header = 'Create event';
      scope.event = {};
    }

    scope.cancel = function(){
      $state.go('admin.actionPanel.events');
    };

    scope.saveHandler = function(){
      adminBackEnd.events.save(scope.event).then(function(){
        $state.go('admin.actionPanel.events');
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
  });
