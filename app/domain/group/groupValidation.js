const joiValidate = require('app/util/joiValidate');

const groupSchema     = require('app/domain/group/groupSchema');

const BedRequestError = require('app/error/badRequestError');

class GroupValidation {

    async createValidator(request, response, next) {
        await joiValidate(request.body, groupSchema.create, BedRequestError);

        next();
    }

    async updateValidator(request, response, next) {
        await joiValidate(request.body, groupSchema.update, BedRequestError);

        next();
    }
}

module.exports = GroupValidation;
