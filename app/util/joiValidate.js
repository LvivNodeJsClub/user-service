const Joi = require('joi');

module.exports = function(body, schema, Error) {
    const {error, value} = Joi.validate(body, schema);

    if (error) {
        const message = error.details[0].message;
        throw new Error(message);
    }
    return value;
};