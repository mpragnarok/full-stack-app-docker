const faker = require('faker');
const { Patient, Order } = require('.');
const { randomNumber, chunckArray } = require('../utils/helpers');

async function seedOrders(number) {
    const orders = [];
    for (let j = 0; j < number; j += 1) {
        const messageLength = randomNumber(200);
        const message = faker.lorem.text(messageLength);
        orders.push({
            message,
        });
    }
    const newOrders = await Order.insertMany(orders);

    return newOrders;
}

async function seedPatients() {
    const newPatients = [];
    const orders = await seedOrders(160);
    const chunkOrders = chunckArray(orders, 40);
    for (let i = 0; i < 5; i += 1) {
        newPatients.push({
            name: faker.name.firstName(),
            orders: i === 4 ? [] : chunkOrders[i].map((item) => item._id),
        });
    }
    await Patient.insertMany(newPatients);
}
// seed patients and orders
(async function () {
    try {
        const patients = await Patient.find({}).limit(5);
        if (patients.length === 0) {
            await seedPatients();

            console.log(new Date(), 'seeder: Finish Seeded!!');
        }
    } catch (err) {
        console.log(err);
    }
}());
