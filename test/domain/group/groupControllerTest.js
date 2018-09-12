const sinon          = require('sinon');
const chai           = require('chai');
const expect         = chai.expect;
const chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

const HttpStatus = require('http-status-codes');

const NotFoundError   = require('error/notFoundError');
const GroupService    = require('domain/group/groupService');
const GroupController = require('domain/group/groupController');

describe('GroupController', function() {

    let sandbox;

    let groupController;

    before(async function() {
        const groupService = new GroupService();
        groupController    = new GroupController(groupService);
        sandbox            = sinon.createSandbox();
    });

    afterEach(function() {
        sandbox.restore();
    });

    describe('getAll', function() {

        it('should return all groups', async function() {
            const getAllStub = sandbox.stub(GroupService.prototype, 'getAll').callsFake(() => Promise.resolve([{name: 'Group name'}]));

            const request  = {};
            const response = {
                status: sinon.fake(() => response),
                json:   sinon.fake(() => response),
            };

            await groupController.getAll(request, response);

            expect(getAllStub.calledOnce).equal(true);

            expect(response.status.calledOnce).equal(true);
            expect(response.status.calledWith(HttpStatus.OK)).equal(true);

            expect(response.json.calledOnce).equal(true);
            expect(response.json.calledWith([{name: 'Group name'}])).equal(true);
        });
    });

    describe('get', function() {

        it('should return group', async function() {
            const getStub = sandbox.stub(GroupService.prototype, 'get').callsFake(() => Promise.resolve({name: 'Group name'}));

            const request  = {
                params: {
                    id: 1
                }
            };
            const response = {
                status: sinon.fake(() => response),
                json:   sinon.fake(() => response),
            };

            await groupController.get(request, response);

            expect(getStub.calledOnce).equal(true);
            expect(getStub.calledWith(1)).equal(true);

            expect(response.status.calledOnce).equal(true);
            expect(response.status.calledWith(HttpStatus.OK)).equal(true);

            expect(response.json.calledOnce).equal(true);
            expect(response.json.calledWith({name: 'Group name'})).equal(true);
        });

        it('should not return not existing group', async function() {
            const getStub = sandbox.stub(GroupService.prototype, 'get').callsFake(() => {
                throw new NotFoundError(`No group 1`);
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

            const getPromise = groupController.get(request, response);
            await expect(getPromise).rejectedWith('No group 1');

            expect(getStub.calledOnce).equal(true);
            expect(getStub.calledWith(1)).equal(true);

            expect(response.status.calledOnce).equal(false);
            expect(response.json.calledOnce).equal(false);

        });
    });

    describe('create', function() {

        it('should create group', async function() {
            const createStub = sandbox.stub(GroupService.prototype, 'create').callsFake(() => Promise.resolve({name: 'Group name'}));

            const request  = {
                body: {name: 'Group name'}
            };
            const response = {
                status: sinon.fake(() => response),
                json:   sinon.fake(() => response),
            };

            await groupController.create(request, response);

            expect(createStub.calledOnce).equal(true);
            expect(createStub.calledWith({name: 'Group name'})).equal(true);

            expect(response.status.calledOnce).equal(true);
            expect(response.status.calledWith(HttpStatus.CREATED)).equal(true);

            expect(response.json.calledOnce).equal(true);
            expect(response.json.calledWith({name: 'Group name'})).equal(true);
        });
    });

    describe('update', function() {

        it('should update group', async function() {
            const updateStub = sandbox.stub(GroupService.prototype, 'update').callsFake(() => Promise.resolve({name: 'New name'}));

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

            await groupController.update(request, response);

            expect(updateStub.calledOnce).equal(true);
            expect(updateStub.calledWith(1, {name: 'New name'})).equal(true);

            expect(response.status.calledOnce).equal(true);
            expect(response.status.calledWith(HttpStatus.OK)).equal(true);

            expect(response.json.calledOnce).equal(true);
        });
    });

    describe('delete', function() {

        it('should delete group', async function() {
            const deleteStub = sandbox.stub(GroupService.prototype, 'delete').callsFake(() => Promise.resolve(undefined));
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

            await groupController.delete(request, response);

            expect(deleteStub.calledOnce).equal(true);
            expect(deleteStub.calledWith(1)).equal(true);

            expect(response.status.calledOnce).equal(false);

            expect(response.sendStatus.calledOnce).equal(true);
            expect(response.sendStatus.calledWith(HttpStatus.NO_CONTENT)).equal(true);

            expect(response.json.calledOnce).equal(false);
        });
    });
});
