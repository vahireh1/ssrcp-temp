module.exports = function(app) {    
    app.post('/tileModel',function(req, res){
		try{
			create(req.body, function(response){
				res.json(response);
			});
		}catch(e){
		 res.json(e);
		}
    });
    app.get('/tileModel/:tileModelId', function(req, res) {
		try {
			console.log("IN AAPI >>>>>>   ", req.params.tileModelId);
			getDetails(req.params.tileModelId, function(response) {
				res.json(response);
			});
		} catch(e) {
			res.json(e);
		}
	});
  
    app.get('/tileModel',function(req, res){
		try{
			console.log("TILEMODELS GET FUNCTION");
			getList(req.query, function(response){
				res.json(response);
			});
			
		}catch(e){
		 res.json(e);
		}
	});
	app.put('/tileModel',function(req, res){
		try{
			console.log('update chaching');
			update(req.parmas.tileModelId, function(response){
				res.json(response);
			});
		}catch(e){
		 res.json(e);
		}
    });
}

var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var TileModelSchema = new Schema(require('./tileModelSchema').tileModelSchema, {collection: 'tileModel'});
var TileModel = mongoose.model('tileModel', TileModelSchema);
var TileModelController = require('./tileModelController');
var utils = require('../../assets/utils').utils;
var CONSTANTS = utils.CONSTANTS;
var DB_CODES = CONSTANTS.DATABASE_CODES;
var REQUEST_CODES = CONSTANTS.REQUEST_CODES;
var TILE_MODEL_CODES = utils.CONSTANTS.TILE_MODELS;
var VALIDATE = utils.CONSTANTS.VALIDATE;
var validate = utils.validate;
var mongoUtils = utils.mongoUtils;



function create(tileModel, callback) {
	var tileModelAPI = TileModelController.TileModelAPI(tileModel);
    var errorList = [];
    if (!tileModelAPI.getTileModelName()) {
       	var e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.REQUIRED, 'tileModelName')
		};		
		errorList.push(e);
    }
    if (!tileModelAPI.getColor()) {
       	var e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.REQUIRED, 'color')
		};
		errorList.push(e);
	}
	if (!tileModelAPI.getModelNumber()) {
		var e = {
			 status: VALIDATE.FAIL,
			 error: utils.formatText(VALIDATE.REQUIRED, 'modelNumber')
	 };
	 errorList.push(e);
 }
    if (!tileModelAPI.getQuantity()) {
        var e = {
					status: VALIDATE.FAIL,
					error: utils.formatText(VALIDATE.REQUIRED, 'quantity')
         	};
		errorList.push(e);
	}
	 
    if (!tileModelAPI.getTileModels()) {
        var e = {
					status: VALIDATE.FAIL,
					error: utils.formatText(VALIDATE.REQUIRED, 'tileModels')
         	};
		errorList.push(e);
	}
   	if (errorList.length) {
		throw {
			status: REQUEST_CODES.FAIL,
			error: errorList
		};
	} else {
		var tileModel = new TileModel(tileModelAPI);
		console.log("before getNextSequence checking");
	    mongoUtils.getNextSequence('tileModelId', function(oSeq) {
			console.log("after getNextSequence checkingggg");
			tileModel.tileModelId = oSeq;
			tileModel.dateCreated = utils.getSystemTime();
			tileModel.save(function(error) {
				if (error) {
					callback({
							status: DB_CODES.FAIL,
							error: error
					});
					return;
				} else {
					callback({
							status: REQUEST_CODES.SUCCESS,
							result: [utils.formatText(TILE_MODEL_CODES.CREATE_SUCCESS, tileModel.tileModelId)]
					});
					return;							
				}
	   		});
	   	});
	}
}

function getDetails(tileModelId, callback) {
	TileModel.find({'tileModelId': tileModelId}, function(error, tileModelRecords) {
		if (error) {
			callback({
				status: DB_CODES.FAIL,
				error: error
			});
			return;
		} else {
			tileModelRecords = tileModelRecords.map(function(tileModelRecord) {
				return new TileModelController.TileModelAPI(tileModelRecord);
			});
			callback({
				status: REQUEST_CODES.SUCCESS,
				result: tileModelRecords
			});
			return;
		}
	});
}

function getList(query, callback) {
	TileModel.find(query, function(error, tileModelRecords) {
		if (error) {
			callback({
				status: DB_CODES.FAIL,
				error: error
			});
			return;
		} else {
    		tileModelRecords = tileModelRecords.map(function(tileModelRecord) {
				return new TileModelController.TileModelAPI(tileModelRecord);
			});
			callback({
				status: REQUEST_CODES.SUCCESS,
				result: tileModelRecords
			});
			return;
		}
	});
}

function updateTilemodel(tileModel, callback) {
	tileModel.dateUpdated = utils.getSystemTime();
	TileModel.update({"tileModel": tileModel.tileModelId}, {$set: tileModel}, function(error, effectedRows) {
		if (error) {
			callback({
				status: DB_CODES.FAIL,
				error: error
			});
			return;
		} else {
			if (!effectedRows.nModified) {
				callback({
					status: REQUEST_CODES.FAIL,
					error: utils.formatText(TILE_MODEL_CODES.UPDATE_FAIL, tileModel.tileModelId)
				});
				return;
			} else {
				callback({
					status: REQUEST_CODES.SUCCESS,
					result: [utils.formatText(TILE_MODEL_CODES.UPDATE_SUCCESS, tileModel.tileModelId)]
				});
				return;
			}
		}
	});
}
module.exports.getList = getList;
