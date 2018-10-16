import Joi from "joi";

export const update = Joi.object()
    .options({abortEarly: false})
    .keys({
        name: Joi.string().required().min(3).label('Group name'),
        admin: Joi.boolean().optional().label('Admin flag')
    }).required().label('body');

export const create = update;

module.exports = {
    create,
    update
};