
angular.module( 'mb.lists.show', [
  'ui.router',
  'mb.lists.factory',
  'utils',
  'mb.trooper'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'lists.show', {
    url: '/{lid:[a-zA-Z0-9_]{4,15}}', 
    views: {
      "lists-content": {
        controller: 'ListsShowCtrl',
        templateUrl: 'lists/show/show.tpl.html'
      }
    },
    data:{ pageTitle: 'Let\'s play!' }
  });
})
.controller( 'ListsShowCtrl', function ($scope, $log, $timeout, $state, Utils, ListsModel, Lists, Skills){
$scope.list=null;
ListsModel.getListByName($state.params.lid).then(function(list){
  

  list.getLastReport().then(function(lastReport){


     _.each(list.data.troopers, function(t, i){
      t.report = lastReport.trooperReports[i];      
    });
     $scope.list = list;
     console.log('===========================');
     console.log($scope.list);
     console.log(Skills.getSkillById(2));
  });
 

}, function(response){
  Utils.redirect("home");
});





});

