const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
// define validation constants
// basic types
const strNumber = Joi.number();
const str = Joi.string();

// filters
const paginationFilters = Joi.object({
    page: strNumber,
    limit: strNumber,
});
// params
const paramsId = Joi.objectId();

// models
const order = Joi.object({
    message: str.max(200).required(),
});

module.exports = {
    strNumber,
    str,
    paginationFilters,
    paramsId,
    order,
};
