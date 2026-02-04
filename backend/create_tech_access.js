const axios = require('axios');

const API_URL = 'http://localhost:5000/api/v1';

async function createTech() {
    const email = 'tech_access@reservice.com';
    const password = 'Password123!';

    console.log(`Creating/Verifying technician: ${email}`);

    // Try to login first (idempotency check)
    try {
        await axios.post(`${API_URL}/auth/login`, { email, password });
        console.log('✅ User already exists and password is correct.');
        console.log(`   Email: ${email}`);
        console.log(`   Password: ${password}`);
        return;
    } catch (e) {
        // If login fails, proceed to create
    }

    try {
        const regResponse = await axios.post(`${API_URL}/auth/register`, {
            name: 'Tech Access',
            email: email,
            password: password,
            passwordConfirm: password,
            phone: '5555555555',
            role: 'TECHNICIAN'
        });

        console.log('✅ Technician Created Successfully!');
        console.log(`   Email: ${email}`);
        console.log(`   Password: ${password}`);
        console.log(`   Role: ${regResponse.data.data.user.role}`);

    } catch (error) {
        console.error('❌ Creation FAILED');
        if (error.response) {
            console.error('   Status:', error.response.status);
            console.error('   Message:', error.response.data.message);
        } else {
            console.error('   Error:', error.message);
        }
    }
}

createTech();
