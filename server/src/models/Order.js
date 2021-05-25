const mongoose = require('mongoose');

const { Schema } = mongoose;

const orderSchema = new Schema(
    {
        message: {
            type: String,
            trim: true,
            max: [200, 'Order message is too long'],
            required: [true, 'An Order must have a message'],
        },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
    },
);
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
