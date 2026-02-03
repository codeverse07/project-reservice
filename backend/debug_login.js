const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./src/models/User');

dotenv.config();

const testUser = async () => {
    try {
        console.log('Connecting to DB...');
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected.');

        const email = 'debug_test_user@example.com';
        const password = 'password123';

        // 1. Clean up existing test user
        await User.deleteOne({ email });
        console.log('Cleaned up existing test user.');

        // 2. Create new user via Model
        console.log('Creating user...');
        const user = await User.create({
            name: 'Debug User',
            email: email,
            password: password,
            passwordConfirm: password, // Important if validation requires it
            phone: '1234567890'
        });
        console.log('User created:', user.email);

        // 3. Retrieve user and check password
        console.log('Retrieving user for login check...');
        const foundUser = await User.findOne({ email }).select('+password');

        if (!foundUser) {
            console.error('User not found!');
            process.exit(1);
        }

        console.log('Checking password...');
        const isMatch = await foundUser.correctPassword(password, foundUser.password);

        if (isMatch) {
            console.log('SUCCESS: Password matches!');
        } else {
            console.log('FAILURE: Password does NOT match.');
        }

    } catch (err) {
        console.error('Error:', err);
    } finally {
        await mongoose.disconnect();
    }
};

testUser();
