const expect = require('chai').expect;

const knexfile = require('knexfile');

describe('knexfile', function() {

    it('should init config', async function() {
        expect(knexfile).not.equal(null);
    });
});