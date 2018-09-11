const BedRequestError = require('error/badRequestError');

class UserValidation {

    constructor() {
    }

    async createValidator(request, response, next) {
        if (typeof request.body === 'undefined') {
            throw new BedRequestError('Can not parse body.');
        }

        if (typeof request.body.name === 'undefined') {
            throw new BedRequestError('`name` is required.');
        }

        next();
    }

    async updateValidator(request, response, next) {
        await this.createValidator(request, response, next);
    }
}

module.exports = UserValidation;