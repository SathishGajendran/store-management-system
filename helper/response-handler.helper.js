/**
 * @name helper/reponse-handler.helper
 * @description It is used send response to client.
 */
'use strict';

/**
 * @function sendBadrequest
 * @description It is used to send bad request error to client.
 */
exports.sendBadrequest = function (res) {
    res.status(400).send({
        code: "400",
        message: "Bad Request"
    });
}