
angular.module( 'mb.lists.show', [
  'ui.router',
  'mb.lists.factory'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'lists.show', {
    url: '/{lid:[a-zA-Z0-9]{3,10}}', 
    views: {
      "lists-content": {
        controller: 'ListsShowCtrl',
        templateUrl: 'lists/show/show.tpl.html'
      }
    },
    data:{ pageTitle: 'Edit rour list' }
  });
})

 


.controller( 'ListsShowCtrl', function ($scope, $log, $timeout, $state, ListsModel){

$scope.list=null;
 
ListsModel.getListByName($state.params.lid).then(function(list){
  $scope.list = list;
}, function(response){
  $log.log('ehh');
});


});

