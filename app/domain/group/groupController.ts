import GroupService from "./groupService";
import {Request, Response} from "express";

const HttpStatus = require('http-status-codes');

export default class GroupController {
    constructor(private groupService: GroupService) {
    }

    async getAll(request: Request, response: Response) {
        const users = await this.groupService.getAll();
        response.status(HttpStatus.OK).json(users);
    }

    async get(request: Request, response: Response) {
        const user = await this.groupService.get(request.params.id);
        response.status(HttpStatus.OK).json(user);
    }

    async create(request: Request, response: Response) {
        const user = await this.groupService.create(request.body);
        response.status(HttpStatus.CREATED).json(user);
    }

    async update(request: Request, response: Response) {
        const user = await this.groupService.update(request.params.id, request.body);
        response.status(HttpStatus.OK).json(user);
    }

    async delete(request: Request, response: Response) {
        await this.groupService.delete(request.params.id);
        response.sendStatus(HttpStatus.NO_CONTENT);
    }
}

module.exports = GroupController;
