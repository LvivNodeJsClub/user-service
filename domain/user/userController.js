const HttpStatus = require('http-status-codes');

class UserController {
    constructor(userService) {
        this.userService = userService
    }

    async getAll(request, response) {
        const users = await this.userService.getAll();
        response.status(HttpStatus.OK).json(users);
    }

    async get(request, response) {
        const user = await this.userService.get(request.params.id);
        response.status(HttpStatus.OK).json(user);
    }

    async create(request, response) {
        const user = await this.userService.create(request.body);
        response.status(HttpStatus.CREATED).json(user);
    }

    async update(request, response) {
        const user = await this.userService.update(request.params.id, request.body);
        response.status(HttpStatus.OK).json(user);
    }

    async delete(request, response) {
        await this.userService.delete(request.params.id);
        response.sendStatus(HttpStatus.NO_CONTENT);
    }
}

module.exports = UserController;