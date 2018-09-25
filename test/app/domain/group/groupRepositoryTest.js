const chai           = require('chai');
const expect         = chai.expect;
const chaiAsPromised = require("chai-as-promised");
const knex           = require('database/knex');

chai.use(chaiAsPromised);

const GroupRepository = require('app/domain/group/groupRepository');

describe('GroupRepository', function() {

    let groupRepository;

    before(function() {
        groupRepository = new GroupRepository(knex);
    });

    beforeEach(async function() {
        return groupRepository.deleteAll();
    });

    describe('getAll', function() {

        it('should return all groups', async function() {
            await groupRepository.create({name: 'Group name 1'});
            await groupRepository.create({name: 'Group name 2'});

            const groups = await groupRepository.getAll();

            expect(groups).an('array');
            expect(groups).lengthOf(2);
        });
    });

    describe('get', function() {

        it('should return group', async function() {
            const [group] = await groupRepository.create({name: 'Group name'});

            const actual = await groupRepository.get(group.id);

            expect(actual).not.equal(null);
            expect(actual.name).equal(group.name);
            expect(actual.admin).equal(false)
        });

        it('should return null for not exist group id', async function() {
            const actual = await groupRepository.get(-1);

            expect(actual).eq(undefined);
        });
    });

    describe('create', function() {

        it('should create group', async function() {
            const [group] = await groupRepository.create({name: 'Group name'});

            const actual = await groupRepository.get(group.id);
            expect(actual).not.equal(null);
            expect(actual.name).equal('Group name')
        });

        it('should create admin group', async function() {
            const [group] = await groupRepository.create({name: 'Group name', admin: true});

            const actual = await groupRepository.get(group.id);
            expect(actual).not.equal(null);
            expect(actual.name).equal('Group name')
        });

        it('should create and return group', async function() {
            const [actual] = await groupRepository.create({name: 'Group name'});

            expect(actual).not.equal(undefined);
            expect(actual.name).equal('Group name');
        });

        it('should not create group with existing name', async function() {
            await groupRepository.create({name: 'Group name'});

            const createPromise = groupRepository.create({name: 'Group name'})
            await expect(createPromise).rejectedWith('insert into "Groups" ("name") values ($1) returning "id", "name", "admin" - duplicate key value violates unique constraint "groups_name_unique"');

            const groups = await groupRepository.getAll();
            expect(groups).an('array');
            expect(groups).lengthOf(1);
        });
    });

    describe('update', function() {

        it('should update group name', async function() {
            const [group] = await groupRepository.create({name: 'Group name'});

            await groupRepository.update(group.id, {name: 'New name'});

            const actual = await groupRepository.get(group.id);
            expect(actual).not.equal(null);
            expect(actual.name).equal('New name')
        });

        it('should update to admin group', async function() {
            const [group] = await groupRepository.create({name: 'Group name'});

            await groupRepository.update(group.id, {name: 'New name', admin: true});

            const actual = await groupRepository.get(group.id);
            expect(actual.admin).equal(true);
        });

        it('should update to not admin group', async function() {
            const [group] = await groupRepository.create({name: 'Group name', admin: true});

            await groupRepository.update(group.id, {name: 'New name', admin: false});

            const actual = await groupRepository.get(group.id);
            expect(actual.admin).equal(false);
        });

        it('should update and return group', async function() {
            const [group] = await groupRepository.create({name: 'Group name'});

            const [actual] = await groupRepository.update(group.id, {name: 'New name'});

            expect(actual).not.equal(undefined);
            expect(actual.name).equal('New name');
            expect(actual.admin).equal(false);
        });
    });

    describe('delete', function() {

        it('should delete group', async function() {
            const [group] = await groupRepository.create({name: 'Group name'});

            await groupRepository.delete(group.id);


            const actual = await groupRepository.get(group.id);
            expect(actual).equal(undefined);
        });

        it('should not delete other groups', async function() {
            const [group] = await groupRepository.create({name: 'Group name'});

            await groupRepository.delete(-1);

            const actual = await groupRepository.get(group.id);
            expect(actual).not.equal(undefined);
        });
    });
});
