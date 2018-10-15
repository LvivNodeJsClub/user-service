import Knex = require("knex");

const GROUPS = 'Groups';
const FIELD = ['id', 'name', 'admin'];

interface Group {
}

export default class GroupRepository {

    constructor(private knex: Knex) {
    }

    getAll() {
        return this.knex.select(FIELD).from(GROUPS);
    }

    get(id: number) {
        return this.knex.first(FIELD).from(GROUPS).where({id});
    }

    create(group: Group) {
        return this.knex.insert(group, FIELD).into(GROUPS);
    }

    update(id: number, group: Group) {
        return this.knex.update(group, FIELD).into(GROUPS).where({id});
    }

    delete(id: number) {
        return this.knex.delete().from(GROUPS).where({id: +id});
    }

    deleteAll() {
        return this.knex.delete().from(GROUPS);
    }
}

module.exports = GroupRepository;
