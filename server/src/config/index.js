module.exports = {
    mgUser: process.env.MGUSER,
    mgHost: process.env.MGHOST || 'localhost',
    mgDatabase: process.env.MGDATABASE || 'jubo',
    mgPassword: process.env.MGPASSWORD,
    mgPort: process.env.MGPORT || 27017,
    options: {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
        // Set autoIndex to true when the first time table is created,
        // index creation can cause a significant performance impact.
        // autoIndex: true, //  Set to false when first data has been created
    },
};
