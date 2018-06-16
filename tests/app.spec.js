/**
 * @name app.spec.js
 * @desc application test cases
 */
'use strict';

//npm modules
var assert = require('assert');

//custom modules
var customer = require('../modules/customer/customer.controller'),
    order = require('../modules/orders/order.controller');


describe('Store Management System', function () {
    this.timeout(10000);
    it('should get customer for a given customer id.', function (done) {
        customer.getCustomerById({
            customerId: "cust001"
        }, function (response) {
            assert.equal(response.status, 'success');
            assert.equal(response.data._doc.customerId, 'cust001');
            assert(response.data._doc && response.data._doc.customerName, 'Customer Name not found');
            assert(response.data._doc && response.data._doc.customerAddress, 'Customer Address not found');
            done();
        })
    });

    it('should get order for a given order id.', function (done) {
        order.getOrders({
            filters:{
                orderId: "001"
            }
        }, function (response) {
            assert.equal(response.status, 'success');
            assert.equal(response.data[0]._doc.orderId, '001');
            assert(response.data[0]._doc && response.data[0]._doc.customerName, 'Customer Name not found');
            assert(response.data[0]._doc && response.data[0]._doc.customerAddress, 'Customer Address not found');
            done();
        });
    });
});