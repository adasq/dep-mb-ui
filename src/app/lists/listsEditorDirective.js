angular.module( 'mb.lists.editor', [
  'mb.trooper',
  'fileSelector',
  'utils'
])
.directive('trooperInputHelper', function($log, $timeout){
     var link = function(scope, element, attr, ctrl) {
            //content
            var KEY_CODE_ENTER = 13,
                KEY_CODE_ESC = 27;
            var oldValue = scope.$eval(attr.ngModel);

            var rejectEditing = function(){
                ctrl.$setViewValue(oldValue);
                scope.$apply(attr.trooperInputHelper);
            };
            var acceptEditing = function(){
                scope.$apply(attr.trooperInputHelper);
            };
            element.bind('keydown', function (event) {               
                if (event.keyCode === KEY_CODE_ESC) {
                    rejectEditing();
                }
                if (event.keyCode === KEY_CODE_ENTER) {
                    acceptEditing();
                }
            });
            element.bind('blur', function (event) {
                rejectEditing();
            });
            $timeout(function () {
                        element[0].focus();
                    }, 0, false);

        };
        return {
            require: 'ngModel',
            link: link,
            restrict:"A"           
        };
})
.directive("mbListEditor", function ($log, $state, $location, $anchorScroll, Trooper, Utils){
     var link = function($scope, element, attr) {
//==========================================================================

$scope.$on('aqFileSelector', function(mess, response){
            if('file-aqfs-troopers' === response.id){
                var content = Utils.decodeBase64(response.obj);  
                var troopers= content.split('\r\n');
                _.each(troopers, function(trooper){
                    addTrooper(trooper, '');
                });
                $scope.$apply();
            }            
        });



$scope.current= null;
$scope.selected = 0;
var TROOPER_ID = 0;
$scope.updateSelected = function(){
    $scope.selected= _.filter($scope.list.troopers, function(trooper){return trooper.selected;}).length;
};

$scope.handleTrooperSelection = function(action){
 
    if(_.isBoolean(action)){
        _.each($scope.list.troopers, function(trooper){
            trooper.selected = action;
        });
    }else{
        _.each($scope.list.troopers, function(trooper){
            trooper.selected = !trooper.selected;
        });
    }
    $scope.updateSelected();    
};

$scope.deleteSelected = function(){
    $scope.list.troopers = _.filter($scope.list.troopers, function(trooper){return !trooper.selected; });
    $scope.updateSelected();    
};

$scope.selectTrooper =  function(trooper){
                trooper.selected = !trooper.selected;   
                $scope.updateSelected();
};
    
$scope.newTrooper =  "";

$scope.calncelEditindTrooper= function(trooper){
    trooper.edited=false;
    trooper.edited2=false;
};
var addTrooper = function(name, pass){
    $scope.list.troopers.unshift({
    name: name,
    pass: pass || "",
    id: ++TROOPER_ID,
    highlighted: true
});     
};
$scope.addTrooper = function(){
    if(!$scope.newTrooper){return;}

_.each($scope.list.troopers, function(trooper){
    trooper.highlighted=false;
});

    var splited = $scope.newTrooper.split(';');
    addTrooper(splited[0], splited[1]);
    $scope.newTrooper = "";
};

$scope.keyPressed = function(event){
    if(event.charCode === 13){
            $scope.addTrooper();            
    }
};

$scope.removeTrooper = function(id){ 

    $scope.list.troopers = _.without($scope.list.troopers, _.findWhere($scope.list.troopers, {id: id}));
    $scope.updateSelected();
};

$scope.$watch('list', function(nv){
    if($scope.list && $scope.list.troopers){
        _.each($scope.list.troopers, function(trooper){
            trooper.id = ++TROOPER_ID;
        });
    }
});


//==========================================================================
        };
        return {
            link: link,
            scope: {
                list: "="
            },
            restrict: "E",
            templateUrl: "lists/listsEditorDirective.tpl.html"
        };
});

