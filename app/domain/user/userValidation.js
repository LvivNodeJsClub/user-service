const joiValidate = require('app/util/joiValidate');

const userSchema = require('app/domain/user/userSchema');

const BedRequestError = require('app/error/badRequestError');

class UserValidation {

    async createValidator(request, response, next) {
        await joiValidate(request.body, userSchema.create, BedRequestError);

        next();
    }

    async updateValidator(request, response, next) {
        await joiValidate(request.body, userSchema.update, BedRequestError);

        next();
    }
}

module.exports = UserValidation;
