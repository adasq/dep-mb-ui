
angular.module( 'mb.lists.new', [
  'ui.router',
  'mb.lists',
  'mb.lists.factory',
  'mb.lists.editor'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'lists.new', {
    url: '/new', 
    views: {
      "lists-content": {
        controller: 'ListsNewCtrl',
        templateUrl: 'lists/new/new.tpl.html'
      }
    },
    data:{ pageTitle: 'Create new List!' }
  });
})

.controller( 'ListsNewCtrl', function ListNewController( $scope, $log, $rootScope, ListsModel ) {



$scope.newList = new ListsModel({name: "", troopers: []});
   
  $scope.saveList = function(){
  
    var promise = $scope.newList.save();
    promise.then(function(){
      $rootScope.$emit('mbSyncLists', {});
      Utils.redirect("lists.show", {lid: $scope.newList.data.name});
    }, function(){
      $log.log("errr");
    });
    
  };




});

