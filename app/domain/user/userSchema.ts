import Joi from "joi";

export const create = Joi.object()
    .options({abortEarly: false})
    .keys({
        name: Joi.string().required().min(3).label('User name'),
        login: Joi.string().required().min(5).label('User login'),
        email: Joi.string().email().required().label('User email'),
        password: Joi.string().required().label('User password'),
        confirmPassword: Joi.string().valid(Joi.ref('password')).required().options({language: {any: {allowOnly: 'must match password'}}}).label('User confirm password')
    }).required().label('body');


export const update = Joi.object()
    .options({abortEarly: false})
    .keys({
        name: Joi.string().required().min(3).label('User name'),
        login: Joi.string().required().min(5).label('User login'),
        email: Joi.string().email().required().label('User email'),
        password: Joi.string().optional().label('User password'),
        confirmPassword: Joi.string().optional().valid(Joi.ref('password')).optional().options({language: {any: {allowOnly: 'must match password'}}}).label('User confirm password')
    }).required().label('body');

module.exports = {
    create,
    update
};