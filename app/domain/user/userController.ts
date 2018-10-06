import {UserService} from "./userService";

const HttpStatus = require('http-status-codes');

export class UserController {

    constructor(private userService: UserService) {
    }

    async getAll(request: any, response: any) {
        const users = await this.userService.getAll();
        response.status(HttpStatus.OK).json(users);
    }

    async get(request: any, response: any) {
        const user = await this.userService.get(request.params.id);
        response.status(HttpStatus.OK).json(user);
    }

    async create(request: any, response: any) {
        const user = await this.userService.create(request.body);
        response.status(HttpStatus.CREATED).json(user);
    }

    async update(request: any, response: any) {
        const user = await this.userService.update(request.params.id, request.body);
        response.status(HttpStatus.OK).json(user);
    }

    async delete(request: any, response: any) {
        await this.userService.delete(request.params.id);
        response.sendStatus(HttpStatus.NO_CONTENT);
    }
}

module.exports = UserController;