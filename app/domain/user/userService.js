const NotFoundError = require('app/error/notFoundError');

class UserService {

    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async getAll() {
        return this.userRepository.getAll();
    }

    async get(id) {
        const user = await this.userRepository.get(id);
        if (typeof user === 'undefined') {
            throw new NotFoundError(`No user ${id}`);
        }

        return user
    }

    async create(user) {
        // FIXME create new object
        delete user.id;
        delete user.confirmPassword;
        return this.userRepository.create(user);
    }

    async update(id, user) {
        const existingUser = await this.userRepository.get(id);
        if (typeof existingUser === 'undefined') {
            throw new NotFoundError(`No user ${id}`);
        }
        // FIXME create new object
        delete user.id;
        delete user.confirmPassword;
        return this.userRepository.update(id, user);
    }

    async delete(id) {
        const existingUser = await this.userRepository.get(id);
        if (typeof existingUser === 'undefined') {
            throw new NotFoundError(`No user ${id}`);
        }

        return this.userRepository.delete(id);
    }
}

module.exports = UserService;
