const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Service = require('./src/models/Service');

dotenv.config();

const checkServices = async () => {
    try {
        console.log('Connecting to DB...');
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected.');

        const count = await Service.countDocuments();
        console.log(`\n----------------------------`);
        console.log(`Total Services in DB: ${count}`);
        console.log(`----------------------------\n`);

        if (count > 0) {
            const services = await Service.find().limit(3);
            console.log('Sample Services:', services.map(s => s.name));
        }

    } catch (err) {
        console.error('Error:', err);
    } finally {
        await mongoose.disconnect();
    }
};

checkServices();
