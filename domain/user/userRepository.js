const USERS = 'Users';

class UserRepository {

    constructor(knex) {
        this.knex = knex;
    }

    getAll() {
        return this.knex.select('*').from(USERS);
    }

    get(id) {
        return this.knex.first('*').from(USERS).where({id});
    }

    create(user) {
        return this.knex.insert(user, '*').into(USERS);
    }

    update(id, user) {
        return this.knex.update(user, '*').into(USERS).where({id});
    }

    delete(id) {
        return this.knex.delete().from(USERS).where({id: +id});
    }
}

module.exports = UserRepository;