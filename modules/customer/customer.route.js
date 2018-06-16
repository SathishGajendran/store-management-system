/**
 * @name modules/customer.route
 * @description It used to handle customer routes
 */
'use strict';

// custom modules
var customerRoutes = require('express').Router(),
    customerController = require('./customer.controller');

/**
 * @name getCustomerById
 * @description It is used to get customers by id.
 * @return orders
 */
customerRoutes.get('/:customerId', function (req, res) {
    customerController.getCustomerById(req.params, function (data) {
        res.send(data);
    });
});

/**
 * @name updateCustomerById
 * @description It is used to update customer by id.
 */
customerRoutes.put('/:customerId', function (req, res) {
    req.body.customerId = req.params.customerId;
    customerController.updateCustomerById(req.body, function (data) {
        res.status(data.code).send(data);
    });
});

/**
 * @name deleteCustomerById
 * @description It is used to delete customer by id.
 */
customerRoutes.delete('/:customerId', function (req, res) {
    customerController.deleteCustomerById(req.params, function (data) {
        res.status(data.code).send(data);
    });
});

/**
 * @name getCustomerHistoryById
 * @description It is used to delete customer by id.
 */
customerRoutes.get('/history/:customerId', function (req, res) {
    customerController.getCustomerHistoryById(req.params, function (data) {
        res.status(data.code).send(data);
    });
});

/**
 * @name getCustomerByPurchasedItem
 * @description It is used to get customer by purchased item.
 */
customerRoutes.get('/purchaseditem/:item', function (req, res) {
    customerController.getCustomerByPurchasedItem(req.params, function (data) {
        res.status(data.code).send(data);
    });
});

module.exports = customerRoutes;