angular.module( 'mb.lists.viewer', [
  'mb.trooper'
])
.directive("mbListViewer", function ($log, $q, $location, $anchorScroll, $timeout, Trooper, Skills){


	var link = function(scope, element, attr) {
            var tableStates = scope.tableStates = {
                DEFAULT: 0,
                IN_PROGRESS: 1
            };
            scope.tableState = tableStates.DEFAULT;
            
            var state = scope.state = {
                DEFAULT: 0,
                IN_PROGRESS: 1,
                UPGRADE: 2,
                PLAYED: 3
            };
            scope.playAll = function(){
                scope.tableState = tableStates.IN_PROGRESS;
                var promises = _.map(scope.list.trooperReports, function(trooper){
                    return scope.play(trooper);
                });
                $q.all(promises).then(function(){
                    scope.tableState = tableStates.DEFAULT;
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
                                trooper.ui.state = scope.state.PLAYED;
                           }, function(){
                                deferred.reject({skill: skill, trooper: trooper}); 
                                trooper.ui.state = scope.state.PLAYED;
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
                $anchorScroll();
            };
            var selectTrooperById = function(tid){
                
                _.each(scope.list.trooperReports, function(trooper, i){
                    if(trooper.ui.selected){
                        trooper.ui.selected= false;
                    }else{
                       trooper.ui.selected = (trooper._id === tid);
                       if(trooper.ui.selected){
                            $log.log('current: ', trooper);
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
            _.each(scope.list.trooperReports, function(trooper){
                        trooper.ui = {
                            state: scope.state.DEFAULT,
                            infoViewVisible: false
                        };
                    });
                
            });
            scope.play = function(trooper){
                if(1 === 1){
                    var deferred2= $q.defer();
                    if(trooper.upgrade.isAvailable){
                        trooper.upgradeSkills = trooper.upgrade.skills;
                        trooper.ui.state = scope.state.UPGRADE;   
                    }
                    trooper.ui.state = scope.state.PLAYED;
                    trooper.skills = _.map(trooper.skills, function(skill){
                        console.log(skill);    
                        var obj = Skills.getSkillById(skill); 
                        return obj;
                    });
                    deferred2.resolve();
                    return deferred2.promise;
                }



                // var deferred= $q.defer();
                // trooper.ui.state = scope.state.IN_PROGRESS;    
                // Trooper.play({tid: trooper._id, lname: attr.lname}).then(function(response){                   
                //     trooper.ui.state = scope.state.PLAYED;             
                //     var troopeFights= response.fight;
                //     var trooperInfo = response.skills;
                //     trooper.fights = {
                //         battle: troopeFights[0],
                //         mission: troopeFights[1],
                //         raid: troopeFights[2]
                //     };
                //     if(response.upgrade){
                //         trooper.upgradeSkills = response.upgrade;
                //         trooper.ui.state = scope.state.UPGRADE;   
                //     }
                //     trooper.skills = trooperInfo.skills;
                //     trooper.needToUpgrade = trooperInfo.needToUpgrade;
                //     trooper.money = trooperInfo.money;
                //     deferred.resolve();
                // });
                // return deferred.promise;
            };
        };
        return {
            link: link,
            scope: {
                list: "="
            },
            restrict: "E",
            templateUrl: "lists/listsViewerDirective.tpl.html"
        };
});

