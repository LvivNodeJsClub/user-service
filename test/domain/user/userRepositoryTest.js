require('rootpath')();

const expect = require('chai').expect;

const knex = require('database/knex');

const UserRepository = require('domain/user/userRepository');

describe('UserRepository', function() {

    let userRepository;

    before(async function() {
        userRepository = new UserRepository(knex);
    });

    before(async function() {
        const users = await userRepository.getAll();
        users.forEach(async user => await userRepository.delete(user.id));
    });

    describe('getAll', function() {

        before(async function() {
            await userRepository.create({name: 'User name 1'});
            await userRepository.create({name: 'User name 2'});
        });

        it('should return all users', async function() {
            const users = await userRepository.getAll();

            expect(users).an('array');
            expect(users).lengthOf(2);
        });
    });

    describe('get', function() {
        let user;

        before(async function() {
            [user] = await userRepository.create({name: 'User name'});
        });

        it('should return user', async function() {
            const actual = await userRepository.get(user.id);

            expect(actual).not.equal(null);
            expect(actual.name).equal(user.name)
        });

        it('should return null for not exist user id', async function() {
            const actual = await userRepository.get(100500);

            expect(actual).eq(undefined);
        });
    });

    describe('create', function() {
        it('should create user', async function() {
            const [user] = await userRepository.create({name: 'User name'});

            const actual = await userRepository.get(user.id);
            expect(actual).not.equal(null);
            expect(actual.name).equal('User name')
        });

        it('should create and return user', async function() {
            const [actual] = await userRepository.create({name: 'User name'});

            expect(actual).not.equal(undefined);
            expect(actual.name).equal('User name');
        });
    });


    describe('update', function() {
        let user;

        beforeEach(async function() {
            [user] = await userRepository.create({name: 'User name'});
        });


        it('should update user', async function() {
            await userRepository.update(user.id, {name: 'New name'});

            const actual = await userRepository.get(user.id);
            expect(actual).not.equal(null);
            expect(actual.name).equal('New name')
        });

        it('should update and return user', async function() {
            const [actual] = await userRepository.update(user.id, {name: 'New name'});

            expect(actual).not.equal(undefined);
            expect(actual.name).equal('New name');
        });
    });


    describe('delete', function() {
        let user;

        beforeEach(async function() {
            [user] = await userRepository.create({name: 'User name'});
        });

        it('should delete user', async function() {
            await userRepository.delete(user.id);

            const actual = await userRepository.get(user.id);
            expect(actual).equal(undefined);
        });

        it('should not delete other users', async function() {
            await userRepository.delete(-1);

            const actual = await userRepository.get(user.id);
            expect(actual).not.equal(undefined);
        });
    });
});
