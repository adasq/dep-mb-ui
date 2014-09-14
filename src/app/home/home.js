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
angular.module( 'mb.home', [
  'ui.router',
  'former'
])

/**
 * Each section or module of the site can also have its own routes. AngularJS
 * will handle ensuring they are all available at run-time, but splitting it
 * this way makes each module more "self-contained".
 */
.config(function config( $stateProvider ) {
  $stateProvider.state( 'home', {
    url: '/home',
    views: {
      "main": {
        controller: 'HomeCtrl',
        templateUrl: 'home/home.tpl.html'
      }
    },
    data:{ pageTitle: 'Home' }
  });
})

/**
 * And of course we define a controller for our route.
 */
.controller( 'HomeCtrl', function HomeController( $scope, $log ) {


 var getFieldByName = function(name){
    return _.find($scope.form.fields, function(field){
      return (field.field_name === name);
    });
  };
  $scope.form = {
        submit: function(){    
          var promise = Auth.register(FormManager.getModelData(this.fields));
          promise.then(successHandler, errorHandler);
        },        
        fields: [
            {
                            "field_title" : "login",
                            "field_value" : "yebieoll",
                            "field_placeholder": "login",
                            "field_type": "text",
                            "field_name" : "name",
                            "field_required" : true,
                    "field_disabled" : false,
                    "field_validator": function(val){                     
                      return (val && val.length > 3);
                    }
            },
            {
                            "field_title" : "e-mail",
                            "field_value" : "yebieoll@gmail.com",
                            "field_placeholder": "example@gmail.com",
                            "field_type": "email",
                            "field_name" : "mail",
                            "field_required" : true,
                    "field_disabled" : false
            },
            {
                            "field_title" : "password",
                            "field_value" : "",
                            "field_placeholder": "password",
                            "field_type": "password",
                            "field_name" : "pass",
                            "field_required" : true,
                    "field_disabled" : false,
                    "notify": function(){
                      getFieldByName("pass2").triggerValidation();
                    }
            },
            {
                            "field_title" : "password again",
                            "field_value" : "",
                            "field_placeholder": "password again",
                            "field_type": "password",
                            "field_name" : "pass2",
                            "field_required" : true,
                    "field_disabled" : false,
                    "field_validator": function(value){         
                      return (value && value === getFieldByName("pass").field_value);
                    }
            }
        ]
  };









});

