const mongoose = require('mongoose'),
    { Schema } = mongoose;

const patientSchema = new Schema({
    name: {
        type: String,
        trim: true,
        min: [2, "Patient's name is too short"],
        max: [50, "Patient's name is too long"],
        required: [true, 'A patient must have a name'],
    },
    orders: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Order',
        },
    ],
    ordersAmount: {
        type: Number,
        default: function () {
            return this.orders.length;
        },
    },
});

patientSchema.pre('save', function (next) {
    this.ordersAmount = this.orders.length;
    next();
});

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
