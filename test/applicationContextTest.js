require('rootpath')();

const expect = require('chai').expect;

const ApplicationContext = require('ApplicationContext');

describe('ApplicationContext', function() {

    let applicationContext;

    before(function() {
        applicationContext = new ApplicationContext();
    });

    it('should init userController', async function() {
        expect(applicationContext.userController).not.equal(null);
    });

    it('should init userValidation', async function() {
        expect(applicationContext.userValidation).not.equal(null);
    });
});