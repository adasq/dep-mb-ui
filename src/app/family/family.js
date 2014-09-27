
angular.module( 'mb.family', [
  'mb.family.visualization',
  'ui.router',
  'requestHandler',
  'former',
  'mb.trooper',
  'alert'
])
.config(function config( $stateProvider ) {
  $stateProvider.state( 'family', {
    url: '/family',
    views: {
      "main": {
        controller: 'FamilyCtrl',
        templateUrl: 'family/family.tpl.html'
      }
    },
    data:{ pageTitle: 'Family' }
  });
})

.controller( 'FamilyCtrl', function ( $scope, $log, $state, AlertManager, FormManager, Trooper) {

 
var alertManager = new AlertManager($scope);  

  var errorHandler = function(response){
    alertManager.setDangerAlert(response);
  };

  
  var successHandler = function(response){
    $scope.base.setUser(response.user);
    $state.go('home');

  };

  var getFieldByName = function(name){
    return _.find($scope.form.fields, function(field){
      return (field.field_name === name);
    });
  };

  $scope.form = {
        submit: function(){
          $scope.familyAvailable = false;   
          var fields = FormManager.getModelData(this.fields); 
          $log.log(fields);
          // var promise = Auth.login(FormManager.getModelData(this.fields));
          // promise.then(successHandler, errorHandler);

          Trooper.generateTrooperFamily(fields).then(function(res){
            $log.log(res.trooperFamily);
            $scope.family = res.trooperFamily;
            $scope.familyAvailable = true;
          });
        },        
        fields: [
            {
                            "field_title": "name",
                            "field_value": "ziemniaki",
                            "field_placeholder": "name",
                            "field_type": "text",
                            "field_name": "name",
                            "field_required": true,
                            "field_disabled" : false,
                            "field_validator": function(val){                     
                              return (val && val.length > 3);
                            }
            },            
            {
                            "field_title" : "pass",
                            "field_value" : "",
                            "field_placeholder": "pass",
                            "field_type": "password",
                            "field_name" : "pass",
                            "field_required" : false,
                            "field_disabled" : false                   
            }
            
        ]
  };









});

