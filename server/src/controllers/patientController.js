const AppRes = require('../utils/appResponse');
const AppErr = require('../utils/appError');
const patientService = require('../services/patientService');
const patientController = {
    // getPatientById: async (req, res) => {
    //     const { id } = req.params;
    //     const data = await patientService.getPatientById(id);
    //     return res.status(data.code).json(data);
    // },
    getPatients: async (req, res) => {
        const data = await patientService.getPatients();

        return res.status(data.code).json(data);
    },
};

module.exports = patientController;
