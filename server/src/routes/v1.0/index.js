const orderApi = require('../orderApi');
const patientApi = require('../patientApi');
module.exports = (app) => {
    app.use('/v1/patients', patientApi);
    app.use('/v1/orders', orderApi);
};
