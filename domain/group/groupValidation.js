const BedRequestError = require('error/badRequestError');

class GroupValidation {

    constructor() {
    }

    detailsValidator(request) {
        if (typeof request.body === 'undefined') {
            throw new BedRequestError('Can not parse body.');
        }

        if (typeof request.body.name === 'undefined') {
            throw new BedRequestError('Group name is required.');
        }

        if (request.body.name.length < 3) {
            throw new BedRequestError('Group name 3 characters minimum.');
        }
    }

    async createValidator(request, response, next) {
        this.detailsValidator(request);

        next();
    }

    async updateValidator(request, response, next) {
        this.detailsValidator(request);

        next();
    }
}

module.exports = GroupValidation;
