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

    it('should init groupController', async function() {
        expect(applicationContext.groupController).not.equal(null);
    });

    it('should init groupValidation', async function() {
        expect(applicationContext.groupValidation).not.equal(null);
    });
});