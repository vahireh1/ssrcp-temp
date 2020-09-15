var utils = require('../../assets/utils').utils;
var CONSTANTS = utils.CONSTANTS;
var REQUEST_CODES = CONSTANTS.REQUEST_CODES;
var VALIDATE = utils.CONSTANTS.VALIDATE;
var validate = utils.validate;

var TileModel = function() {
    return {
        tileModelId: 0,
        modelName: null,
        color: null,
        modelNumber: null,
        modelImage: null,
        quantity: 0,
        tileModels: false,
        createdBy: 0,
        dateCreated: 0,
        updatedBy: 0,
        dateUpdated: 0
    };
};

function TileModelAPI(tileModelRecord) {
    var tileModel = new TileModel();
    tileModel.getTileModelId = function() {
        return this.tileModelId;
    };
    tileModel.setTileModelId = function(tileModelId) {
        
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
    tileModel.getTileModelName = function() {
        return this.modelName;
    };
    tileModel.setTileModelName = function(tileModelName) {
         if (tileModelName) {
            if (tileModelName.length <= 50) {
                this.tileModelName = tileModelName;
            } else {
                throw {
                    status: VALIDATE.FAIL,
                    error: utils.formatText(VALIDATE.VALUE_TOO_BIG, tileModelName, 'tileModelName')
                };
            }
        }
    };
    tileModel.getColor = function() {
        return this.color;
    };
    tileModel.setColor = function(color) {
         if (color) {
            if (color.length <= 50) {
                this.color = color;
            } else {
                throw {
                    status: VALIDATE.FAIL,
                    error: utils.formatText(VALIDATE.VALUE_TOO_BIG, color, 'color')
                };
            }
        }
    };
    tileModel.getModelNumber = function() {
        return this.modelNumber;
    };
    tileModel.setModelNumber = function(modelNumber) {
        if (modelNumber) {
            this.modelNumber = modelNumber;
        }
    };
    tileModel.getModelImage = function() {
        return this.modelImage;
    };
    tileModel.setModelImage = function(modelImage) {
        if (modelImage) {
            this.modelImage = modelImage;
        }
    };
    tileModel.getQuantity = function() {
        return this.quantity;
    };
    tileModel.setQuantity = function(quantity) {
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
    tileModel.getTileModel = function() {
        return this.tileModel;
    };
    tileModel.setTileModel = function(tileModel) {
        if (false == tileModel || true == tileModel) {
            this.tileModel = tileModel;
        }
    };
    tileModel.getTileModels = function(){

    }
    tileModel.setTileModels = function(tileModel) {
        this.tileModels;
    }
    tileModel.getCreatedBy = function() {
        return this.createdBy;
    };
    tileModel.setCreatedBy = function(createdBy) {
        if (createdBy) {
            if (validate.isNumber(createdBy)) {
                this.createdBy = createdBy;
            } else {
                throw {
                    status: VALIDATE.FAIL,
                    error: utils.formatText(VALIDATE.NOT_A_INTEGER, createdBy, 'createdBy')
                };
            }
        }
    };
    tileModel.getDateCreated = function() {
        return this.dateCreated;
    };
    tileModel.setDateCreated = function(dateCreated) {
        if (dateCreated) {
            if (validate.isNumber(dateCreated)) {
                this.dateCreated = dateCreated;
            } else {
                throw {
                    status: VALIDATE.FAIL,
                    error: utils.formatText(VALIDATE.NOT_A_INTEGER, dateCreated, 'dateCreated')
                };
            }
        }
    };
    tileModel.getDateUpdated = function() {
        return this.dateUpdated;
    };
    tileModel.setDateUpdated = function(dateUpdated) {
        if (dateUpdated) {
            if (validate.isNumber(dateUpdated)) {
                this.dateUpdated = dateUpdated;
            } else {
                throw {
                    status: VALIDATE.FAIL,
                    error: utils.formatText(VALIDATE.NOT_A_INTEGER, dateUpdated, 'dateUpdated')
                };
            }
        }
    };
    tileModel.getUpdatedBy = function() {
        return this.updatedBy;
    };
    tileModel.setUpdatedBy = function(updatedBy) {
        if (updatedBy) {
            if (validate.isNumber(updatedBy)) {
                this.updatedBy = updatedBy;
            } else {
                throw {
                    status: VALIDATE.FAIL,
                    error: utils.formatText(VALIDATE.NOT_A_INTEGER, updatedBy, 'updatedBy')
                };
            }
        }
    };
   
    if (tileModelRecord) {
        var errorList = [];
        try {
            tileModel.setTileModelId(tileModelRecord.tileModelId);
            console.log('test1');
         } catch (e) {
            errorList.push(e);
        }
        try {
            tileModel.setTileModelName(tileModelRecord.tileModelName);
            console.log('test2');
        } catch (e) {
            errorList.push(e);
        }
        try {
            tileModel.setColor(tileModelRecord.color);
            console.log('test3');
        } catch (e) {
            errorList.push(e);
        }
        try {
            tileModel.setModelNumber(tileModelRecord.modelNumber);
            console.log('test4');
        } catch (e) {
           errorList.push(e);
        }
        try {
            tileModel.setModelImage(tileModelRecord.modelImage);
            console.log('test5');
        } catch (e) {           
            errorList.push(e);
        }
        try {
            tileModel.setQuantity(tileModelRecord.quantity);
            console.log('test7');
        } catch (e) {
            errorList.push(e);
        }
        try {
            tileModel.setTileModels(tileModelRecord.tileModels);
            console.log('test8');
        } catch (e) {
            errorList.push(e);
        }
        try {
            tileModel.setCreatedBy(tileModelRecord.createdBy);
            console.log('test9');
        } catch (e) {
           errorList.push(e);
        }
        try {
            tileModel.setDateCreated(tileModelRecord.dateCreated);
            console.log('test10');
        } catch (e) {           
            errorList.push(e);
        }
        try {
            tileModel.setUpdatedBy(tileModelRecord.updatedBy);
            console.log('test11');
        } catch (e) {
            errorList.push(e);
        }
        try {
            tileModel.setDateUpdated(tileModelRecord.dateUpdated);
            console.log('test12');
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
    return tileModel;
}

module.exports.TileModelAPI = TileModelAPI;