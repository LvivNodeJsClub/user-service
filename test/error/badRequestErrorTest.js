const expect     = require('chai').expect;
const HttpStatus = require('http-status-codes');

const BedRequestError = require('error/badRequestError');

describe('BadRequestError', function() {

    it('should contain status', async function() {
        const bedRequestError = new BedRequestError('message');
        expect(bedRequestError.status).equal(HttpStatus.BAD_REQUEST);
    });
});
