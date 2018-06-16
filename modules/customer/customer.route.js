/**
 * @name modules/customer.route
 * @description It used to handle customer routes
 */
'use strict';

// custom modules
var customerRoutes = require('express').Router(),
    customerController = require('./customer.controller');

/**
 * 
 */
customerRoutes.get('/all', function (req, res) {
    customerController.getAllCustomers(req.query, function (data) {
        res.send(data);
    })
});

module.exports = customerRoutes;