
angular.module( 'mb.lists.show', [
  'ui.router',
  'mb.lists.factory',
  'utils'
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
.controller( 'ListsShowCtrl', function ($scope, $log, $timeout, $state, Utils, ListsModel){
$scope.list=null;
ListsModel.getListByName($state.params.lid).then(function(list){
  $scope.list = list;
}, function(response){
  Utils.redirect("home");
});


});

