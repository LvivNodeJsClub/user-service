const USERS = 'Users';
const FIELD = ['id', 'name', 'login', 'email'];

class UserRepository {

    constructor(knex) {
        this.knex = knex;
    }

    getAll() {
        return this.knex.select(FIELD).from(USERS);
    }

    get(id) {
        return this.knex.first(FIELD).from(USERS).where({id});
    }

    create(user) {
        return this.knex.insert(user, FIELD).into(USERS);
    }

    update(id, user) {
        return this.knex.update(user, FIELD).into(USERS).where({id});
    }

    delete(id) {
        return this.knex.delete().from(USERS).where({id: +id});
    }

    deleteAll() {
        return this.knex.delete().from(USERS);
    }
}

module.exports = UserRepository;
