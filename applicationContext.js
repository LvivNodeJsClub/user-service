const knex = require('database/knex');

const UserRepository = require('domain/user/userRepository');
const UserService    = require('domain/user/userService');
const UserController = require('domain/user/userController');
const UserValidation = require('domain/user/userValidation');

class ApplicationContext {

    constructor() {
        const userRepository = new UserRepository(knex);
        const userService    = new UserService(userRepository);
        const userController = new UserController(userService);
        const userValidation = new UserValidation();

        this.userController = userController;
        this.userValidation = userValidation;
    }
}

module.exports = ApplicationContext;