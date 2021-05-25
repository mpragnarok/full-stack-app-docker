// require('../../db/connect');
const { Patient, Order } = require('.');
const faker = require('faker');
const { randomNumber } = require('../utils/helpers');

// seed patients and orders
(async function () {
    try {
        const patients = await Patient.find({}).limit(5);
        if (patients.length === 0) {
            for (let i = 0; i < 5; i++) {
                const newPatient = new Patient({
                    name: faker.name.firstName(),
                });
                let orderAmount = randomNumber(50);
                for (let j = 0; j < orderAmount; j++) {
                    let messageLength = randomNumber(200);
                    let message = faker.lorem.text(messageLength);
                    const order = new Order({
                        message,
                    });

                    await order.save();

                    newPatient.orders.push(order._id);
                }
                await newPatient.save();
            }

            console.log(new Date(), 'seeder: Finish Seeded!!');
        }
    } catch (err) {
        console.log(err);
    }
})();
