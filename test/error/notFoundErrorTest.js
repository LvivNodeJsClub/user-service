const expect     = require('chai').expect;
const HttpStatus = require('http-status-codes');

const NotFoundError = require('error/notFoundError');

describe('NotFoundError', function() {

    it('should contain status', async function() {
        const notFoundErrorTest = new NotFoundError('message');
        expect(notFoundErrorTest.status).equal(HttpStatus.NOT_FOUND);
    });
});