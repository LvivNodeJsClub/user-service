const knex = require('../database/knex');

const UserRepository = require('app/domain/user/userRepository');
const UserService    = require('app/domain/user/userService');
const UserController = require('app/domain/user/userController');
const UserValidation = require('app/domain/user/userValidation');

const GroupRepository = require('app/domain/group/groupRepository');
const GroupService    = require('app/domain/group/groupService');
const GroupController = require('app/domain/group/groupController');
const GroupValidation = require('app/domain/group/groupValidation');

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
