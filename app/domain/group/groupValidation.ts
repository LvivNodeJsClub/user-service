import {NextFunction, Request, Response} from "express";
import {create, update} from "./groupSchema";

import joiValidate from "../../util/joiValidate";

import BedRequestError from "../../error/badRequestError";

export default class GroupValidation {

    async createValidator(request: Request, response: Response, next: NextFunction) {
        await joiValidate(request.body, create, BedRequestError);

        next();
    }

    async updateValidator(request: Request, response: Response, next: NextFunction) {
        await joiValidate(request.body, update, BedRequestError);

        next();
    }
}

module.exports = GroupValidation;
