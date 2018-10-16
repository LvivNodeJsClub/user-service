import UserValidation from "./userValidation";
import UserController from "./userController";

const express = require('express');
import {Request, Response, NextFunction} from "express"

import wrapAsync from "../../util/wrapAsync";

export default class UserRouter extends express.Router {

    constructor(userValidation: UserValidation, userController: UserController) {
        super();

        const createUserValidator = wrapAsync((request: Request, response: Response, next: NextFunction) => userValidation.createValidator(request, response, next));
        const updateUserValidator = wrapAsync((request: Request, response: Response, next: NextFunction) => userValidation.updateValidator(request, response, next));

        const getUsers = wrapAsync((request: Request, response: Response) => userController.getAll(request, response));
        const getUser = wrapAsync((request: Request, response: Response) => userController.get(request, response));
        const createUser = wrapAsync((request: Request, response: Response) => userController.create(request, response));
        const updateUser = wrapAsync((request: Request, response: Response) => userController.update(request, response));
        const deleteUser = wrapAsync((request: Request, response: Response) => userController.delete(request, response));

        this.get('/', getUsers);
        this.get('/:id', getUser);
        this.post('/', createUserValidator, createUser);
        this.put('/:id', updateUserValidator, updateUser);
        this.delete('/:id', deleteUser);
    }
}

module.exports = UserRouter;
