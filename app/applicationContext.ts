import UserController from "./domain/user/userController";
import UserValidation from "./domain/user/userValidation";
import GroupController from "./domain/group/groupController";
import GroupValidation from "./domain/group/groupValidation";
import UserRepository from "./domain/user/userRepository";
import UserService from "./domain/user/userService";
import GroupRepository from "./domain/group/groupRepository";
import GroupService from "./domain/group/groupService";

const knex = require('../database/knex');

export default class ApplicationContext {
    public userController: UserController;
    public userValidation: UserValidation;
    public groupController: GroupController;
    public groupValidation: GroupValidation;

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
