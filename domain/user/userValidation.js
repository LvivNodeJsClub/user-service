const emailValidator = require("email-validator");

const BedRequestError = require('error/badRequestError');

class UserValidation {

    constructor() {
    }

    detailsValidator(request) {
        if (typeof request.body === 'undefined') {
            throw new BedRequestError('Can not parse body.');
        }

        if (typeof request.body.name === 'undefined') {
            throw new BedRequestError('User name is required.');
        }

        if (request.body.name.length < 3) {
            throw new BedRequestError('User name 3 characters minimum.');
        }

        if (typeof request.body.login === 'undefined') {
            throw new BedRequestError('User login is required.');
        }

        if (request.body.login.length < 5) {
            throw new BedRequestError('User login 5 characters minimum.');
        }

        if (typeof request.body.email === 'undefined') {
            throw new BedRequestError('User email is required.');
        }

        if (!emailValidator.validate(request.body.email)) {
            throw new BedRequestError('User email is not valid email.');
        }
    }

    passwordValidator(request) {
        if (typeof request.body.confirmPassword === 'undefined') {
            throw new BedRequestError('User confirmPassword is required.');
        }

        if (request.body.confirmPassword !== request.body.password) {
            throw new BedRequestError('User password and confirmPassword mismatch.');
        }
    }

    async createValidator(request, response, next) {
        this.detailsValidator(request, response, next);

        if (typeof request.body.password === 'undefined') {
            throw new BedRequestError('User password is required.');
        }

        this.passwordValidator(request, response, next);

        next();
    }

    async updateValidator(request, response, next) {
        this.detailsValidator(request, response, next);

        if (typeof request.body.password !== 'undefined') {
            this.passwordValidator(request, response, next);
        }

        next();
    }
}

module.exports = UserValidation;