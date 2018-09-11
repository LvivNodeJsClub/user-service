const BedRequestError = require('error/badRequestError');
const NotFoundError   = require('error/notFoundError');

class ErrorHandler {

    constructor() {
    }

    handle(error, request, response, next) {
        if (
        (error instanceof BedRequestError) ||
        (error instanceof NotFoundError)
        ) {
            response.status(error.status).json({error: error.message});
        } else {
            next();
        }
    }
}

module.exports = ErrorHandler;