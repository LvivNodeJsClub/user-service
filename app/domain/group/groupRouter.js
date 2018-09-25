const wrapAsync = require('app/util/wrapAsync');

const express = require('express');

class GroupRouter extends express.Router {

    constructor(userValidation, userController) {
        super();

        //FIXME see baind
        const createUserValidator = wrapAsync((request, response, next) => userValidation.createValidator(request, response, next));
        const updateUserValidator = wrapAsync((request, response, next) => userValidation.updateValidator(request, response, next));

        const getUsers   = wrapAsync((request, response) => userController.getAll(request, response));
        const getUser    = wrapAsync((request, response) => userController.get(request, response));
        const createUser = wrapAsync((request, response) => userController.create(request, response));
        const updateUser = wrapAsync((request, response) => userController.update(request, response));
        const deleteUser = wrapAsync((request, response) => userController.delete(request, response));

        this.get('/', getUsers);
        this.get('/:id', getUser);
        this.post('/', createUserValidator, createUser);
        this.put('/:id', updateUserValidator, updateUser);
        this.delete('/:id', deleteUser);
    }
}

module.exports = GroupRouter;