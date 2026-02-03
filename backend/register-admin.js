const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./src/models/User');

dotenv.config();

const registerAdmin = async (email, password, name) => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log(`User ${email} already exists. Promoting to ADMIN...`);
            existingUser.role = 'ADMIN';
            existingUser.isActive = true;
            if (password) {
                existingUser.password = password;
                existingUser.passwordConfirm = password;
            }
            await existingUser.save();
            console.log('User promoted/updated successfully');
        } else {
            console.log(`Creating new Admin: ${email}`);
            const newAdmin = await User.create({
                name: name || 'System Admin',
                email: email,
                password: password || 'AdminPassword123!',
                passwordConfirm: password || 'AdminPassword123!',
                role: 'ADMIN',
                isActive: true
            });
            console.log('Admin created successfully');
        }

        process.exit(0);
    } catch (err) {
        console.error('Error registering admin:', err);
        process.exit(1);
    }
};

const email = process.argv[2] || 'owner@reservice.com';
const password = process.argv[3] || 'AdminPassword123!';
const name = process.argv[4] || 'Admin Owner';

registerAdmin(email, password, name);
