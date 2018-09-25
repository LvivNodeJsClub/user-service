const expect     = require('chai').expect;
const sinon      = require('sinon');
const HttpStatus = require('http-status-codes');

const BedRequestError = require('app/error/badRequestError');
const NotFoundError   = require('app/error/notFoundError');
const errorHandler    = require('app/util/errorHandler');

describe('ErrorHandler', function() {

    describe('handle', function() {

        it('should handle Error', async function() {
            const request  = sinon.fake();
            const response = {
                status: sinon.fake(() => response),
                json:   sinon.fake(() => response),
            };
            const next     = sinon.fake();

            errorHandler(new Error('message'), request, response, next);

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

            errorHandler(new BedRequestError('message'), request, response, next);

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

            errorHandler(new NotFoundError('message'), request, response, next);
            expect(next.calledOnce).equal(false);

            expect(response.status.calledOnce).equal(true);
            expect(response.status.calledWith(HttpStatus.NOT_FOUND)).equal(true);

            expect(response.json.calledOnce).equal(true);
            expect(response.json.calledWith({error: 'message'})).equal(true);
        });
    });
});
