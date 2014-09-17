/**
 * Each section of the site has its own module. It probably also has
 * submodules, though this boilerplate is too simple to demonstrate it. Within
 * `src/app/home`, however, could exist several additional folders representing
 * additional modules that would then be listed as dependencies of this one.
 * For example, a `note` section could have the submodules `note.create`,
 * `note.delete`, `note.edit`, etc.
 *
 * Regardless, so long as dependencies are managed correctly, the build process
 * will automatically take take of the rest.
 *
 * The dependencies block here is also where component dependencies should be
 * specified, as shown below.
 */
angular.module( 'mb.lists', [
  'ui.router',
  'mb.lists.new',
  'mb.lists.show',
  'mb.lists.all',
  'mb.lists.service',
  'mb.lists.factory',
  'mb.lists.viewer',
  'mb.lists.editor'
])

/**
 * Each section or module of the site can also have its own routes. AngularJS
 * will handle ensuring they are all available at run-time, but splitting it
 * this way makes each module more "self-contained".
 */
.config(function config( $stateProvider ) {
  $stateProvider.state( 'lists', {
    url: '/lists',
    abstract: true,
    views: {
      "main": {
        controller: 'ListsCtrl',
        templateUrl: 'lists/lists.tpl.html'
      }
    },
    data:{ pageTitle: 'Lists' }
  });
})

/**
 * And of course we define a controller for our route.
 */
.controller( 'ListsCtrl', function ListController( $scope, $log, $rootScope, ListsModel) {

$scope.lists = null; 
  

var sync = function(){
  ListsModel.getLists().then(function(lists){
    $log.log(lists);
  $scope.lists = lists;
  });
};


$rootScope.$on('mbSyncLists', function(){
  $log.log("mbSyncLists");
  sync();
});



sync();


});

