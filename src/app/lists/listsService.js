angular.module( 'mb.lists.service', [
  'requestHandler'
])
.service("Lists", function(RequestHandler){

	var validName = new RegExp("^[a-zA-Z0-9]{3,10}$");

	this.createList = function(data){
		return RequestHandler.send("createList", data);	
	};
	this.updateList = function(data){
		return RequestHandler.send("updateList", data);	
	};
	this.getListByName = function(data){
		return RequestHandler.send("getList", data);	
	};
	this.getLists = function(){
		return RequestHandler.send("getLists", {});	
	};

	this.validName = function(name){
		return validName.test(name);
	};

});