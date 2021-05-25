const { Patient } = require('../models/');
const AppRes = require('../utils/appResponse');
const AppErr = require('../utils/appError');
const patientService = {
    // Type definition
    /**
     * @typedef Order
     * @property {string} _id The Object id of order
     * @property {string} message The order message from the doctor
     * @property {Date} createdAt The create date of order
     * @property {Date} updatedAt The update date of order
     *
     */
    /**
     * @typedef Patient
     * @property {string} _id The Object id of Patient
     * @property {string} name Patient name
     * @property {int} ordersAmount The amounts of Orders
     * @property {Order[] } [orders] The array of order
     *
     */

    /**
     * Get Patient data with id and with orders
     * @module getPatientById
     * @function
     * @param {string} id The Object Id of patient
     * @param {Object} filters  The filters to get pagination
     * @return {AppErr|AppRes}
     * @return {Patient} AppRes.data
     */
    getPatientById: async (id, filters) => {
        try {
            let data = {};

            if (filters.hasOwnProperty('page') && filters.hasOwnProperty('limit')) {
                const { page = 1, limit = 10, sort = 'asc' } = filters;
                const sortBy = sort === 'asc' ? 1 : -1;
                const patient = await Patient.findById(id)
                    .select('-__v')
                    .populate({
                        path: 'orders',
                        options: {
                            sort: { createdAt: sortBy },
                            skip: (page - 1) * limit,
                            limit,
                        },
                    });

                data.orders = patient.orders;
                data.currentPage = parseInt(page);
                data.totalPage = Math.ceil(patient.ordersAmount / limit);
                data.totalRows = patient.ordersAmount;
            } else {
                data = await Patient.findById(id).select('-orders -__v');
            }

            if (!data) {
                return new AppErr('Patient is not found');
            }
            return new AppRes('Get Patient By Id successfully', data);
        } catch (err) {
            return new AppErr(`getPatientById error: ${err.message}`, 500);
        }
    },

    /**
     * Get Patients data
     * @module getPatients
     * @function
     * @return {AppErr|AppRes}
     * @return {Patient[]} AppRes.data
     */
    getPatients: async () => {
        try {
            const patients = await Patient.find().select('-orders -__v');

            return new AppRes('Get Patients successfully', patients);
        } catch (err) {
            return new AppErr(`Get Patients: ${err.message}`, 500);
        }
    },
    addPatientRefOrders: async (patientId, orderId) => {
        try {
            await patientService.getPatientById(patientId);

            await Patient.findByIdAndUpdate(patientId, {
                $push: { orders: orderId },
                $inc: { ordersAmount: 1 },
            });
        } catch (err) {
            return new AppErr(`Add Patient Ref Orders: ${err.message}`, 500);
        }
    },
};

module.exports = patientService;
