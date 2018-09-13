const joiValidate = require('util/joiValidate');

const userSchema = require('domain/user/userSchema');

const BedRequestError = require('error/badRequestError');

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
