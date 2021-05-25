const orderService = require('../services/orderService');
const patientService = require('../services/patientService');

const orderController = {
    getOrdersByPatientId: async (req, res) => {
        const data = await patientService.getPatientById(req.params.patientId, req.query);

        return res.status(data.code).json(data);
    },
    addOrderWithPatientId: async (req, res) => {
        const data = await orderService.addOrderWithPatientId(req.params.patientId, req.body);

        return res.status(data.code).json(data);
    },
    updateOrder: async (req, res) => {
        const data = await orderService.updateOrder(req.params.id, req.body);
        return res.status(data.code).json(data);
    },
};

module.exports = orderController;
