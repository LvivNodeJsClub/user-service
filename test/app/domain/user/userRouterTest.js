const expect     = require('chai').expect;
const supertest  = require('supertest');
const HttpStatus = require('http-status-codes');
const knex       = require("database/knex");

const application    = require('app/application');
const UserRepository = require('app/domain/user/userRepository');

describe('UserRouter', function() {

    let request;
    let userRepository;

    before(function() {
        request        = supertest(application);
        userRepository = new UserRepository(knex);
    });

    beforeEach(async function() {
        return userRepository.deleteAll()
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

            const response = await request
            .get(`/users`)
            .expect('Content-Type', /json/)
            .expect(HttpStatus.OK);

            expect(response.body).an('array');
            expect(response.body).lengthOf(2);
            expect(response.body[0].password).equal(undefined);
            expect(response.body[1].password).equal(undefined);
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

            const response = await request
            .get(`/users/${user.id}`)
            .expect('Content-Type', /json/)
            .expect(HttpStatus.OK);

            expect(response.body.name).equal(user.name);
            expect(response.body.password).equal(undefined);
        });

        it('should not return not existing user', async function() {
            const response = await request
            .get('/users/100500')
            .expect('Content-Type', /json/)
            .expect(HttpStatus.NOT_FOUND);

            expect(response.body.error).equal('No user 100500');
        });
    });

    describe('create', function() {

        it('should create user', async function() {
            const response = await request
            .post('/users')
            .send({
                name:            'User name',
                login:           'userlogin',
                email:           'user@email.com',
                password:        'password',
                confirmPassword: 'password'
            })
            .expect('Content-Type', /json/)
            .expect(HttpStatus.CREATED);

            expect(response.body.error).equal(undefined);

            let [actual] = response.body;
            expect(actual.name).equal('User name');
            expect(actual.login).equal('userlogin');
            expect(actual.email).equal('user@email.com');
            expect(typeof response.body.password).equal('undefined');

            const user = await userRepository.get(actual.id);
            expect(user).not.equal(undefined);
        });

        it('should not create user without name', async function() {
            const response = await request
            .post('/users')
            .expect('Content-Type', /json/)
            .expect(HttpStatus.BAD_REQUEST);

            expect(response.body.error).equal('"User name" is required');

            const users = await userRepository.getAll();
            expect(users).an('array');
            expect(users).lengthOf(0);
        });

        it('should not create user with short name', async function() {
            const response = await request
            .post('/users')
            .send({name: 'Un'})
            .expect('Content-Type', /json/)
            .expect(HttpStatus.BAD_REQUEST);

            expect(response.body.error).equal('"User name" length must be at least 3 characters long');

            const users = await userRepository.getAll();
            expect(users).an('array');
            expect(users).lengthOf(0);
        });

        it('should not create user with existing email', async function() {
            await userRepository.create({
                name:     'User name 1',
                login:    'userlogin1',
                email:    'user@email.com',
                password: 'password'
            });

            const response = await request
            .post('/users')
            .send({
                name:            'User name 2',
                login:           'userlogin2',
                email:           'user@email.com',
                password:        'password',
                confirmPassword: 'password'
            })
            .expect('Content-Type', /json/)
            .expect(HttpStatus.CONFLICT);

            expect(response.body.error).equal('Key (email)=(user@email.com) already exists.');

            const users = await userRepository.getAll();
            expect(users).an('array');
            expect(users).lengthOf(1);
        });

        it('should not create user with existing login', async function() {
            await userRepository.create({
                name:     'User name 1',
                login:    'userlogin',
                email:    'user@email1.com',
                password: 'password'
            });

            const response = await request
            .post('/users')
            .send({
                name:            'User name 2',
                login:           'userlogin',
                email:           'user@email2.com',
                password:        'password',
                confirmPassword: 'password'
            })
            .expect('Content-Type', /json/)
            .expect(HttpStatus.CONFLICT);

            expect(response.body.error).equal('Key (login)=(userlogin) already exists.');

            const users = await userRepository.getAll();
            expect(users).an('array');
            expect(users).lengthOf(1);
        });
    });


    describe('update', function() {

        it('should update user', async function() {
            const [user] = await userRepository.create({
                name:     'User name',
                login:    'userlogin',
                email:    'user@email.com',
                password: 'password'
            });

            const response = await request
            .put(`/users/${user.id}`)
            .send({
                name:            'New user name',
                login:           'newuserlogin',
                email:           'new-user@email.com',
                password:        'new-password',
                confirmPassword: 'new-password'
            })
            .expect('Content-Type', /json/)
            .expect(HttpStatus.OK);

            expect(response.body.error).equal(undefined);

            let [actual] = response.body;
            expect(actual.name).equal('New user name');
            expect(actual.login).equal('newuserlogin');
            expect(actual.email).equal('new-user@email.com');
            expect(response.body.password).equal(undefined);

            const existing = await userRepository.get(actual.id);
            expect(existing).not.equal(undefined);
        });

        it('should not update user without name', async function() {
            const [user] = await userRepository.create({
                name:     'User name',
                login:    'userlogin',
                email:    'user@email.com',
                password: 'password'
            });

            const response = await request
            .put(`/users/${user.id}`)
            .expect('Content-Type', /json/)
            .expect(HttpStatus.BAD_REQUEST);

            expect(response.body.error).equal('"User name" is required');

            const existing = await userRepository.get(user.id);
            expect(existing.name).equal('User name');
            expect(existing.login).equal('userlogin');
            expect(existing.email).equal('user@email.com');
        });

        it('should not update user with short name', async function() {
            const [user] = await userRepository.create({
                name:     'User name',
                login:    'userlogin',
                email:    'user@email.com',
                password: 'password'
            });

            const response = await request
            .put(`/users/${user.id}`)
            .send({name: 'Un'})
            .expect('Content-Type', /json/)
            .expect(HttpStatus.BAD_REQUEST);

            expect(response.body.error).equal('"User name" length must be at least 3 characters long');

            const existing = await userRepository.get(user.id);
            expect(existing.name).equal('User name');
            expect(existing.login).equal('userlogin');
            expect(existing.email).equal('user@email.com');
        });

        it('should not update user with existing email', async function() {
            const [user1] = await userRepository.create({
                name:     'User name 1',
                login:    'userlogin1',
                email:    'user@email1.com',
                password: 'password'
            });

            await userRepository.create({
                name:     'User name 2',
                login:    'userlogin2',
                email:    'user@email2.com',
                password: 'password'
            });

            const response = await request
            .put(`/users/${user1.id}`)
            .send({
                name:            'User name',
                login:           'userlogin',
                email:           'user@email2.com',
                password:        'password',
                confirmPassword: 'password'
            })
            .expect('Content-Type', /json/)
            .expect(HttpStatus.CONFLICT);

            expect(response.body.error).equal('Key (email)=(user@email2.com) already exists.');

            const existing = await userRepository.get(user1.id);
            expect(existing.name).equal('User name 1');
            expect(existing.login).equal('userlogin1');
            expect(existing.email).equal('user@email1.com');
        });

        it('should not update user with existing login', async function() {
            const [user1] = await userRepository.create({
                name:     'User name 1',
                login:    'userlogin1',
                email:    'user@email1.com',
                password: 'password'
            });

            await userRepository.create({
                name:     'User name 2',
                login:    'userlogin2',
                email:    'user@email2.com',
                password: 'password'
            });

            const response = await request
            .put(`/users/${user1.id}`)
            .send({
                name:            'User name',
                login:           'userlogin2',
                email:           'user@email.com',
                password:        'password',
                confirmPassword: 'password'
            })
            .expect('Content-Type', /json/)
            .expect(HttpStatus.CONFLICT);

            expect(response.body.error).equal('Key (login)=(userlogin2) already exists.');

            const existing = await userRepository.get(user1.id);
            expect(existing.name).equal('User name 1');
            expect(existing.login).equal('userlogin1');
            expect(existing.email).equal('user@email1.com');
        });
    });


    describe('delete', function() {

        it('should delete user', async function() {
            const [user] = await userRepository.create({
                name:     'User name',
                login:    'userlogin',
                email:    'user@email.com',
                password: 'password'
            });

            const response = await request
            .delete(`/users/${user.id}`)
            .expect(HttpStatus.NO_CONTENT);

            expect(response.body).empty;

            const actual = await userRepository.get(user.id);
            expect(actual).equals(undefined)
        });

        it('should not delete no-existing user', async function() {
            const [user] = await userRepository.create({
                name:     'User name',
                login:    'userlogin',
                email:    'user@email.com',
                password: 'password'
            });

            const response = await request
            .delete('/users/100500')
            .expect('Content-Type', /json/)
            .expect(HttpStatus.NOT_FOUND);

            expect(response.body.error).equal('No user 100500');

            const actual = await userRepository.get(user.id);
            expect(actual).not.equals(undefined)
        });
    });
});
