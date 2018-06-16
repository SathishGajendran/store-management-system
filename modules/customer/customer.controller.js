/**
 * @name modules/customer.controller
 * @description It used to handle customer routes request
 */
'use strict';

//custom modules
var mongoDb = require('../../helper/db/mongo'),
    genericSchema = require('../../helper/db/mongo/schema/generic.schema');

// customer model instance
let CustomerModel = mongoDb.model('CustomerModel', genericSchema, 'customers');

/**
 * 
 */
exports.getAllCustomers = function (args, callback) {
    CustomerModel.find(function (err, data) {
        let response = {};
        if (err) {
            response = {
                status: "error",
                error: err
            }
        } else {
            response = {
                status: "success",
                data: data
            }
        }
        callback(response);
    });
};