require('rootpath')();

const expect = require('chai').expect;
const sinon  = require('sinon');

const UserValidation = require('domain/user/userValidation');

describe('UserValidation', function() {

    let userValidation;

    before(function() {
        userValidation = new UserValidation();
    });

    describe('createValidator', function() {

        it('should throw error without body', async function() {
            const request  = {
                params: {
                    id: 1
                }
            };
            const response = {
                status: sinon.fake(() => response),
                json:   sinon.fake(() => response),
            };
            const next     = sinon.fake();

            const createValidatorPromise = userValidation.createValidator(request, response, next);
            await expect(createValidatorPromise).rejectedWith('Can not parse body.');

            expect(next.calledOnce).equal(false);
        });

        it('should throw error without name', async function() {
            const request  = {
                params: {
                    id: 1
                },
                body:   {}
            };
            const response = {
                status: sinon.fake(() => response),
                json:   sinon.fake(() => response),
            };
            const next     = sinon.fake();

            const createValidatorPromise = userValidation.createValidator(request, response, next);
            await expect(createValidatorPromise).rejectedWith('`name` is required.');

            expect(next.calledOnce).equal(false);
        });

        it('should call next', function() {
            const request  = {
                params: {
                    id: 1
                },
                body:   {
                    name: 'User name'
                }
            };
            const response = {
                status: sinon.fake(() => response),
                json:   sinon.fake(() => response),
            };
            const next     = sinon.fake();

            userValidation.createValidator(request, response, next)

            expect(next.calledOnce).equal(true);
            expect(next.calledWith()).equal(true);
        });
    });

    describe('updateValidator', function() {

        it('should throw error without body', async function() {
            const request  = {
                params: {
                    id: 1
                }
            };
            const response = {
                status: sinon.fake(() => response),
                json:   sinon.fake(() => response),
            };
            const next     = sinon.fake();

            const createValidatorPromise = userValidation.updateValidator(request, response, next);
            await expect(createValidatorPromise).rejectedWith('Can not parse body.');

            expect(next.calledOnce).equal(false);
        });

        it('should throw error without name', async function() {
            const request  = {
                params: {
                    id: 1
                },
                body:   {}
            };
            const response = {
                status: sinon.fake(() => response),
                json:   sinon.fake(() => response),
            };
            const next     = sinon.fake();

            const createValidatorPromise = userValidation.updateValidator(request, response, next);
            await expect(createValidatorPromise).rejectedWith('`name` is required.');

            expect(next.calledOnce).equal(false);
        });

        it('should call next', function() {
            const request  = {
                params: {
                    id: 1
                },
                body:   {
                    name: 'User name'
                }
            };
            const response = {
                status: sinon.fake(() => response),
                json:   sinon.fake(() => response),
            };
            const next     = sinon.fake();

            userValidation.updateValidator(request, response, next)

            expect(next.calledOnce).equal(true);
            expect(next.calledWith()).equal(true);
        });
    });
});