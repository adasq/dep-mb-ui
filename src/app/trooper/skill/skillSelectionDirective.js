(function(){

angular
.module('mb.trooper.skill.selector', [])
.directive("mbSkillSelection", function($log, $timeout){
	var link = function(scope, element, attr) {
		var state = scope.state = {DEFAULT: 0, IN_PROGRESS: 1, SUCCESS: 2, ERROR: 3},
            ERROR_MSG_TIMEOUT = 2000,
            onSkillSelection = scope.onSkillSelection();
            scope.selectSkill = function(skill){
        scope.currentState = state.IN_PROGRESS;
        var promise = onSkillSelection(skill);
        promise.then(function(result){
            scope.result = result;
            scope.currentState = state.SUCCESS;
        }, function(result){
            scope.result = result;
            scope.currentState = state.ERROR;
            $timeout(function(){
                scope.currentState = state.DEFAULT;
            }, ERROR_MSG_TIMEOUT);
        });       
      };

      scope.$watch('skills',function(){
      _.each(scope.skills, function(skill){
	skill.style = skill.style.replace("url('/img/", "url('/assets/");
      });
      $log.log('!!',scope.skills); scope.currentState = state.DEFAULT;
      });

        };
        return {
            link: link,
            scope: {skills: "=", onSkillSelection: "&"},
            restrict: "E",
            templateUrl: "trooper/skill/skillSelectionDirective.tpl.html"
        };
});

})();
