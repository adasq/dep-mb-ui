
angular.module( 'mb.lists.all', [
  'ui.router'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'lists.all', {
    url: '/all',  
    views: {
      "lists-content": {
        controller: 'ListsAllCtrl',
        templateUrl: 'lists/all/all.tpl.html'
      }
    },
    data:{ pageTitle: 'Your lists' }
  });
})

.controller( 'ListsAllCtrl', function ListsAllCtrl($scope, $log, $timeout) {


});

