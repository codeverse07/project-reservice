const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            // Options to improve connectivity stability
            serverSelectionTimeoutMS: 5000,
            family: 4 // Use IPv4, skip IPv6
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        console.error("Make sure your IP is whitelisted in MongoDB Atlas and the URI is correct.");
        process.exit(1);
    }
};

module.exports = connectDB;
