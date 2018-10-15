import NotFoundError from "../error/notFoundError";
import BedRequestError from "../error/badRequestError";
import {NextFunction, Request, Response} from "express";

const HttpStatus = require('http-status-codes');

const errorHandler = function (error: Error, request: Request, response: Response, next: NextFunction) {
    if (
        (error instanceof BedRequestError) ||
        (error instanceof NotFoundError)
    ) {
        response.status(error.status).json({error: error.message});
    } else if (
        (error instanceof Error) &&
        (
            // @ts-ignore
            typeof error.constraint !== 'undefined')
    ) {
        // @ts-ignore
        response.status(HttpStatus.CONFLICT).json({error: error.detail});
    } else {
        next();
    }
};

export default errorHandler;
module.exports = errorHandler;