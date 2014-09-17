(function(){

angular
.module('mb.trooper.service', ['requestHandler'])
.service("Trooper", function(RequestHandler){

	this.generateList = function(data){
		return RequestHandler.send("generateList", data);	
	};

	this.play = function(data){
		return RequestHandler.send("play", data);	
	};
	this.chooseSkill = function(data){
		return RequestHandler.send("chooseSkill", data);	
	};
	this.generateFamily = function(){
		return RequestHandler.send("generateFamily", {});	
	};
});

})();
