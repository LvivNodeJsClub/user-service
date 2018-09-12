const BedRequestError = require('error/badRequestError');
const NotFoundError   = require('error/notFoundError');
const HttpStatus      = require('http-status-codes');

class ErrorHandler {

    constructor() {
    }

    handle(error, request, response, next) {
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
    }
}

module.exports = ErrorHandler;