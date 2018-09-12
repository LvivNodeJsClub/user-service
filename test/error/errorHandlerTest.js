const expect     = require('chai').expect;
const sinon      = require('sinon');
const HttpStatus = require('http-status-codes');

const BedRequestError = require('error/badRequestError');
const NotFoundError   = require('error/notFoundError');
const ErrorHandler    = require('error/errorHandler');

describe('ErrorHandler', function() {

    describe('handle', function() {

        let errorHandler;

        before(function() {
            errorHandler = new ErrorHandler();
        });

        it('should handle Error', async function() {
            const request  = sinon.fake();
            const response = {
                status: sinon.fake(() => response),
                json:   sinon.fake(() => response),
            };
            const next     = sinon.fake();

            errorHandler.handle(new Error('message'), request, response, next);

            expect(next.calledOnce).equal(true);
            expect(next.calledWith()).equal(true);
        });

        it('should handle BadRequestError', async function() {
            const request  = sinon.fake();
            const response = {
                status: sinon.fake(() => response),
                json:   sinon.fake(() => response),
            };
            const next     = sinon.fake();

            errorHandler.handle(new BedRequestError('message'), request, response, next);

            expect(next.calledOnce).equal(false);

            expect(response.status.calledOnce).equal(true);
            expect(response.status.calledWith(HttpStatus.BAD_REQUEST)).equal(true);

            expect(response.json.calledOnce).equal(true);
            expect(response.json.calledWith({error: 'message'})).equal(true);
        });


        it('should handle NotFoundError', async function() {
            const request  = sinon.fake();
            const response = {
                status: sinon.fake(() => response),
                json:   sinon.fake(() => response),
            };
            const next     = sinon.fake();

            errorHandler.handle(new NotFoundError('message'), request, response, next);
            expect(next.calledOnce).equal(false);

            expect(response.status.calledOnce).equal(true);
            expect(response.status.calledWith(HttpStatus.NOT_FOUND)).equal(true);

            expect(response.json.calledOnce).equal(true);
            expect(response.json.calledWith({error: 'message'})).equal(true);
        });
    });
});
