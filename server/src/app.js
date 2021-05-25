const express = require('express');
require('dotenv').config();
require('./db/connect');

const AppError = require('./utils/appError');

const app = express();
const cors = require('cors');
const server = require('http').createServer(app);
const port = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// listen port
server.listen(port, () => {
    /*eslint-disable*/
    console.log(`Jubo Server backend is listening on port: ${port}`);
});

// routes
require('./routes/v1.0')(app);

app.use((req, res, next) => {
    const error = new AppError(`Could not find this route(${req.originalUrl}).`, -404);
    console.log(new Date(), `Could not find this route(${req.originalUrl}).`);
    res.status(404).json(error);
    throw error.message;
});
