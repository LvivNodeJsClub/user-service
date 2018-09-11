require('rootpath')();

const expect = require('chai').expect;
const sinon  = require('sinon');

const wrapAsync = require('util/wrapAsync');

describe('wrapAsync', function() {


    it('should call next on error', async function() {
        const fn = wrapAsync(async () => {
            throw new Error('Error');
        });

        const request  = sinon.fake();
        const response = sinon.fake();
        const next     = sinon.fake();

        await fn(request, response, next);

        expect(request.calledOnce).equal(false);
        expect(response.calledOnce).equal(false);

        expect(next.calledOnce).equal(true);
        expect(next.calledWith()).equal(true);
    });

    it('should call next on rejected promise', async function() {
        const fn = wrapAsync(() => Promise.reject('Error'));

        const request  = sinon.fake();
        const response = sinon.fake();
        const next     = sinon.fake();

        await fn(request, response, next);

        expect(request.calledOnce).equal(false);
        expect(response.calledOnce).equal(false);

        expect(next.calledOnce).equal(true);
        expect(next.calledWith()).equal(true);
    });

    it('should not call next', async function() {
        const fn = wrapAsync(async () => 'Result');

        const request  = sinon.fake();
        const response = sinon.fake();
        const next     = sinon.fake();

        await fn(request, response, next);

        expect(request.calledOnce).equal(false);
        expect(response.calledOnce).equal(false);

        expect(next.calledWith()).equal(false);
    });
});