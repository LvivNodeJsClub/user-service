import {NextFunction, Request, Response} from "express";
import GroupValidation from "./groupValidation";
import GroupController from "./groupController";

const wrapAsync = require('app/util/wrapAsync');

const express = require('express');

export default class GroupRouter extends express.Router {

    constructor(userValidation: GroupValidation, userController: GroupController) {
        super();

        //FIXME see baind
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

module.exports = GroupRouter;