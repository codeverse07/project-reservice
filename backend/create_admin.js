const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./src/models/User');

dotenv.config();

const createAdmin = async () => {
    try {
        console.log('Connecting to DB...');
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected.');

        const email = 'admin@reservice.com';
        const password = 'AdminPassword123!';

        // Check if exists
        let admin = await User.findOne({ email });

        if (admin) {
            console.log('Admin already exists.');
            admin.role = 'ADMIN'; // Ensure role is ADMIN
            admin.password = password; // Reset password to known value
            await admin.save();
            console.log('Admin updated with known password.');
        } else {
            console.log('Creating new Admin...');
            admin = await User.create({
                name: 'Super Admin',
                email: email,
                password: password,
                passwordConfirm: password,
                role: 'ADMIN',
                phone: '9999999999',
                address: 'Admin HQ'
            });
            console.log('Admin created successfully.');
        }

        console.log('------------------------------------------------');
        console.log('Admin Login Credentials:');
        console.log(`Email:    ${email}`);
        console.log(`Password: ${password}`);
        console.log('------------------------------------------------');

        process.exit(0);
    } catch (error) {
        console.error('Error creating admin:', error);
        process.exit(1);
    }
};

createAdmin();
