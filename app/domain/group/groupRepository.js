const GROUPS = 'Groups';
const FIELD  = ['id', 'name', 'admin'];

class GroupRepository {

    constructor(knex) {
        this.knex = knex;
    }

    getAll() {
        return this.knex.select(FIELD).from(GROUPS);
    }

    get(id) {
        return this.knex.first(FIELD).from(GROUPS).where({id});
    }

    create(group) {
        return this.knex.insert(group, FIELD).into(GROUPS);
    }

    update(id, group) {
        return this.knex.update(group, FIELD).into(GROUPS).where({id});
    }

    delete(id) {
        return this.knex.delete().from(GROUPS).where({id: +id});
    }

    deleteAll() {
        return this.knex.delete().from(GROUPS);
    }
}

module.exports = GroupRepository;
