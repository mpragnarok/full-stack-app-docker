const patientService = require('../services/patientService');

const patientController = {
    getPatients: async (req, res) => {
        const data = await patientService.getPatients();

        return res.status(data.code).json(data);
    },
};

module.exports = patientController;
