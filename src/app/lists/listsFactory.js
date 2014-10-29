angular.module( 'mb.lists.factory', [
  'mb.lists.service'
])
.factory("ListsModel", function($log, $q, Lists){

	var TrooperListModel = function(data){
		this.data = data || null;
	};

	TrooperListModel.getListByName = function(name){
		var deffered = $q.defer();
		var promise= Lists.getListByName({name: name});
		promise.then(function(resposne){
			deffered.resolve(new TrooperListModel(resposne));
		}, deffered.reject);
		return deffered.promise;
	};

	TrooperListModel.getLists = function(){
		var deffered = $q.defer();
		var promise= Lists.getLists();
		promise.then(function(resposne){		 
			var lists = [];
			_.each(resposne, function(list){
				lists.push(new TrooperListModel(list));
			});
			deffered.resolve(lists);

		}, deffered.reject);
		return deffered.promise;
	};
	TrooperListModel.prototype.getNormalizedData = function(){
		var normalizedData = {};
		normalizedData._creator = this.data._creator;
		normalizedData._id = this.data._id;
		normalizedData.name = this.data.name;
		normalizedData.troopers = [];
		_.each(this.data.troopers, function(trooper){
			normalizedData.troopers.push({name: trooper.name, pass: trooper.pass, _id: trooper._id});
		});
		return normalizedData;
	
	};
	TrooperListModel.prototype.getLastReport = function(name){
		var deffered = $q.defer();
		var promise= Lists.getListReportByListId({_id: this.data._id});
		promise.then(function(resposne){
			deffered.resolve(resposne);
		}, deffered.reject);
		return deffered.promise;
	};
	TrooperListModel.prototype.save = function(){
		var promise=null, deffered = $q.defer(); 
		if(this.data._id){
			//update
			promise = Lists.updateList(this.getNormalizedData());
			promise.then(function(response){
				if(response.error){
					deffered.reject(response.reason);
				}else{
					deffered.resolve();
				}		
			}, function(){
				deffered.reject('unhandled!');
			});
		}else{
			//save
			promise = Lists.createList(this.data);
			promise.then(function(response){				 
					if(response.error){
					deffered.reject(response.reason);
				}else{
					deffered.resolve();
				}	
			}, function(){
				deffered.reject('unhandled!');
			});
		}
		return deffered.promise;
	};

	return TrooperListModel;

});