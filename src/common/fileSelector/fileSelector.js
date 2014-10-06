angular.module( 'fileSelector', [])
.directive("aqFileSelector", function($log, $rootScope){
        var link = function(scope, element, attr) {

scope.id='file-'+(attr.id || 'default');
scope.btnText = attr.btnText || 'Load file';

function handleFileSelect(evt) {
    var files = evt.target.files;
    var file = files[0];
  
var sendMessage = function(toSend){
	scope.$emit('aqFileSelector', {obj: toSend, id: scope.id});
};

 var reader = new FileReader();
    reader.onloadend = function(evt) {
      if (evt.target.readyState == FileReader.DONE) {
      var BASE64_PREFIX_LENGTH=23;
      sendMessage(evt.target.result.substr(BASE64_PREFIX_LENGTH));
       }
       };
      reader.readAsDataURL(file);
    }
 element.find('input').on('change', handleFileSelect);
 

        };
        return {
            link: link,
            scope: false,
            restrict: "E",
            templateUrl: "fileSelector/fileSelector.tpl.html"
        };
});