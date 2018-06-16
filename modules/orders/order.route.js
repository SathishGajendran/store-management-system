/**
 * @name modules/order.route
 * @description It used to handle order routes
 */
'use strict';

//custom modules
var orderRoutes = require('express').Router(),
    orderController = require('./order.controller'),
    responseHandler = require('../../helper/response-handler.helper');

/**
 * @name getOrdersByCustomer
 * @description It is used to handle get orders by customer request.
 * @return orders
 */
orderRoutes.get('/customer', function (req, res) {
    try {
        let filters = JSON.parse(req.query.filters);
        if (filters.customerName || filters.customerAddress) {
            req.query.filters = filters;
            orderController.getOrders(req.query, function (data) {
                res.status(data.code).send(data);
            });
        } else {
            responseHandler.sendBadrequest(res);
        }
    } catch (e) {
        responseHandler.sendBadrequest(res);
    }
});

/**
 * @name createOrder
 * @description It is used to create orders.
 */
orderRoutes.post('/', function (req, res) {
    if (req.body && req.body.customerName && req.body.customerAddress && req.body.item &&
        req.body.price && req.body.currency) {
        orderController.createOrder(req.body, function (data) {
            res.status(data.code).send(data);
        })
    } else {
        responseHandler.sendBadrequest(res);
    }
});

/**
 * @name updateOrderById
 * @description It is used to update orders by id.
 */
orderRoutes.put('/:orderId', function (req, res) {
    req.body.orderId = req.params.orderId;
    orderController.updateOrderById(req.body, function (data) {
        res.status(data.code).send(data);
    });
});

/**
 * @name deleteOrderById
 * @description It is used to delete orders by id.
 */
orderRoutes.delete('/:orderId', function (req, res) {
    orderController.deleteOrderById(req.params, function (data) {
        res.status(data.code).send(data);
    });
});

/**
 * @name getListItem
 * @description It is used to ordered list item by count.
 * @return ordered item and count
 */
orderRoutes.get('/listitem', function (req, res) {
    orderController.getListByItemAndCount(req.query, function (data) {
        res.status(data.code).send(data);
    });
});

/**
 * @name getAllBoughtOrdersByCustomerId
 * @description It is used to get all bought orders by customer id.
 * @return orders
 */
orderRoutes.get('/all/:customerId', function (req, res) {
    req.query.customerId = req.params.customerId;
    orderController.getAllBoughtOrdersByCustomerId(req.query,function(data){
        res.status(data.code).send(data);
    });
});

module.exports = orderRoutes;