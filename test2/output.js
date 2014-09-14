angular.module( 'former', []);;(function(){ 
var FormEntity = function($http, $compile, $templateCache){
	var linker = function(scope, element) {
         //   $http.get('former/formEntity.tpl.html').then(function(template){
               // element.html(template.data);
                //$compile(element.contents())(scope);
         //   });
        };
        return {            
            restrict: 'E',
            scope: {
                field:'='
            },
            templateUrl: 'former/formEntity.tpl.html',
            link: linker
        };
};
angular
.module("former")
.directive("mbFormEntity", FormEntity);
})();
 ;(function(){ 
var FormEntityValidator = function($log){
     var link = function(scope, element, attr, controller) {
            var setCurrentFieldValidity = function(valid){
                controller.$setValidity('unique', valid);
            };
            var fieldValidator = scope.field.field_validator;
            scope.field.triggerValidation = function(){
          setCurrentFieldValidity(fieldValidator(scope.field.field_value));
        };
			if(fieldValidator){
				scope.$watch(attr.ngModel, function(newValue) {
                    setCurrentFieldValidity(fieldValidator(newValue));
                  });
      }
    };
        return {
          require: "ngModel",
          link: link,
          restrict: "A"      
        };

};
angular
.module("former")
.directive("formEntityValidator", FormEntityValidator);
})();

;(function(){
var FormManager = function(){

	this.getModelData = function(fields){
		var formData= {};
		_.each(fields, function(field){
						formData[field.field_name] = field.field_value;
					});
		return formData;
	};

};
angular
.module("former")
.service("FormManager", FormManager);
})();

