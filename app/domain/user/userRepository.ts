import Knex = require("knex");

const USERS = 'Users';
const FIELD = ['id', 'name', 'login', 'email'];

interface User {
}

export class UserRepository {

    constructor(private knex: Knex) {
    }

    getAll() {
        return this.knex.select(FIELD).from(USERS);
    }

    get(id: number) {
        return this.knex.first(FIELD).from(USERS).where({id});
    }

    create(user: User) {
        return this.knex.insert(user, FIELD).into(USERS);
    }

    update(id: number, user: User) {
        return this.knex.update(user, FIELD).into(USERS).where({id});
    }

    delete(id: number) {
        return this.knex.delete().from(USERS).where({id: +id});
    }

    deleteAll() {
        return this.knex.delete().from(USERS);
    }
}

module.exports = UserRepository;
