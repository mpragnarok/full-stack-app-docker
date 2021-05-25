const express = require('express');

const router = express.Router();

const orderController = require('../controllers/orderController');
const { validateRequest } = require('../middleware/validate');
const validateSchema = require('../validate/validateSchema');

router.get('/:patientId', validateRequest(validateSchema.getOrdersByPatientId), orderController.getOrdersByPatientId);
router.post(
    '/:patientId',
    validateRequest(validateSchema.addOrderWithPatientId),
    orderController.addOrderWithPatientId,
);
router.put('/:id', validateRequest(validateSchema.updateOrder), orderController.updateOrder);
module.exports = router;
