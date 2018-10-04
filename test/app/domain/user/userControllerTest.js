const sinon          = require('sinon');
const chai           = require('chai');
const expect         = chai.expect;
const chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

const HttpStatus = require('http-status-codes');

const NotFoundError  = require('app/error/notFoundError');
const UserService    = require('app/domain/user/userService');
const UserController = require('app/domain/user/userController');

describe('UserController', function() {

    let sandbox;

    let userController;

    before(async function() {
        const userService = new UserService();
        userController    = new UserController(userService);
    });

    beforeEach(function() {
        sandbox = sinon.createSandbox();
    });

    afterEach(function() {
        sandbox.restore();
    });

    describe('getAll', function() {

        it('should return all users', async function() {
            const getAllStub = sandbox.stub(UserService.prototype, 'getAll').callsFake(() => Promise.resolve([{name: 'User name'}]));

            const request  = {};
            const response = {
                status: sinon.fake(() => response),
                json:   sinon.fake(() => response),
            };

            await userController.getAll(request, response);

            expect(getAllStub.calledOnce).equal(true);

            expect(response.status.calledOnce).equal(true);
            expect(response.status.calledWith(HttpStatus.OK)).equal(true);

            expect(response.json.calledOnce).equal(true);
            expect(response.json.calledWith([{name: 'User name'}])).equal(true);
        });
    });

    describe('get', function() {

        it('should return user', async function() {
            const getStub = sandbox.stub(UserService.prototype, 'get').callsFake(() => Promise.resolve({name: 'User name'}));

            const request  = {
                params: {
                    id: 1
                }
            };
            const response = {
                status: sinon.fake(() => response),
                json:   sinon.fake(() => response),
            };

            await userController.get(request, response);

            expect(getStub.calledOnce).equal(true);
            expect(getStub.calledWith(1)).equal(true);

            expect(response.status.calledOnce).equal(true);
            expect(response.status.calledWith(HttpStatus.OK)).equal(true);

            expect(response.json.calledOnce).equal(true);
            expect(response.json.calledWith({name: 'User name'})).equal(true);
        });

        it('should not return not existing user', async function() {
            const getStub = sandbox.stub(UserService.prototype, 'get').callsFake(() => {
                throw new NotFoundError(`No user 1`);
            });

            const request  = {
                params: {
                    id: 1
                }
            };
            const response = {
                status: sinon.fake(() => response),
                json:   sinon.fake(() => response),
            };

            const getPromise = userController.get(request, response);
            await expect(getPromise).rejectedWith('No user 1');

            expect(getStub.calledOnce).equal(true);
            expect(getStub.calledWith(1)).equal(true);

            expect(response.status.calledOnce).equal(false);
            expect(response.json.calledOnce).equal(false);

        });
    });

    describe('create', function() {

        it('should create user', async function() {
            const createStub = sandbox.stub(UserService.prototype, 'create').callsFake(() => Promise.resolve({name: 'User name'}));

            const request  = {
                body: {name: 'User name'}
            };
            const response = {
                status: sinon.fake(() => response),
                json:   sinon.fake(() => response),
            };

            await userController.create(request, response);

            expect(createStub.calledOnce).equal(true);
            expect(createStub.calledWith({name: 'User name'})).equal(true);

            expect(response.status.calledOnce).equal(true);
            expect(response.status.calledWith(HttpStatus.CREATED)).equal(true);

            expect(response.json.calledOnce).equal(true);
            expect(response.json.calledWith({name: 'User name'})).equal(true);
        });
    });

    describe('update', function() {

        it('should update user', async function() {
            const updateStub = sandbox.stub(UserService.prototype, 'update').callsFake(() => Promise.resolve({name: 'New name'}));

            const request  = {
                params: {
                    id: 1
                },
                body:   {name: 'New name'}
            };
            const response = {
                status: sinon.fake(() => response),
                json:   sinon.fake(() => response),
            };

            await userController.update(request, response);

            expect(updateStub.calledOnce).equal(true);
            expect(updateStub.calledWith(1, {name: 'New name'})).equal(true);

            expect(response.status.calledOnce).equal(true);
            expect(response.status.calledWith(HttpStatus.OK)).equal(true);

            expect(response.json.calledOnce).equal(true);
        });
    });

    describe('delete', function() {

        it('should delete user', async function() {
            const deleteStub = sandbox.stub(UserService.prototype, 'delete').callsFake(() => Promise.resolve(undefined));
            const request    = {
                params: {
                    id: 1
                }
            };
            const response   = {
                status:     sinon.fake(() => response),
                sendStatus: sinon.fake(() => response),
                json:       sinon.fake(() => response),
            };

            await userController.delete(request, response);

            expect(deleteStub.calledOnce).equal(true);
            expect(deleteStub.calledWith(1)).equal(true);

            expect(response.status.calledOnce).equal(false);

            expect(response.sendStatus.calledOnce).equal(true);
            expect(response.sendStatus.calledWith(HttpStatus.NO_CONTENT)).equal(true);

            expect(response.json.calledOnce).equal(false);
        });
    });
});
