import {SchemaLike} from "joi";

const Joi = require('joi');

const joiValidate = function (body: any, schema: SchemaLike, Error: any) {
    const {error, value} = Joi.validate(body, schema);

    if (error) {
        const message = error.details[0].message;
        throw new Error(message);
    }
    return value;
};
export default joiValidate;
module.exports = joiValidate;