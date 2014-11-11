angular.module( 'mb.lists.reportViewer', [
  'mb.trooper',
  'scroll'
])
.directive("mbListReportViewer", function ($log, $q, $location, $anchorScroll, $timeout, Trooper, Skills, AnchorScroll){


	var link = function(scope, element, attr) {
            
            var state = scope.state = {
                DEFAULT: 2,
                UPGRADE: 0,
                AUTH_ERR: 1,
                UPGRADED: 3,
                UPGRADE_ERR: 4
            };
 


            scope.init = function(){
                _.each(scope.list.trooperReports, function(trooper){
                    trooper.ui = {
                        state: trooper.reportState
                    };
                    if(trooper.upgrade.isAvailable){
                        trooper.upgradeSkills = trooper.upgrade.skills;                      
                    }                 

                    trooper.skills = _.map(trooper.skills, function(skill){                         
                        var obj = Skills.getSkillById(skill); 
                        return obj;
                    });
                });
            };
            scope.onSkillSelection = function(trooper){
                return function(skill){
                    var request = {
                        reportId: ""+scope.list._id,
                        trooperId: ""+trooper._id,
                        skillId: skill.skillId
                    }; 
                    var skillId = skill.skillId;
                            var deferred = $q.defer(), 
                           promise = Trooper.chooseReportSkill(request);
                           promise.then(function(){ 
                                deferred.resolve({skill: skill, trooper: trooper}); 
                                trooper.ui.state = scope.state.UPGRADED;
                           }, function(){
                                deferred.reject({skill: skill, trooper: trooper}); 
                                trooper.ui.state = scope.state.UPGRADE_ERR;
                           });    
                           if(scope.nextTrooperWithSkillSelectionAvailable){
                            var tid = scope.nextTrooperWithSkillSelectionAvailable._id;
                            navigateToTrooper(tid);
                            selectTrooperById(tid);         
                           }
                       
                         return deferred.promise;                        
                };
            };  
            var findNextTrooperWithSkillAvailable = function(currentIndex){
                return _.find(scope.list.trooperReports, function(trooper, i){
                    return trooper.upgradeSkills && (currentIndex<i);
                });
            };

            var findNextTrooper = function(i){
                            var nextTrooper = null;
                            if(i+1 == scope.list.trooperReports.length){
                                nextTrooper = scope.list.trooperReports[0];
                            }else{
                                nextTrooper = scope.list.trooperReports[i+1];
                            }
                            return nextTrooper;
            };
            var navigateToTrooper = function(tid){
                 $location.hash(tid);
                 AnchorScroll.scrollTo(tid);
                //$anchorScroll();
            };
            var selectTrooperById = function(tid){
                
                _.each(scope.list.trooperReports, function(trooper, i){
                    if(trooper.ui.selected){
                        trooper.ui.selected= false;
                    }else{
                       trooper.ui.selected = (trooper._id === tid);
                       if(trooper.ui.selected){
                            scope.nextTrooper = findNextTrooper(i);
                            scope.nextTrooperWithSkillSelectionAvailable= 
                            findNextTrooperWithSkillAvailable(i);
                       }
                    }
                });
            };
            scope.selectTrooper= function(trooper){               
                selectTrooperById(trooper._id);
            };


            scope.$watch('list.trooperReports', function(nv){
          if(!nv){ return;
          }

                scope.init();
            });

        };
        return {
            link: link,
            scope: {
                list: "="
            },
            restrict: "E",
            templateUrl: "lists/listsReportViewerDirective.tpl.html"
        };
});

