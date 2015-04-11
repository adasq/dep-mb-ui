angular.module( 'mb.about', [
  'ui.router',
  'ui.bootstrap'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'about', {
    url: '/about',
    views: {
      "main": {
        controller: 'AboutCtrl',
        templateUrl: 'about/about.tpl.html'
      }
    },
    data:{ pageTitle: 'What is It?' }
  });
})
.directive('trooperExpand', function(Skills){
  var link = function(scope, elem, attr, ngModelCtrl){
console.log(Skills.getStyleBySkillId(1));
  scope.Skills = Skills;
  //scope.action
  };
  return {
    link: link,
    restrict: 'A',
    replace: true,
    template: '<td ng-click="action()" colspan="2">'+
    '<span ng-repeat="skill in current.skills track by skill.id" class="skill-view" style="background: url(\'/assets/skills.png\') {{Skills.getStyleBySkillId(skill.id)}}"></span>'+
    '{{current}}</td>'
  };
})
.directive('trooperTable', function ttable(){

var link = function(scope, elem, attr){

  var info = $('<tr></tr>');

  info.append($('#trooper-expand'));

  $(elem).on('click', 'tr', function(event){

    var trooperId, id = event.currentTarget.id;

    if(id.indexOf('trooper-') === -1 || (trooperId = +id.split('-')[1]) === scope.current.id ){
      return;
    }
    console.log('selectiong', id);
    
    $(event.currentTarget).after(info);
    scope.current = scope.troopers[trooperId];
    scope.$apply();
  });
};
return {
  link: link,
  restrict: 'A'
};

})
.controller( 'AboutCtrl', function AboutCtrl( $scope ) {

$scope.troopers = _.map(_.range(0, 500), 
  function(i){
return {
  id: i,
  name: 'trooper'+i,
  skills: _.map(_.range(0,20), function(id){
    return {
      id:id
    };
  })
};
});

$scope.current = $scope.troopers[0];
console.log($scope.current.skills);
})

;
