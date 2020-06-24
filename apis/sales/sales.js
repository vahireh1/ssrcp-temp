module.exports = function(app) {    
    app.post('/sales',function(req, res){
		console.log("test api ");
		try{
			create(req.body, function(response){
				res.json(response);
			});

		}catch(e){
		 res.json(e);
		}
    });
    app.get('/sales/:salesLogId', function(req, res) {
		try {
			console.log('InAPI?????????');
			getDetails(req.params.salesLogId, function(response) {
				res.json(response);
			});
		} catch(e) {
			res.json(e);
		}
	});
    app.put('/sales',function(req, res){
		try{
			update(req.body, function(response) {
				res.json(response);
			});

		}catch(e){
		 res.json(e);
		}
    });
    app.get('/sales',function(req, res){
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
var SalesSchema = new Schema(require('./salesSchema').salesSchema, {collection: 'sales'});
var SalesModel = mongoose.model('sales', SalesSchema);
var SalesController = require('./salesController');

var utils = require('../../assets/utils').utils;
var CONSTANTS = utils.CONSTANTS;
var DB_CODES = CONSTANTS.DATABASE_CODES;
var REQUEST_CODES = CONSTANTS.REQUEST_CODES;
var SALES_LOG_CODES = utils.CONSTANTS.SALES_LOG;
var VALIDATE = utils.CONSTANTS.VALIDATE;
var validate = utils.validate;
var mongoUtils = utils.mongoUtils;

function create(sales, callback) {	
	console.log("before ");
	var salesAPI = SalesController.SalesAPI(sales);
	console.log("After,",salesAPI);
	var errorList = [];
    if (!salesAPI.getItems()) {
		console.log("IN ITEMS ERROR>>>>>>>>>>>>>>>>>>>>>>>");
       	var e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.REQUIRED, 'items')
           
		};
		errorList.push(e);
    }
    if (!salesAPI.getTotalQuantity()) {
         var e = {
					status: VALIDATE.FAIL,
					error: utils.formatText(VALIDATE.REQUIRED, 'totalQuantity ')
         	};
		errorList.push(e);
    }
    if (!salesAPI.getCustomerName()) {
       	var e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.REQUIRED, 'customerName')
           
		};
		errorList.push(e);
    }
    if (!salesAPI.getCustomerNumber()) {
         var e = {
					status: VALIDATE.FAIL,
					error: utils.formatText(VALIDATE.REQUIRED, 'customerNumber')
         	};
		errorList.push(e);
	}
	
   	if (errorList.length) {
		  throw {
		    status: REQUEST_CODES.FAIL,
		    error: errorList
		  };
	}  else {
		console.log("IN SAVE METHOD>>>>>>>");
		var salesModel = new SalesModel(salesAPI);
	    mongoUtils.getNextSequence('salesLogId', function(oSeq) {
			salesModel.salesLogId = oSeq;
			salesModel.dateCreated = utils.getSystemTime();
			console.log(salesModel);
			salesModel.save(function(error) {
				if (error) {
					callback({
							  status: DB_CODES.FAIL,
							  error: error
					});
					return;
				} else {
					callback({
							  status: REQUEST_CODES.SUCCESS,
							  result: [utils.formatText(SALES_LOG_CODES.CREATE_SUCCESS, salesModel.salesLogId)]
					});
					return;							
				}
	   		});
	   	});
	}

}

function getDetails(salesLogId, callback) {
	console.log('sales records checking>>>>>>>>>>>>');
	SalesModel.find({'salesLogId': salesLogId}, function(error, salesRecords) {
		if (error) {
			callback({
				status: DB_CODES.FAIL,
				error: error
			});
			return;
		} else {
			salesRecords = salesRecords.map(function(salesRecord) {
				return new SalesController.SalesAPI(salesRecord);
			});
			callback({
				status: REQUEST_CODES.SUCCESS,
				result: salesRecords
			});
			return;
		}
	});
}

function getList(query, callback) {
	SalesModel.find(query, function(error, salesRecords) {
		if (error) {
			callback({
				status: DB_CODES.FAIL,
				error: error
			});
			return;
		} else {
			salesRecords = salesRecords.map(function(salesRecord) {
				return new SalesController.SalesAPI(salesRecord);
			});
			callback({
				status: REQUEST_CODES.SUCCESS,
				result: salesRecords
			});
			return;
		}
	});
}

function update(sales, callback) {
	sales.dateUpdated = utils.getSystemTime();
	SalesModel.update({"salesLogId": sales.salesLogId}, {$set: sales}, function(error, effectedRows) {
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
					error: utils.formatText(SALES_LOG_CODES.UPDATE_FAIL, sales.salesLogId)
				});
				return;
			} else {
				callback({
					status: REQUEST_CODES.SUCCESS,
					result: [utils.formatText(SALES_LOG_CODES.UPDATE_SUCCESS, sales.salesLogId)]
				});
				return;
			}
		}
	});
}