'use strict';
//checkbox
angular.module('commonModule').directive('inPlaceCheckbox', ['editableDirectiveFactory',
  function(editableDirectiveFactory) {
    return editableDirectiveFactory({
      directiveName: 'inPlaceCheckbox',
      inputTpl: '<input type="checkbox">',
      render: function() {
        this.parent.render.call(this);
          this.inputEl.wrap('<label class="i-checks"></label>');
          this.inputEl.parent().append('<i></i>');
        if(this.attrs.eTitle) {
          this.inputEl.parent().append(this.attrs.eTitle);
        }
      },
      autosubmit: function() {
        var self = this;
        self.inputEl.bind('change', function() {
          setTimeout(function() {
            self.scope.$apply(function() {
              self.scope.$form.$submit();
            });
          }, 500);
        });
      }
    });
  }]);
