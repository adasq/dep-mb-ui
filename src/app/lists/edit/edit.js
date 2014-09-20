
angular.module( 'mb.lists.edit', [
  'ui.router',
  'mb.lists',
  'mb.lists.factory',
  'mb.lists.editor',
  'utils' 
])
 
.config(function config( $stateProvider ) {
  $stateProvider.state( 'lists.edit', {
   url: '/{lid:[a-zA-Z0-9]{4,10}}/edit',
    views: {
      "lists-content": {
        controller: 'ListsEditCtrl',
        templateUrl: 'lists/edit/edit.tpl.html'
      }
    },
    data:{ pageTitle: 'Edit List!'}
  });
})

.controller( 'ListsEditCtrl', function ($scope, $state, $log, $rootScope, ListsModel, Utils){

 
 $scope.currentList=null;
 $log.log('list name: ',$state.params.lid);

 
ListsModel.getListByName($state.params.lid).then(function(list){
  $scope.currentList= list;
}, function(response){
  Utils.redirect('lists.all');
});


$scope.updateList = function(){
  var promise= $scope.currentList.save();
  promise.then(function(){
    $rootScope.$emit('mbSyncLists', {});
    Utils.redirect('lists.show', {lid: $scope.currentList.data.name});
  }, function(reason){
    $log.log(reason);
  });
};


});

