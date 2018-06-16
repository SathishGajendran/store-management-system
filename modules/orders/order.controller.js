/**
 * @name modules/order.controller
 * @description It used to handle order routes request
 */
'use strict';

//custom modules
var mongoDb = require('../../helper/db/mongo'),
    genericSchema = require('../../helper/db/mongo/schema/generic.schema'),
    utilHelper = require('../../helper/util.helper');

// order model instance
let OrderModel = mongoDb.model('OrderModel', genericSchema, 'orders');

/**
 * @name getOrders
 * @description It is used to handle get orders.
 * @return orders
 */
exports.getOrders = function (args, callback) {
    let offset = parseInt(args.offset) || 0;
    let limit = parseInt(args.limit) || 10;
    OrderModel
        .find(args.filters, {
            _id: 0
        })
        .skip(offset)
        .limit(limit)
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
        });
};

/**
 * @name createOrder
 * @description It is used to create orders.
 */
exports.createOrder = function (args, callback) {
    let orderData = {
        orderId: utilHelper.generateId(),
        customerName: args.customerName,
        customerAddress: args.customerAddress,
        item: args.item,
        price: args.price,
        currency: args.currency
    };
    let newOrder = new OrderModel(orderData);
    newOrder.save(function (err, data) {
        let response = {};
        if (err) {
            response.code = 400;
            response.status = "error";
        } else {
            response.code = 200;
            response.status = "success";
            response.message = "Order Placed Successfully";
        }
        callback(response);
    });
};

/**
 * @name updateOrderById
 * @description It is used to update orders by id.
 */
exports.updateOrderById = function (args, callback) {
    let orderData = {
        customerName: args.customerName,
        customerAddress: args.customerAddress,
        item: args.item,
        price: args.price,
        currency: args.currency
    };

    OrderModel.findOneAndUpdate({
            orderId: args.orderId
        }, orderData,
        function (err, res) {
            let response = {};
            if (err) {
                response.code = 400;
                response.status = "error";
            } else {
                response.code = 200;
                response.status = "success";
                response.message = "Order Updated Successfully";
            }
            callback(response);
        });
};

/**
 * @name deleteOrderById
 * @description It is used to delete orders by id.
 */
exports.deleteOrderById = function (args, callback) {
    OrderModel.findOneAndRemove({
        orderId: args.orderId
    }, function (err, data) {
        let response = {};
        if (data) {
            response.code = 200;
            response.status = "success";
            response.message = "Order Deleted Successfully";
        } else {
            response.code = 400;
            response.status = "Bad Request";
        }
        callback(response);
    });
};

/**
 * @name getListByItemAndCount
 * @description It is used to ordered list item by count.
 * @return ordered item and count
 */
exports.getListByItemAndCount = function (args, callback) {
    let offset = parseInt(args.offset) || 0;
    let limit = parseInt(args.limit) || 10;
    OrderModel.aggregate([{
            $group: {
                _id: "$item",
                count: {
                    $sum: 1
                }
            }
        }, {
            $project: {
                _id: 0,
                item: "$_id",
                count: "$count"
            }
        }, {
            $sort: {
                count: -1,
                item: 1
            }
        }, {
            $skip: offset
        }, {
            $limit: limit
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
}