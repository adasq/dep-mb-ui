angular.module( 'mb.lists.viewer', [
  'mb.trooper'
])
.directive("mbListViewer", function ($log, $q, $timeout, Trooper){


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
                var promises = _.map(scope.troopers, function(trooper){
                    return scope.play(trooper);
                });
                $q.all(promises).then(function(){
                    scope.tableState = tableStates.DEFAULT;
                });
            };

            scope.onSkillSelection = function(trooper){
                return function(skill){
                    var skillId = skill.skillId;
                            var deferred = $q.defer(), 
                           promise = Trooper.chooseSkill({skillId: skillId, tid: trooper._id, lname: attr.lname});
                           promise.then(function(){ 
                                deferred.resolve({skill: skill, trooper: trooper}); 
                                trooper.ui.state = scope.state.PLAYED;
                           }, function(){
                                deferred.reject({skill: skill, trooper: trooper}); 
                                trooper.ui.state = scope.state.PLAYED;
                           });                      
                         return deferred.promise;                        
                };

            };
          
            var selectTrooperById = function(tid){
                _.each(scope.troopers, function(trooper){
                    trooper.ui.selected = (trooper.ui.selected?false:(trooper._id === tid));
                });
            };
            scope.selectTrooper= function(trooper){
                selectTrooperById(trooper._id);
            };
            scope.$watch('troopers', function(nv){
          if(!nv){ return;
          }
            _.each(scope.troopers, function(trooper){
                        trooper.ui = {
                            state: scope.state.DEFAULT,
                            infoViewVisible: false
                        };
                    });
                
            });
            scope.play = function(trooper){  
                var deferred= $q.defer();
                trooper.ui.state = scope.state.IN_PROGRESS;    
                Trooper.play({tid: trooper._id, lname: attr.lname}).then(function(response){                   
                    trooper.ui.state = scope.state.PLAYED;             
                    var troopeFights= response.fight;
                    var trooperInfo = response.skills;
                    trooper.fights = {
                        battle: troopeFights[0],
                        mission: troopeFights[1],
                        raid: troopeFights[2]
                    };
                    if(response.upgrade){
                        trooper.upgradeSkills = response.upgrade;
                        trooper.ui.state = scope.state.UPGRADE;   
                    }
                    trooper.skills = trooperInfo.skills;
                    trooper.needToUpgrade = trooperInfo.needToUpgrade;
                    trooper.money = trooperInfo.money;
                    deferred.resolve();
                });
                return deferred.promise;
            };
        };
        return {
            link: link,
            scope: {troopers: "="},
            restrict: "E",
            templateUrl: "lists/listsViewerDirective.tpl.html"
        };
});

