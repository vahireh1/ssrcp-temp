var utils = require('../../assets/utils').utils;
var CONSTANTS = utils.CONSTANTS;
var REQUEST_CODES = CONSTANTS.REQUEST_CODES;
var VALIDATE = utils.CONSTANTS.VALIDATE;
var validate = utils.validate;

var ProductionLogModel = function() {
    return {
        productionLogId: 0,
        tileModelId: 0,
        comments: null,
        quantity: 0,
        productionDate: 0,
        createdBy: 0,
        dateCreated: 0,
        updatedBy: 0,
        dateUpdated: 0
    };
};

function ProductionLogAPI(productionLogRecord) {
    var productionLog = new ProductionLogModel();

    productionLog.getProductionLogId = function() {
        return this.productionLogId;
    };
    productionLog.setProductionLogId = function(productionLogId) {
        if (productionLogId) {
            if (validate.isInteger(productionLogId + '')) {
                    this.productionLogId = productionLogId;
            } else {
                throw {
                    status: VALIDATE.FAIL,
                    error: utils.formatText(VALIDATE.NOT_A_INTEGER, productionLogId, 'productionLogId')
                };
            }
        }
    };
    productionLog.getTileModelId = function() {
        return this.tileModelId;
    };
    productionLog.setTileModelId = function(tileModelId) {
        if (tileModelId) {
            if (validate.isInteger(tileModelId + '')) {
                    this.tileModelId = tileModelId;
            } else {
                throw {
                    status: VALIDATE.FAIL,
                    error: utils.formatText(VALIDATE.NOT_A_INTEGER, tileModelId, 'tileModelId')
                };
            }
        }
    };
    
    productionLog.getComments = function() {
        return this.comments;
    };
    productionLog.setComments = function(comments) {
         if (comments) {
            if (comments.length <= 999999) {
                this.comments = comments;
            } else {
                throw {
                    status: VALIDATE.FAIL,
                    error: utils.formatText(VALIDATE.VALUE_TOO_BIG, comments, 'comments')
                };
            }
        }
    };
    productionLog.getQuantity = function() {
        return this.quantity;
    };
    productionLog.setQuantity = function(quantity) {
        if (quantity) {
            if (validate.isInteger(quantity + '')) {
                    this.quantity = quantity;
            } else {
                throw {
                    status: VALIDATE.FAIL,
                    error: utils.formatText(VALIDATE.NOT_A_INTEGER, quantity, 'quantity')
                };
            }
        }
    };
    productionLog.getProductionDate = function() {
        return this.productionDate;
    };
    productionLog.setProductionDate = function(productionDate) {
        if (productionDate) {
            if (validate.isNumber(productionDate + '')) {
                this.productionDate = productionDate;
            } else {
                throw {
                    status: VALIDATE.FAIL,
                    error: utils.formatText(VALIDATE.NOT_A_INTEGER, productionDate, 'productionDate')
                };
            }
        }
    };
    productionLog.getCreatedBy = function() {
        return this.createdBy;
    };
    productionLog.setCreatedBy = function(createdBy) {
        if (createdBy) {
            if (validate.isNumber(createdBy + '')) {
                this.createdBy = createdBy;
            } else {
                throw {
                    status: VALIDATE.FAIL,
                    error: utils.formatText(VALIDATE.NOT_A_INTEGER, createdBy, 'createdBy')
                };
            }
        }
    };
    productionLog.getDateCreated = function() {
        return this.dateCreated;
    };
    productionLog.setDateCreated = function(dateCreated) {
        if (dateCreated) {
            if (validate.isNumber(dateCreated + '')) {
                this.dateCreated = dateCreated;
            } else {
                throw {
                    status: VALIDATE.FAIL,
                    error: utils.formatText(VALIDATE.NOT_A_INTEGER, dateCreated, 'dateCreated')
                };
            }
        }
    };
    productionLog.getDateUpdated = function() {
        return this.dateUpdated;
    };
    productionLog.setDateUpdated = function(dateUpdated) {
        if (dateUpdated) {
            if (validate.isNumber(dateUpdated + '')) {
                this.dateUpdated = dateUpdated;
            } else {
                throw {
                    status: VALIDATE.FAIL,
                    error: utils.formatText(VALIDATE.NOT_A_INTEGER, dateUpdated, 'dateUpdated')
                };
            }
        }
    };
    productionLog.getUpdatedBy = function() {
        return this.updatedby;
    };
    productionLog.setUpdatedBy = function(updatedby) {
        if (updatedby) {
            if (validate.isNumber(updatedby + '')) {
                this.updatedby = updatedby;
            } else {
                throw {
                    status: VALIDATE.FAIL,
                    error: utils.formatText(VALIDATE.NOT_A_INTEGER, updatedby, 'updatedby')
                };
            }
        }
    };
   
    if (productionLogRecord) {
        console.log(productionLogRecord);
        var errorList = [];
        try {
            productionLog.setProductionLogId(productionLogRecord.productionLogId);
         } catch (e) {
            errorList.push(e);
        }
        try {
            productionLog.setTileModelId(productionLogRecord.tileModelId);
        } catch (e) {
            errorList.push(e);
        }
        try {
            productionLog.setComments(productionLogRecord.comments);
        } catch (e) {           
            errorList.push(e);
        }
        try {
            productionLog.setQuantity(productionLogRecord.quantity);
        } catch (e) {
            errorList.push(e);
        }
        try {
            productionLog.setProductionDate(productionLogRecord.productionDate);
        } catch (e) {
            errorList.push(e);
        }
        try {
            productionLog.setDateCreated(productionLogRecord.dateCreated);
        } catch (e) {
            errorList.push(e);
        }
        try {
            productionLog.setDateUpdated(productionLogRecord.dateUpdated);
        } catch (e) {
            errorList.push(e);
        }
        try {
            productionLog.setCreatedBy(productionLogRecord.createdBy);
        } catch (e) {
            errorList.push(e);
        }
        try {
            productionLog.setUpdatedBy(productionLogRecord.updatedBy);
        } catch (e) {
            errorList.push(e);
        }
        if (errorList.length) {
            throw {
                status: REQUEST_CODES.FAIL,
                error: errorList
            };
        }
    }
    return productionLog;
}

module.exports.ProductionLogAPI = ProductionLogAPI;