require('joi');
const AppErr = require('../utils/appError');

module.exports.validateRequest = (schema) => async (req, res, next) => {
    try {
        await schema.validateAsync({
            header: req.header,
            body: req.body,
            params: req.params,
            query: req.query,
        });

        return next();
    } catch (err) {
        const details = err.details.map((item) => ({ detail: item.message }));
        console.log(new Date(), 'validateRequest -> err.details', details);
        return res.status(400).json(new AppErr(details, 400));
    }
};
