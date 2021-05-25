const mongoose = require('mongoose');
const config = require('../config');

const uri = `mongodb://${config.mgHost}:${config.mgPort}/${config.mgDatabase}`;
mongoose
    .connect(uri, config.options)
    .then(() => {
        // Seed patients and orders
        require('../models/seeder');
        /*eslint-disable*/
        console.log('MongoDB connection successful!');
    })
    .catch((err) => {
        /*eslint-disable*/
        console.log('Fail to create MongoDB connection!', err.message);
    });
