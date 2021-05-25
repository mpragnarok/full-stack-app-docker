const { Order } = require('../models');
const AppRes = require('../utils/appResponse');
const AppErr = require('../utils/appError');
const patientService = require('./patientService');
const orderService = {
    /**
     * @typedef Order
     * @property {string} [_id] The Object id of order
     * @property {string} message The order message from the doctor
     * @property {Date} [createdAt] The create date of order
     * @property {Date} [updatedAt] The update date of order
     *
     */

    /**
     *
     * @param {string} patientId  The Object id of Patient
     * @param {Order} order The order message
     * @return {AppErr|AppRes}
     * @return {Order} AppRes.data
     */
    addOrderWithPatientId: async (patientId, order) => {
        const newOrder = new Order({ ...order });
        try {
            await newOrder.save();
        } catch (err) {
            return new AppErr(`Add an Order with PatientId: ${err.message}`, 500);
        }
        try {
            await patientService.addPatientRefOrders(patientId, newOrder._id);
        } catch (err) {
            return new AppErr(`Add an Order with PatientId: ${err.message}`, 500);
        }
        return new AppRes('Add an order with Patient id successfully', newOrder, 201);
    },
    /**
     * @module updateOrder
     * @function
     * @param {string} id The Object id of order
     * @param {Order} order The order message
     * @return {AppErr|AppRes}
     * @return {Order} AppRes.data
     */
    updateOrder: async (id, order) => {
        const { message } = order;
        try {
            await Order.findByIdAndUpdate(id, { message }, { new: true });
            return new AppRes('Update order successfully', null, 200);
        } catch (err) {
            return new AppErr(`Update Order: ${err.message}`, 500);
        }
    },
};

module.exports = orderService;
