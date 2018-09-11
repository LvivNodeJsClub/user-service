require('rootpath')();

const expect     = require('chai').expect;
const supertest  = require('supertest');
const HttpStatus = require('http-status-codes');
const knex       = require("database/knex");

const application    = require('application');
const UserRepository = require('domain/user/userRepository');

describe('UserRouter', function() {

    let request;
    let userRepository;

    before(function() {
        request        = supertest(application);
        userRepository = new UserRepository(knex);
    });

    before(async function() {
        const users = await userRepository.getAll();
        users.forEach(async user => await userRepository.delete(user.id));
    });

    after(function() {
        knex.destroy();
    });

    describe('getAll', function() {

        before(async function() {
            await userRepository.create({name: 'User name 1'});
            await userRepository.create({name: 'User name 2'});
        });

        it('should return all users', async function() {
            const response = await request
            .get(`/users`)
            .expect('Content-Type', /json/)
            .expect(HttpStatus.OK);

            expect(response.body).an('array');
            expect(response.body).lengthOf(2);
        });
    });

    describe('get', function() {
        let user;

        before(async function() {
            [user] = await userRepository.create({name: 'User name'});
        });

        it('should return user', async function() {
            const response = await request
            .get(`/users/${user.id}`)
            .expect('Content-Type', /json/)
            .expect(HttpStatus.OK);

            expect(response.body.name).equal(user.name);
        });

        it('should not return not existing user', async function() {
            const response = await request
            .get('/users/100500')
            .expect('Content-Type', /json/)
            .expect(HttpStatus.NOT_FOUND);

            expect(response.body.error).equal('No user 100500');
        });
    });

    xdescribe('create', function() {

        it('should create user', async function() {

        });
    });


    xdescribe('update', function() {

        it('should update user', async function() {

        });

        it('should not update user id', async function() {
        });
    });


    describe('delete', function() {

        let user;

        before(async function() {
            [user] = await userRepository.create({name: 'User name'});
        });

        it('should delete user', async function() {
            const response = await request
            .delete(`/users/${user.id}`)
            .expect(HttpStatus.NO_CONTENT);

            expect(response.body).empty;
        });

        it('should not delete no-existing user', async function() {
            const response = await request
            .delete('/users/100500')
            .expect('Content-Type', /json/)
            .expect(HttpStatus.NOT_FOUND);

            expect(response.body.error).equal('No user 100500');
        });
    });
});