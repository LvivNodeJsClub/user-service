import {UserService} from "./userService";

const HttpStatus = require('http-status-codes');

import {Request, Response} from "express"

export class UserController {

    constructor(private userService: UserService) {
    }

    async getAll(request: Request, response: Response) {
        const users = await this.userService.getAll();
        response.status(HttpStatus.OK).json(users);
    }

    async get(request: Request, response: Response) {
        const user = await this.userService.get(request.params.id);
        response.status(HttpStatus.OK).json(user);
    }

    async create(request: Request, response: Response) {
        const user = await this.userService.create(request.body);
        response.status(HttpStatus.CREATED).json(user);
    }

    async update(request: Request, response: Response) {
        const user = await this.userService.update(request.params.id, request.body);
        response.status(HttpStatus.OK).json(user);
    }

    async delete(request: Request, response: Response) {
        await this.userService.delete(request.params.id);
        response.sendStatus(HttpStatus.NO_CONTENT);
    }
}

module.exports = UserController;