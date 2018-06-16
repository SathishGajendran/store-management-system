/**
 * @name modules/customer.controller
 * @description It used to handle customer routes request
 */
'use strict';

//custom modules
var mongoDb = require('../../helper/db/mongo'),
    genericSchema = require('../../helper/db/mongo/schema/generic.schema');

// model instance
let CustomerModel = mongoDb.model('CustomerModel', genericSchema, 'customers');
let OrderModel = mongoDb.model('OrderModel', genericSchema, 'orders');

/**
 * @name getCustomerById
 * @description It is used to get customers by id.
 * @return orders
 */
exports.getCustomerById = function (args, callback) {
    CustomerModel.findOne({
        customerId: args.customerId
    }, {
        _id: 0
    }, function (err, data) {
        let response = {};
        if (err) {
            response = {
                status: "error",
                error: err
            }
        } else {
            response = {
                status: "success",
                data: data || "No customer data found"
            }
        }
        callback(response);
    });
};

/**
 * @name updateCustomerById
 * @description It is used to update customer by id.
 */
exports.updateCustomerById = function (args, callback) {
    let customerData = {
        customerName: args.customerName,
        customerAddress: args.customerAddress
    };

    CustomerModel.findOneAndUpdate({
            customerId: args.customerId
        }, customerData,
        function (err, res) {
            let response = {};
            if (err) {
                response.code = 400;
                response.status = "error";
            } else {
                response.code = 200;
                response.status = "success";
                response.message = "Customer info Updated Successfully";
            }
            callback(response);
        });
};

/**
 * @name deleteCustomerById
 * @description It is used to delete customer by id.
 */
exports.deleteCustomerById = function (args, callback) {
    CustomerModel.findOneAndRemove({
        customerId: args.customerId
    }, function (err, data) {
        let response = {};
        if (data) {
            response.code = 200;
            response.status = "success";
            response.message = "Customer Deleted Successfully";
        } else {
            response.code = 400;
            response.status = "Bad Request";
        }
        callback(response);
    });
};

/**
 * @name getCustomerHistoryById
 * @description It is used to get customer history by id.
 * @return customer history
 */
exports.getCustomerHistoryById = function (args, callback) {
    let offset = parseInt(args.offset) || 0;
    let limit = parseInt(args.limit) || 10;
    OrderModel.aggregate([{
            $match: {
                customerId: args.customerId
            }
        }, {
            $group: {
                _id: {
                    custId: "$customerId",
                    currency: "$currency"
                },
                ordersCount: {
                    $sum: 1
                },
                totalAmountSpent: {
                    $sum: "$price"
                }
            }
        }, {
            $project: {
                _id: 0,
                currency: "$_id.currency",
                ordersCount: "$ordersCount",
                totalAmountSpent: "$totalAmountSpent"
            }
        }])
        .exec(function (err, data) {
            let response = {
                offset: offset,
                limit: limit
            };
            if (err) {
                response.code = 400;
                response.status = "error";
            } else {
                response.code = 200;
                response.status = "success";
                response.data = data;
            }
            callback(response);
        })
};

/**
 * @name getCustomerByPurchasedItem
 * @description It is used to get customer by purchased item.
 */
exports.getCustomerByPurchasedItem = function (args, callback) {
    let offset = parseInt(args.offset) || 0;
    let limit = parseInt(args.limit) || 10;
    OrderModel.aggregate([{
            $match: {
                item: args.item
            }
        }, {
            $group: {
                _id: {
                    customerId: "$customerId",
                    customerName: "$customerName",
                    customerAddress: "$customerAddress",
                    item: "$item"
                }
            }
        }, {
            $project: {
                _id: 0,
                customerId: "$_id.customerId",
                customerName: "$_id.customerName",
                customerAddress: "$_id.customerAddress",
                item: "$_id.item"
            }
        }])
        .exec(function (err, data) {
            let response = {
                offset: offset,
                limit: limit
            };
            if (err) {
                response.code = 400;
                response.status = "error";
            } else {
                response.code = 200;
                response.status = "success";
                response.data = data;
            }
            callback(response);
        })
};