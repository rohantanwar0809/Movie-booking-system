const mongoose = require('mongoose');

const mongodbURL = process.env.MONGO_URI || "mongodb://root:root@localhost:27017/cinema?authSource=admin";

const connectDB = () => {
    const db = mongoose.connect(mongodbURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    console.log(`MongoDB Connected `)
}


module.exports = { connectDB };