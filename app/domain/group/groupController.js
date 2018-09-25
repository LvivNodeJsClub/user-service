const HttpStatus = require('http-status-codes');

class GroupController {
    constructor(groupService) {
        this.groupService = groupService
    }

    async getAll(request, response) {
        const users = await this.groupService.getAll();
        response.status(HttpStatus.OK).json(users);
    }

    async get(request, response) {
        const user = await this.groupService.get(request.params.id);
        response.status(HttpStatus.OK).json(user);
    }

    async create(request, response) {
        const user = await this.groupService.create(request.body);
        response.status(HttpStatus.CREATED).json(user);
    }

    async update(request, response) {
        const user = await this.groupService.update(request.params.id, request.body);
        response.status(HttpStatus.OK).json(user);
    }

    async delete(request, response) {
        await this.groupService.delete(request.params.id);
        response.sendStatus(HttpStatus.NO_CONTENT);
    }
}

module.exports = GroupController;
