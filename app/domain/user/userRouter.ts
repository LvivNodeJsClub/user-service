import {UserValidation} from "./userValidation";
import {UserController} from "./userController";

const wrapAsync = require('app/util/wrapAsync');

const express = require('express');

export class UserRouter extends express.Router {

    constructor(userValidation: UserValidation, userController: UserController) {
        super();

        const createUserValidator = wrapAsync((request: any, response: any, next: any) => userValidation.createValidator(request, response, next));
        const updateUserValidator = wrapAsync((request: any, response: any, next: any) => userValidation.updateValidator(request, response, next));

        const getUsers = wrapAsync((request: any, response: any) => userController.getAll(request, response));
        const getUser = wrapAsync((request: any, response: any) => userController.get(request, response));
        const createUser = wrapAsync((request: any, response: any) => userController.create(request, response));
        const updateUser = wrapAsync((request: any, response: any) => userController.update(request, response));
        const deleteUser = wrapAsync((request: any, response: any) => userController.delete(request, response));

        this.get('/', getUsers);
        this.get('/:id', getUser);
        this.post('/', createUserValidator, createUser);
        this.put('/:id', updateUserValidator, updateUser);
        this.delete('/:id', deleteUser);
    }
}

module.exports = UserRouter;
