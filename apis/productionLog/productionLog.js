module.exports = function(app) {    
    app.post('/productionLog',function(req, res){
		try{
			create(req.body, function(response){
				res.json(response);
			});
		}catch(e){
		 res.json(e);
		}
	});
    app.get('/productionLog/:productionLogId', function(req, res) {
		try {
			getDetails(req.params.productionLogId, function(response) {
				res.json(response);
			});
		} catch(e) {
			res.json(e);
		}
	});
    app.put('/productionLog',function(req, res){
		try{
			update(req.body, function(response){
				res.json(response);
			});
		}catch(e){
			res.json(e);
		}
    });
    app.get('/productionLogs',function(req, res){
		try{
			getList(req.query, function(response){
				res.json(response);
			});
		}catch(e){
			res.json(e);
		}
    });
}

var mongoose = require('mongoose'),
Schema = mongoose.Schema;
var ProductionLogSchema = new Schema(require('./productionLogSchema').productionLogSchema, {collection: 'productionLog'});
var ProductionLogModel = mongoose.model('productionLog', ProductionLogSchema);
var ProductionLogController = require('./productionLogController');

var utils = require('../../assets/utils').utils;
var CONSTANTS = utils.CONSTANTS;
var DB_CODES = CONSTANTS.DATABASE_CODES;
var REQUEST_CODES = CONSTANTS.REQUEST_CODES;
var PROD_LOG_CODES = utils.CONSTANTS.PROD_LOG;
var VALIDATE = utils.CONSTANTS.VALIDATE;
var validate = utils.validate;
var mongoUtils = utils.mongoUtils;

function create(productionLog, callback) {
	var productionLogAPI = ProductionLogController.ProductionLogAPI(productionLog);
    var errorList = [];
	if (!productionLogAPI.getTileModelId()){
        var e ={
			status: VALIDATE.FAIL,
			error: utils.formatText(VALIDATE.FIELD_VALUE_INVALID, 'textarea')
		};
		errorList.push(e);
	} 
	
	if (!productionLogAPI.getQuantity()) {
		var e = {
			status: VALIDATE.FAIL,
			error: utils.formatText(VALIDATE.REQUIRED, 'quantity')
		};
		errorList.push(e);
	}
	if (!productionLogAPI.getComments()){
        var e ={
			status: VALIDATE.FAIL,
			error: utils.formatText(VALIDATE.FIELD_VALUE_INVALID, 'comments')
		};
		errorList.push(e);
	} 
	if (!productionLogAPI.getCreatedBy()){
        var e ={
			status: VALIDATE.FAIL,
			error: utils.formatText(VALIDATE.FIELD_VALUE_INVALID, 'createdBy')
		};
		errorList.push(e);
	} 
   	if (errorList.length) { 
		throw {
			status: REQUEST_CODES.FAIL,
		    error: errorList
		};
	} else {
		var productionLogModel = new ProductionLogModel(productionLogAPI);
	    mongoUtils.getNextSequence('productionLogId', function(oSeq) {
			productionLogModel.productionLogId = oSeq;
			productionLogModel.dateCreated = utils.getSystemTime();
			console.log(productionLogModel);
			productionLogModel.save(function(error) {
				if (error) {
					callback({
						status: DB_CODES.FAIL,
						error: error
					});
					return;
				} else {
					callback({
							status: REQUEST_CODES.SUCCESS,
							result: [utils.formatText(PROD_LOG_CODES.CREATE_SUCCESS, productionLogModel.productionLogId)]
					});
					return;							
				}
			});
	   	});
	}
}

function getDetails(productionLogId, callback) {
	ProductionLogModel.find({'productionLogId': productionLogId}, function(error, productionLogRecords) {
		if (error) {
			callback({
				status: DB_CODES.FAIL,
				error: error
			});
			return;
		} else {
			productionLogRecords = productionLogRecords.map(function(productionLogRecord) {
				return new ProductionLogController.ProductionLogAPI(productionLogRecord);
			});
			callback({
				status: REQUEST_CODES.SUCCESS,
				result: productionLogRecords
			});
			return;
		}
	});
}

function getList(query, callback) {
	ProductionLogModel.find(query, function(error, productionLogRecords) {
		if (error) {
			callback({
				status: DB_CODES.FAIL,
				error: error
			});
			return;
		} else {
			productionLogRecords = productionLogRecords.map(function(productionLogRecord) {
				return new ProductionLogController.ProductionLogAPI(productionLogRecord);
			});
			callback({
				status: REQUEST_CODES.SUCCESS,
				result: productionLogRecords
			});
			return;
		}
	});
}
		   // update function
		   
function update(productionLog, callback) {
	productionLog.dateUpdated = utils.getSystemTime();
	ProductionLogModel.update({"productionLogId": productionLog.productionLogId}, {$set: productionLog}, function(error, effectedRows) {
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
					error: utils.formatText(PROD_LOG_CODES.UPDATE_FAIL, productionLog.productionLogId)
				});
				return;
			} else {
				callback({
					status: REQUEST_CODES.SUCCESS,
					result: [utils.formatText(PROD_LOG_CODES.UPDATE_SUCCESS, productionLog.productionLogId)]
				});
				return;
			}
		}
	});
}

// function getChartData(callback) {
// 	startDate = today - 7 days == timestamp;
// 	endDate = today;

// 	var finalResponse = [

// 	]

	//.... get all tile modals -- getList 10 - 10 lines

	// tileModals.forEach(function(tileModal) {
//.... select * from productionLog where dateCreated >= startDate && dateCreated <= endDate && tileModalId = tileModal.modalId;
// finalResponse.push({})
// 	})



//..tileModalId, quantity, date,
//.. [1, 100, 01.may.202
//.. 2 50, 01.may.2020
// ...
// ..
// ]
// [
// {},
// {}
// ...


// ]

// }