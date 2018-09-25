const sinon          = require('sinon');
const chai           = require('chai');
const expect         = chai.expect;
const chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

const UserService    = require('app/domain/user/userService');
const UserRepository = require('app/domain/user/userRepository');

describe('UserService', function() {

    let sandbox;

    let userService;

    before(async function() {
        const userRepositoryMock = new UserRepository();
        userService              = new UserService(userRepositoryMock);
    });


    beforeEach(function() {
        sandbox = sinon.createSandbox();
    });

    afterEach(function() {
        sandbox.restore();
    });

    describe('getAll', function() {

        it('should return all users', async function() {
            const getAllStub = sandbox.stub(UserRepository.prototype, 'getAll').callsFake(() => Promise.resolve([{name: 'User name'}]));

            const actual = await userService.getAll();

            expect(getAllStub.calledOnce).equal(true);

            expect(actual).an('array');
            expect(actual).lengthOf(1);
            expect(actual).deep.members([{name: 'User name'}]);
        });
    });

    describe('get', function() {

        it('should return user', async function() {
            const getStub = sandbox.stub(UserRepository.prototype, 'get').callsFake(() => Promise.resolve({name: 'User name'}));

            const actual = await userService.get(1);

            expect(getStub.calledOnce).equal(true);
            expect(getStub.calledWith(1)).equal(true);

            expect(actual).not.equal(null);
            expect(actual.name).equal('User name');
        });

        it('should not return not existing user', async function() {
            const getStub = sandbox.stub(UserRepository.prototype, 'get').callsFake(() => Promise.resolve(undefined));

            const getPromise = userService.get(1);
            await expect(getPromise).rejectedWith('No user 1');

            expect(getStub.calledOnce).equal(true);
            expect(getStub.calledWith(1)).equal(true);
        });
    });

    describe('create', function() {

        it('should create user', async function() {
            const createStub = sandbox.stub(UserRepository.prototype, 'create').callsFake(() => Promise.resolve({name: 'User name'}));

            const actual = await userService.create({name: 'User name'});

            expect(createStub.calledOnce).equal(true);
            expect(createStub.calledWith({name: 'User name'})).equal(true);

            expect(actual).not.equal(null);
            expect(actual.name).equal('User name');
        });

        it('should not create user with id', async function() {
            const createStub = sandbox.stub(UserRepository.prototype, 'create').callsFake(() => Promise.resolve({name: 'User name'}));

            const actual = await userService.create({id: 2, name: 'User name'});

            expect(createStub.calledOnce).equal(true);
            expect(createStub.calledWith({name: 'User name'})).equal(true);

            expect(actual).not.equal(null);
            expect(actual.name).equal('User name');
        });
    });


    describe('update', function() {

        it('should update user', async function() {
            const getStub    = sandbox.stub(UserRepository.prototype, 'get').callsFake(() => Promise.resolve({name: 'User name'}));
            const updateStub = sandbox.stub(UserRepository.prototype, 'update').callsFake(() => Promise.resolve({name: 'User name'}));

            const actual = await userService.update(1, {name: 'User name'});

            expect(getStub.calledOnce).equal(true);
            expect(getStub.calledWith(1)).equal(true);

            expect(updateStub.calledOnce).equal(true);
            expect(updateStub.calledWith(1, {name: 'User name'})).equal(true);

            expect(actual).not.equal(null);
            expect(actual.name).equal('User name');
        });

        it('should not update user id', async function() {
            const getStub    = sandbox.stub(UserRepository.prototype, 'get').callsFake(() => Promise.resolve({name: 'User name'}));
            const updateStub = sandbox.stub(UserRepository.prototype, 'update').callsFake(() => Promise.resolve({name: 'User name'}));

            const actual = await userService.update(1, {id: 2, name: 'User name'});

            expect(getStub.calledOnce).equal(true);
            expect(getStub.calledWith(1)).equal(true);

            expect(updateStub.calledOnce).equal(true);
            expect(updateStub.calledWith(1, {name: 'User name'})).equal(true);

            expect(actual).not.equal(null);
            expect(actual.name).equal('User name');
        });

        it('should not update no-exiting user', async function() {
            const getStub    = sandbox.stub(UserRepository.prototype, 'get').callsFake(() => Promise.resolve(undefined));
            const updateStub = sandbox.stub(UserRepository.prototype, 'update').callsFake(() => Promise.resolve({name: 'User name'}));

            const updatePromise = userService.update(1, {name: 'User name'});
            await expect(updatePromise).rejectedWith('No user 1');

            expect(getStub.calledOnce).equal(true);
            expect(getStub.calledWith(1)).equal(true);

            expect(updateStub.calledOnce).equal(false);
        });
    });


    describe('delete', function() {

        it('should delete user', async function() {
            const getStub    = sandbox.stub(UserRepository.prototype, 'get').callsFake(() => Promise.resolve({name: 'User name'}));
            const deleteStub = sandbox.stub(UserRepository.prototype, 'delete').callsFake(() => Promise.resolve(undefined));

            await userService.delete(1);

            expect(getStub.calledOnce).equal(true);
            expect(getStub.calledWith(1)).equal(true);

            expect(deleteStub.calledOnce).equal(true);
            expect(deleteStub.calledWith(1)).equal(true);
        });

        it('should not delete no-exiting user', async function() {
            const getStub    = sandbox.stub(UserRepository.prototype, 'get').callsFake(() => Promise.resolve(undefined));
            const deleteStub = sandbox.stub(UserRepository.prototype, 'delete').callsFake(() => Promise.resolve(undefined));

            const deletePromise = userService.delete(1);
            await expect(deletePromise).rejectedWith('No user 1');

            expect(getStub.calledOnce).equal(true);
            expect(getStub.calledWith(1)).equal(true);

            expect(deleteStub.calledOnce).equal(false);
        });
    });
});
