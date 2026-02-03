const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./src/models/User');

dotenv.config();

const viewUser = async () => {
    try {
        console.log('Connecting to DB...');
        await mongoose.connect(process.env.MONGO_URI);

        const email = 'demo@reservice.com';
        console.log(`\nSearching for: ${email}`);

        // Select +password to explicitly show the hidden field
        const user = await User.findOne({ email }).select('+password');

        if (user) {
            console.log('\n--- User Record in Database ---');
            console.log('Name:     ', user.name);
            console.log('Email:    ', user.email);
            console.log('Role:     ', user.role);
            console.log('Password: ', user.password);
            console.log('-------------------------------');
            console.log('(Note: The password is hashed/encrypted, not plain text)');
        } else {
            console.log('User not found.');
        }

    } catch (err) {
        console.error('Error:', err);
    } finally {
        await mongoose.disconnect();
    }
};

viewUser();
