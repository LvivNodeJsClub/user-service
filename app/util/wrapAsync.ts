import {NextFunction, Request, Response} from "express";

const wrap = (fn: any) => {
    return (request: Request, response: Response, next: NextFunction) => {
        // Make sure to `.catch()` any errors and pass them along to the `next()`
        // middleware in the chain, in this case the error handler.
        fn(request, response, next)
            .catch(next);
    };
};

export default wrap;
module.exports = wrap;