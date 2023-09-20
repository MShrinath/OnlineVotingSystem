const mongoose = require('mongoose');

mongoose.connect("URL")
    .then(() => console.log("Database connection successed!"))
    .catch((err) => {
        console.log(err)
    });

const db = mongoose.connection;

module.exports = db;