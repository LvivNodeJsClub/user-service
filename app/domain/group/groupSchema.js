const Joi = require('joi');

const update = create = Joi.object()
.options({abortEarly: false})
.keys({
    name:  Joi.string().required().min(3).label('Group name'),
    admin: Joi.boolean().optional().label('Admin flag')
}).required().label('body');

module.exports = {
    create,
    update
};