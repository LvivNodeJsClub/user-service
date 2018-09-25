const sinon          = require('sinon');
const chai           = require('chai');
const expect         = chai.expect;
const chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

const GroupValidation = require('app/domain/group/groupValidation');

describe('GroupValidation', function() {

    let groupValidation;

    before(function() {
        groupValidation = new GroupValidation();
    });

    describe('createValidator', function() {

        it('should throw error without body', async function() {
            const request  = {
            };
            const response = {
                status: sinon.fake(() => response),
                json:   sinon.fake(() => response),
            };
            const next     = sinon.fake();

            const createValidatorPromise = groupValidation.createValidator(request, response, next);
            await expect(createValidatorPromise).rejectedWith('"body" is required');

            expect(next.calledOnce).equal(false);
        });

        it('should throw error without name', async function() {
            const request  = {
                body:   {}
            };
            const response = {
                status: sinon.fake(() => response),
                json:   sinon.fake(() => response),
            };
            const next     = sinon.fake();

            const createValidatorPromise = groupValidation.createValidator(request, response, next);
            await expect(createValidatorPromise).rejectedWith('"Group name" is required');

            expect(next.calledOnce).equal(false);
        });

        it('should throw error with short name', async function() {
            const request  = {
                body:   {
                    name: 'Gr'
                }
            };
            const response = {
                status: sinon.fake(() => response),
                json:   sinon.fake(() => response),
            };
            const next     = sinon.fake();

            const createValidatorPromise = groupValidation.createValidator(request, response, next);
            await expect(createValidatorPromise).rejectedWith('"Group name" length must be at least 3 characters long');

            expect(next.calledOnce).equal(false);
        });

        it('should call next', async function() {
            const request  = {
                body:   {
                    name: 'Group name'
                }
            };
            const response = {
                status: sinon.fake(() => response),
                json:   sinon.fake(() => response),
            };
            const next     = sinon.fake();

            await groupValidation.createValidator(request, response, next);

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

            const createValidatorPromise = groupValidation.updateValidator(request, response, next);
            await expect(createValidatorPromise).rejectedWith('"body" is required');

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

            const createValidatorPromise = groupValidation.updateValidator(request, response, next);
            await expect(createValidatorPromise).rejectedWith('"Group name" is required');

            expect(next.calledOnce).equal(false);
        });

        it('should throw error with short name', async function() {
            const request  = {
                params: {
                    id: 1
                },
                body:   {
                    name: 'a'
                }
            };
            const response = {
                status: sinon.fake(() => response),
                json:   sinon.fake(() => response),
            };
            const next     = sinon.fake();

            const createValidatorPromise = groupValidation.updateValidator(request, response, next);
            await expect(createValidatorPromise).rejectedWith('"Group name" length must be at least 3 characters long');

            expect(next.calledOnce).equal(false);
        });

        it('should call next', async function() {
            const request  = {
                params: {
                    id: 1
                },
                body:   {
                    name: 'Group name'
                }
            };
            const response = {
                status: sinon.fake(() => response),
                json:   sinon.fake(() => response),
            };
            const next     = sinon.fake();

            await groupValidation.updateValidator(request, response, next);

            expect(next.calledOnce).equal(true);
            expect(next.calledWith()).equal(true);
        });
    });
});
