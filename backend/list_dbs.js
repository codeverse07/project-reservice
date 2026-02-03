const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const listDatabases = async () => {
    try {
        console.log('Connecting to DB...');
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to:', mongoose.connection.name);

        const admin = new mongoose.mongo.Admin(mongoose.connection.db);
        const result = await admin.listDatabases();

        console.log('\n--- Available Databases ---');
        result.databases.forEach(db => {
            console.log(` - ${db.name} \t(${Math.round(db.sizeOnDisk / 1024)} KB)`);
        });
        console.log('---------------------------');

    } catch (err) {
        console.error('Error:', err);
    } finally {
        await mongoose.disconnect();
    }
};

listDatabases();
