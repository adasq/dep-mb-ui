
angular.module("template/popover/popover.html", [])
.filter('unsafe', ['$sce', function ($sce) {
    return function (val) {
        return $sce.trustAsHtml(val);
    };
}])
.run(["$templateCache", function($templateCache) {
  $templateCache.put("template/popover/popover.html",
    "<div class=\"popover {{placement}}\" ng-class=\"{ in: isOpen(), fade: animation() }\">\n" +
    "  <div class=\"arrow\"></div>\n" +
    "\n" +
    "  <div class=\"popover-inner\">\n" +
    "      <h3 class=\"popover-title\" ng-bind=\"title\" ng-show=\"title\"></h3>\n" +
    "      <div class=\"popover-content\" ng-bind-html=\"content | unsafe\"></div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module( 'mb', [
  'templates-app',
  'templates-common',
  'mb.trooper',
  'mb.home',
  'mb.about',
  'mb.auth',
  'mb.lists',
  'mb.register',
  'ui.router',
  'mb.family'
])
.config( function myAppConfig ( $stateProvider, $urlRouterProvider ) {
  $urlRouterProvider.otherwise( '/home' );
})
.run( function run () {
})
.controller( 'AppCtrl', function AppCtrl ( $timeout, $location,  $scope, $log, $state, $rootScope, Auth) {
 
  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
    

    if ( angular.isDefined( toState.data.pageTitle ) ) {
      $scope.pageTitle = toState.data.pageTitle + ' | mb' ;
    } 
  });
  var currentState = "";

  $scope.base = {
    auth: null,
    setUser: function(user){    
        $scope.base.auth = {
          user: user || undefined,
          loggedIn: !!user
        };       
    }    
  };

  var handlePossibleRedirection = function(event){ 
    if(!$scope.base.auth){
      return;
    }
    var isLoggedIn = $scope.base.auth && $scope.base.auth.loggedIn;
    var isStateAllowedForUnauthorized = _.contains(['register', 'login', 'home'], currentState);
    var isStateAllowedForAuthorized = !_.contains(['register', 'login'], currentState);
    if(!isLoggedIn){
      if(!isStateAllowedForUnauthorized){
        if(event){
          event.preventDefault();
        }          
        $state.go('login');         
      }
    }else{
      if(!isStateAllowedForAuthorized){
        if(event){
          event.preventDefault();
        }
      }
    }
  };


  $rootScope.$on('$stateChangeStart', 
  function(event, toState, toParams, fromState, fromParams){
    currentState = toState.name;  
    handlePossibleRedirection(event);   
  });

  $scope.$watch('base.auth', function(newValue){
    if(newValue){
      handlePossibleRedirection();
    } 
  });


  



Auth.getUser().then(function(response){   
    $scope.base.setUser(response.user); 
}, function(){
    $scope.base.setUser(null);
});


$scope.logout = function(){
  Auth.logout().then(function(){    
    $scope.base.setUser(null);    
  });
};










});

