import {UserRepository} from "./userRepository";

const NotFoundError = require('app/error/notFoundError');

interface UserDto {
    id: number;
    confirmPassword: number;
}

export class UserService {

    constructor(private userRepository: UserRepository) {
    }

    async getAll() {
        return this.userRepository.getAll();
    }

    async get(id: number) {
        const user = await this.userRepository.get(id);
        if (typeof user === 'undefined') {
            throw new NotFoundError(`No user ${id}`);
        }

        return user
    }

    async create(user: UserDto) {
        // FIXME create new object
        delete user.id;
        delete user.confirmPassword;
        return this.userRepository.create(user);
    }

    async update(id: number, user: UserDto) {
        const existingUser = await this.userRepository.get(id);
        if (typeof existingUser === 'undefined') {
            throw new NotFoundError(`No user ${id}`);
        }
        // FIXME create new object
        delete user.id;
        delete user.confirmPassword;
        return this.userRepository.update(id, user);
    }

    async delete(id: number) {
        const existingUser = await this.userRepository.get(id);
        if (typeof existingUser === 'undefined') {
            throw new NotFoundError(`No user ${id}`);
        }

        return this.userRepository.delete(id);
    }
}

module.exports = UserService;
