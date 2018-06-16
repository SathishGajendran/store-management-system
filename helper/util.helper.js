/**
 * @name helper/util.helper
 * @description It provide utility functions.
 */
'use strict';

/**
 * @function generateId
 * @description It is used to random id with timestamp.
 */
exports.generateId = function () {
    var id = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    id += possible.charAt(Math.floor(Math.random() * possible.length));
    id += possible.charAt(Math.floor(Math.random() * possible.length));
    return id + Date.now();
}