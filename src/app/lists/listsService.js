angular.module( 'mb.lists.service', [
  'requestHandler'
])
.service("Lists", function(RequestHandler){

	this.PATTERN_NAME= new RegExp("^[a-zA-Z0-9_]{4,15}$");

	this.createList = function(data){
		return RequestHandler.send("createList", data);	
	};
	this.updateList = function(data){
		return RequestHandler.send("updateList", data);	
	};
	this.getListByName = function(data){
		return RequestHandler.send("getList", data);	
	};
	this.getListReportByListId = function(data){
		return RequestHandler.send("getListReport", data);	
	};

	this.getLists = function(){
		return RequestHandler.send("getLists", {});	
	};

	this.validName = function(name){
		return this.PATTERN_NAME.test(name);
	};

});