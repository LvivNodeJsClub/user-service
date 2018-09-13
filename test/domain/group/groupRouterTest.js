const expect     = require('chai').expect;
const supertest  = require('supertest');
const HttpStatus = require('http-status-codes');
const knex       = require("database/knex");

const application     = require('application');
const GroupRepository = require('domain/group/groupRepository');

describe('GroupRouter', function() {

    let request;
    let groupRepository;

    before(function() {
        request         = supertest(application);
        groupRepository = new GroupRepository(knex);
    });

    beforeEach(async function() {
        return groupRepository.deleteAll();
    });

    describe('getAll', function() {

        it('should return all groups', async function() {
            await groupRepository.create({name: 'Group name 1'});
            await groupRepository.create({name: 'Group name 2'});

            const response = await request
            .get(`/groups`)
            .expect('Content-Type', /json/)
            .expect(HttpStatus.OK);

            expect(response.body).an('array');
            expect(response.body).lengthOf(2);
        });
    });

    describe('get', function() {

        it('should return group', async function() {
            const [group] = await groupRepository.create({name: 'Group name'});

            const response = await request
            .get(`/groups/${group.id}`)
            .expect('Content-Type', /json/)
            .expect(HttpStatus.OK);

            expect(response.body.name).equal(group.name);
        });

        it('should not return not existing group', async function() {
            const response = await request
            .get('/groups/100500')
            .expect('Content-Type', /json/)
            .expect(HttpStatus.NOT_FOUND);

            expect(response.body.error).equal('No group 100500');
        });
    });

    describe('create', function() {

        it('should create group', async function() {
            const response = await request
            .post('/groups')
            .send({name: 'Group name'})
            .expect('Content-Type', /json/)
            .expect(HttpStatus.CREATED);

            expect(response.body.error).equal(undefined);

            let [actual] = response.body;
            expect(actual.name).equal('Group name');
            expect(actual.admin).equal(false);

            const group = await groupRepository.get(actual.id);
            expect(group).not.equal(undefined);
        });

        it('should create admin group', async function() {
            const response = await request
            .post('/groups')
            .send({name: 'Group name', admin: true})
            .expect('Content-Type', /json/)
            .expect(HttpStatus.CREATED);

            expect(response.body.error).equal(undefined);

            let [actual] = response.body;
            expect(actual.name).equal('Group name');
            expect(actual.admin).equal(true);

            const group = await groupRepository.get(actual.id);
            expect(group).not.equal(undefined);
        });

        it('should not create group without name', async function() {
            const response = await request
            .post('/groups')
            .expect('Content-Type', /json/)
            .expect(HttpStatus.BAD_REQUEST);

            expect(response.body.error).equal('"Group name" is required');

            const groups = await groupRepository.getAll();
            expect(groups).an('array');
            expect(groups).lengthOf(0);
        });

        it('should not create group with short name', async function() {
            const response = await request
            .post('/groups')
            .send({name: 'Gr'})
            .expect('Content-Type', /json/)
            .expect(HttpStatus.BAD_REQUEST);

            expect(response.body.error).equal('"Group name" length must be at least 3 characters long');

            const groups = await groupRepository.getAll();
            expect(groups).an('array');
            expect(groups).lengthOf(0);
        });

        it('should not create group with existing name', async function() {
            await groupRepository.create({name: 'Group name'});

            const response = await request
            .post('/groups')
            .send({name: 'Group name'})
            .expect('Content-Type', /json/)
            .expect(HttpStatus.CONFLICT);

            expect(response.body.error).equal('Key (name)=(Group name) already exists.');

            const groups = await groupRepository.getAll();
            expect(groups).an('array');
            expect(groups).lengthOf(1);
        });
    });

    describe('update', function() {

        it('should update group name', async function() {
            const [group] = await groupRepository.create({name: 'Group name'});

            const response = await request
            .put(`/groups/${group.id}`)
            .send({name: 'New group name'})
            .expect('Content-Type', /json/)
            .expect(HttpStatus.OK);


            let [actual] = response.body;
            expect(actual.name).equal('New group name');
            expect(actual.admin).equal(false);

            const existing = await groupRepository.get(actual.id);
            expect(existing).not.equal(undefined);
            expect(existing.name).equal('New group name');
        });

        it('should update to admin group', async function() {
            const [group] = await groupRepository.create({name: 'Group name'});

            const response = await request
            .put(`/groups/${group.id}`)
            .send({name: 'New group name', admin: true})
            .expect('Content-Type', /json/)
            .expect(HttpStatus.OK);


            let [actual] = response.body;
            expect(actual.name).equal('New group name');
            expect(actual.admin).equal(true);

            const existing = await groupRepository.get(actual.id);
            expect(existing).not.equal(undefined);
            expect(existing.name).equal('New group name');
            expect(existing.admin).equal(true);
        });

        it('should update to not admin group', async function() {
            const [group] = await groupRepository.create({name: 'Group name', admin: true});

            const response = await request
            .put(`/groups/${group.id}`)
            .send({name: 'New group name', admin: false})
            .expect('Content-Type', /json/)
            .expect(HttpStatus.OK);

            let [actual] = response.body;
            expect(actual.name).equal('New group name');
            expect(actual.admin).equal(false);

            const existing = await groupRepository.get(actual.id);
            expect(existing).not.equal(undefined);
            expect(existing.name).equal('New group name');
            expect(existing.admin).equal(false);
        });

        it('should not update not existing group', async function() {
            const [group1] = await groupRepository.create({name: 'Group name 1', admin: false});
            await groupRepository.create({name: 'Group name 2', admin: false});

            const response = await request
            .put(`/groups/${group1.id}`)
            .send({name: 'Group name 2'})
            .expect('Content-Type', /json/)
            .expect(HttpStatus.CONFLICT);

            expect(response.body.error).equal('Key (name)=(Group name 2) already exists.');

            const groups = await groupRepository.getAll();
            expect(groups).an('array');
            expect(groups).lengthOf(2);
        });
    });

    describe('delete', function() {

        it('should delete group', async function() {
            const [group] = await groupRepository.create({name: 'Group name'});

            const response = await request
            .delete(`/groups/${group.id}`)
            .expect(HttpStatus.NO_CONTENT);

            expect(response.body).empty;

            const actual = await groupRepository.get(group.id);
            expect(actual).equals(undefined)
        });

        it('should not delete no-existing group', async function() {
            const [group] = await groupRepository.create({name: 'Group name'});

            const response = await request
            .delete('/groups/100500')
            .expect('Content-Type', /json/)
            .expect(HttpStatus.NOT_FOUND);

            expect(response.body.error).equal('No group 100500');

            const actual = await groupRepository.get(group.id);
            expect(actual).not.equals(undefined)
        });
    });
});
