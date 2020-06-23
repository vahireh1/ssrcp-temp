var utils = require('../../assets/utils').utils;
var CONSTANTS = utils.CONSTANTS;
var REQUEST_CODES = CONSTANTS.REQUEST_CODES;
var VALIDATE = utils.CONSTANTS.VALIDATE;
var validate = utils.validate;

var SalesLog = function() {
    return {
        // salesLogId: 0,
        items: [],
        comments: null,
        customerName: null,
        customerNumber: 0,
        totalQuantity: 0,
        createdBy: 0,
        dateCreated: 0,
        updatedBy: 0,
        dateUpdated: 0
    };
};

function SalesAPI(salesRecord) {
    console.log("7#####");
    var sales = new SalesLog();

    sales.getSalesLogId = function() {
        return this.salesLogId;
    };
    sales.setSalesLogId = function(salesLogId) {
        if (salesLogId) {
            if (validate.isInteger(salesLogId + '')) {
                    this.salesLogId = salesLogId;
            } else {
                throw {
                    status: VALIDATE.FAIL,
                    error: utils.formatText(VALIDATE.NOT_A_INTEGER, salesLogId, 'salesLogId')
                };
            }
        }
    };
    console.log("check");

    sales.getItems = function() {
        return this.items;
    };
    sales.setItems = function(items) {
        //for now just check for empty object validation, later perform full validation - TODO
        if (items) {
            this.items = items;
        }
    };
    console.log("check111");

    sales.getComments = function() {
        return this.comments;
    };
    sales.setComments = function(comments) {
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
    console.log("check22");

    sales.getCustomerName = function() {
        return this.customerName;
    };
    sales.setCustomerName = function(customerName) {
         if (customerName) {
            if (customerName.length <= 50) {
                this.customerName = customerName;
            } else {
                throw {
                    status: VALIDATE.FAIL,
                    error: utils.formatText(VALIDATE.VALUE_TOO_BIG, customerName, 'customerName')
                };
            }
        }
    };
    console.log("check333");

    sales.getCustomerNumber = function() {
        return this.customerNumber;
    };
    sales.setCustomerNumber = function(customerNumber) {
        if (customerNumber) {
            this.customerNumber = customerNumber;
        }
    };
    sales.getTotalQuantity = function() {
        return this.totalQuantity;
    };
    sales.setTotalQuantity = function(totalQuantity) {
        if (totalQuantity) {
            if (validate.isInteger(totalQuantity + '')) {
                    this.totalQuantity = totalQuantity;
            } else {
                throw {
                    status: VALIDATE.FAIL,
                    error: utils.formatText(VALIDATE.NOT_A_INTEGER, totalQuantity, 'totalQuantity')
                };
            }
        }
    };
    console.log("check444");
    sales.getCreatedBy = function() {
        return this.createdBy;
    };
    sales.setCreatedBy = function(createdBy) {
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
    console.log("check555");

    sales.getDateCreated = function() {
        return this.dateCreated;
    };
    sales.setDateCreated = function(dateCreated) {
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
    console.log("check666");

    sales.getDateUpdated = function() {
        return this.dateUpdated;
    };
    sales.setDateUpdated = function(dateUpdated) {
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
    console.log("check77");

    sales.getUpdatedBy = function() {
        return this.updatedBy;
    };
    sales.setUpdatedBy = function(updatedBy) {
        if (updatedBy) {
            if (validate.isNumber(updatedBy)) {
                this.updatedBy = updatedBy;
            } else {
                throw {
                    status: VALIDATE.FAIL,
                    error: utils.formatText(VALIDATE.NOT_A_INTEGER, updatedby, 'updatedBy')
                };
            }
        }
    };
    console.log("check88");

    if (salesRecord) {
        var errorList = [];
        try {
            sales.setSalesLogId(salesRecord.salesLogId);
         } catch (e) {
             console.log("1");
            errorList.push(e);
        }
        try {
            sales.setItems(salesRecord.items);
        } catch (e) {
            console.log("2");
            errorList.push(e);
        }
        try {
            sales.setComments(salesRecord.comments);
        } catch (e) {
            console.log("3");
            errorList.push(e);
        }
        try {
            sales.setCustomerName(salesRecord.customerName);
        } catch (e) {
            console.log("4");
            errorList.push(e);
        }
        try {
            sales.setCustomerNumber(salesRecord.customerNumber);
        } catch (e) {
            console.log("5");
            errorList.push(e);
        }
        try {
            sales.setTotalQuantity(salesRecord.totalQuantity);
        } catch (e) {
            console.log("6");
            errorList.push(e);
        }
        try {
            sales.setCreatedBy(salesRecord.createdBy);
        } catch (e) {
            console.log("7");
           errorList.push(e);
        }
        try {
            sales.setDateCreated(salesRecord.dateCreated);
        } catch (e) {
            console.log("8");           
            errorList.push(e);
        }
        try {
            sales.setUpdatedBy(salesRecord.updatedBy);
        } catch (e) {
            console.log("9");
            errorList.push(e);
        }
        try {
            sales.setDateUpdated(salesRecord.dateUpdated);
        } catch (e) {
            console.log("10");
            errorList.push(e);
        }
        if (errorList.length) {
            throw {
                status: REQUEST_CODES.FAIL,
                error: errorList
            };
        }
    }
    return sales;
}

module.exports.SalesAPI = SalesAPI;