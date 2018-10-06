const joiValidate = require('app/util/joiValidate');

const userSchema = require('app/domain/user/userSchema');

const BedRequestError = require('app/error/badRequestError');

export class UserValidation {

    async createValidator(request: any, response: any, next: any) {
        await joiValidate(request.body, userSchema.create, BedRequestError);

        next();
    }

    async updateValidator(request: any, response: any, next: any) {
        await joiValidate(request.body, userSchema.update, BedRequestError);

        next();
    }
}

module.exports = UserValidation;