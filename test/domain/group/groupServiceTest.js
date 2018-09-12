const sinon          = require('sinon');
const chai           = require('chai');
const expect         = chai.expect;
const chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

const GroupService    = require('domain/group/groupService');
const GroupRepository = require('domain/group/groupRepository');

describe('GroupService', function() {

    let sandbox;

    let groupService;

    before(function() {
        const groupRepositoryMock = new GroupRepository();
        groupService              = new GroupService(groupRepositoryMock);
        sandbox                   = sinon.createSandbox();
    });

    afterEach(function() {
        sandbox.restore();
    });

    describe('getAll', function() {

        it('should return all groups', async function() {
            const getAllStub = sandbox.stub(GroupRepository.prototype, 'getAll').callsFake(() => Promise.resolve([{name: 'Group name'}]));

            const actual = await groupService.getAll();

            expect(getAllStub.calledOnce).equal(true);

            expect(actual).an('array');
            expect(actual).lengthOf(1);
            expect(actual).deep.members([{name: 'Group name'}]);
        });
    });

    describe('get', function() {

        it('should return group', async function() {
            const getStub = sandbox.stub(GroupRepository.prototype, 'get').callsFake(() => Promise.resolve({name: 'Group name'}));

            const actual = await groupService.get(1);

            expect(getStub.calledOnce).equal(true);
            expect(getStub.calledWith(1)).equal(true);

            expect(actual).not.equal(null);
            expect(actual.name).equal('Group name');
        });

        it('should not return not existing group', async function() {
            const getStub = sandbox.stub(GroupRepository.prototype, 'get').callsFake(() => Promise.resolve(undefined));

            const getPromise = groupService.get(1);
            await expect(getPromise).rejectedWith('No group 1');

            expect(getStub.calledOnce).equal(true);
            expect(getStub.calledWith(1)).equal(true);
        });
    });

    describe('create', function() {

        it('should create group', async function() {
            const createStub = sandbox.stub(GroupRepository.prototype, 'create').callsFake(() => Promise.resolve({name: 'Group name'}));

            const actual = await groupService.create({name: 'Group name'});

            expect(createStub.calledOnce).equal(true);
            expect(createStub.calledWith({name: 'Group name'})).equal(true);

            expect(actual).not.equal(null);
            expect(actual.name).equal('Group name');
        });

        it('should not create group with id', async function() {
            const createStub = sandbox.stub(GroupRepository.prototype, 'create').callsFake(() => Promise.resolve({name: 'Group name'}));

            const actual = await groupService.create({id: 2, name: 'Group name'});

            expect(createStub.calledOnce).equal(true);
            expect(createStub.calledWith({name: 'Group name'})).equal(true);

            expect(actual).not.equal(null);
            expect(actual.name).equal('Group name');
        });
    });


    describe('update', function() {

        it('should update group', async function() {
            const getStub    = sandbox.stub(GroupRepository.prototype, 'get').callsFake(() => Promise.resolve({name: 'Group name'}));
            const updateStub = sandbox.stub(GroupRepository.prototype, 'update').callsFake(() => Promise.resolve({name: 'Group name'}));

            const actual = await groupService.update(1, {name: 'Group name'});

            expect(getStub.calledOnce).equal(true);
            expect(getStub.calledWith(1)).equal(true);

            expect(updateStub.calledOnce).equal(true);
            expect(updateStub.calledWith(1, {name: 'Group name'})).equal(true);

            expect(actual).not.equal(null);
            expect(actual.name).equal('Group name');
        });

        it('should not update group id', async function() {
            const getStub    = sandbox.stub(GroupRepository.prototype, 'get').callsFake(() => Promise.resolve({name: 'Group name'}));
            const updateStub = sandbox.stub(GroupRepository.prototype, 'update').callsFake(() => Promise.resolve({name: 'Group name'}));

            const actual = await groupService.update(1, {id: 2, name: 'Group name'});

            expect(getStub.calledOnce).equal(true);
            expect(getStub.calledWith(1)).equal(true);

            expect(updateStub.calledOnce).equal(true);
            expect(updateStub.calledWith(1, {name: 'Group name'})).equal(true);

            expect(actual).not.equal(null);
            expect(actual.name).equal('Group name');
        });

        it('should not update no-exiting group', async function() {
            const getStub    = sandbox.stub(GroupRepository.prototype, 'get').callsFake(() => Promise.resolve(undefined));
            const updateStub = sandbox.stub(GroupRepository.prototype, 'update').callsFake(() => Promise.resolve({name: 'Group name'}));

            const updatePromise = groupService.update(1, {name: 'Group name'});
            await expect(updatePromise).rejectedWith('No group 1');

            expect(getStub.calledOnce).equal(true);
            expect(getStub.calledWith(1)).equal(true);

            expect(updateStub.calledOnce).equal(false);
        });
    });


    describe('delete', function() {

        it('should delete group', async function() {
            const getStub    = sandbox.stub(GroupRepository.prototype, 'get').callsFake(() => Promise.resolve({name: 'Group name'}));
            const deleteStub = sandbox.stub(GroupRepository.prototype, 'delete').callsFake(() => Promise.resolve(undefined));

            await groupService.delete(1);

            expect(getStub.calledOnce).equal(true);
            expect(getStub.calledWith(1)).equal(true);

            expect(deleteStub.calledOnce).equal(true);
            expect(deleteStub.calledWith(1)).equal(true);
        });

        it('should not delete no-exiting group', async function() {
            const getStub    = sandbox.stub(GroupRepository.prototype, 'get').callsFake(() => Promise.resolve(undefined));
            const deleteStub = sandbox.stub(GroupRepository.prototype, 'delete').callsFake(() => Promise.resolve(undefined));

            const deletePromise = groupService.delete(1);
            await expect(deletePromise).rejectedWith('No group 1');

            expect(getStub.calledOnce).equal(true);
            expect(getStub.calledWith(1)).equal(true);

            expect(deleteStub.calledOnce).equal(false);
        });
    });
});