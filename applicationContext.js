const knex = require('database/knex');

const UserRepository = require('domain/user/userRepository');
const UserService    = require('domain/user/userService');
const UserController = require('domain/user/userController');
const UserValidation = require('domain/user/userValidation');

const GroupRepository = require('domain/group/groupRepository');
const GroupService    = require('domain/group/groupService');
const GroupController = require('domain/group/groupController');
const GroupValidation = require('domain/group/groupValidation');

class ApplicationContext {

    constructor() {
        const userRepository = new UserRepository(knex);
        const userService    = new UserService(userRepository);
        const userController = new UserController(userService);
        const userValidation = new UserValidation();

        this.userController = userController;
        this.userValidation = userValidation;

        const groupRepository = new GroupRepository(knex);
        const groupService    = new GroupService(groupRepository);
        const groupController = new GroupController(groupService);
        const groupValidation = new GroupValidation();

        this.groupController = groupController;
        this.groupValidation = groupValidation;
    }
}

module.exports = ApplicationContext;
