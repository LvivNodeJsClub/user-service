const HttpStatus = require('http-status-codes');

const BedRequestError = require('app/error/badRequestError');
const NotFoundError   = require('app/error/notFoundError');

module.exports = function(error, request, response, next) {
    if (
    (error instanceof BedRequestError) ||
    (error instanceof NotFoundError)
    ) {
        response.status(error.status).json({error: error.message});
    } else if (
    (error instanceof Error) &&
    (typeof error.constraint !== 'undefined')
    ) {
        response.status(HttpStatus.CONFLICT).json({error: error.detail});
    } else {
        next();
    }
};
