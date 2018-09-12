const expect = require('chai').expect;

const knex = require('database/knex');

const UserRepository = require('domain/user/userRepository');

describe('UserRepository', function() {

    let userRepository;

    before(async function() {
        userRepository = new UserRepository(knex);
    });

    beforeEach(async function() {
        return userRepository.deleteAll();
    });

    describe('getAll', function() {

        it('should return all users', async function() {
            await userRepository.create({
                name:     'User name1',
                login:    'userlogin1',
                email:    'user@email1.com',
                password: 'password'
            });
            await userRepository.create({
                name:     'User name2',
                login:    'userlogin2',
                email:    'user@email2.com',
                password: 'password'
            });

            const users = await userRepository.getAll();

            expect(users).an('array');
            expect(users).lengthOf(2);
        });
    });

    describe('get', function() {

        it('should return user', async function() {
            const [user] = await userRepository.create({
                name:     'User name',
                login:    'userlogin',
                email:    'user@email.com',
                password: 'password'
            });

            const actual = await userRepository.get(user.id);

            expect(actual).not.equal(null);
            expect(actual.name).equal(user.name);
            expect(actual.login).equal(user.login);
            expect(actual.email).equal(user.email);
            expect(typeof actual.password).equal('undefined');
        });

        it('should return null for not exist user id', async function() {
            const actual = await userRepository.get(100500);

            expect(actual).eq(undefined);
        });
    });

    xdescribe('create', function() {

    });


    xdescribe('update', function() {

    });


    describe('delete', function() {

        it('should delete user', async function() {
            const [user] = await userRepository.create({
                name:     'User name',
                login:    'userlogin',
                email:    'user@email.com',
                password: 'password'
            });

            await userRepository.delete(user.id);

            const actual = await userRepository.get(user.id);
            expect(actual).equal(undefined);
        });

        it('should not delete other users', async function() {
            const [user] = await userRepository.create({
                name:     'User name',
                login:    'userlogin',
                email:    'user@email.com',
                password: 'password'
            });

            await userRepository.delete(-1);

            const actual = await userRepository.get(user.id);
            expect(actual).not.equal(undefined);
        });
    });
});
