const Joi = require('joi');

const vars = require('./validateVars');

module.exports = {
    // Patient API
    getPatientById: Joi.object({
        params: Joi.object({ id: vars.paramsId.required() }),
        query: Joi.object({
            page: vars.strNumber,
            limit: vars.strNumber,
            sortBy: vars.str.valid('asc', 'desc'),
        }).optional(),
    }).unknown(true),
    // Order API
    getOrdersByPatientId: Joi.object({
        params: Joi.object({ patientId: vars.paramsId.required() }),
    }).unknown(true),
    addOrderWithPatientId: Joi.object({
        params: Joi.object({ patientId: vars.paramsId.required() }),
        body: vars.order,
    }).unknown(true),
    updateOrder: Joi.object({
        params: Joi.object({ id: vars.paramsId.required() }),
        body: vars.order,
    }).unknown(true),
};
