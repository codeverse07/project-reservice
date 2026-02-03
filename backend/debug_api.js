const axios = require('axios');

const API_URL = 'http://localhost:5000/api/v1';

async function testAuthFlow() {
    const email = `api_test_${Date.now()}@example.com`;
    const password = 'password123';

    console.log('--- Starting API Auth Test ---');
    console.log('Target:', API_URL);

    try {
        // 1. Register
        console.log(`\n1. Registering user: ${email}`);
        const regResponse = await axios.post(`${API_URL}/auth/register`, {
            name: 'API Test User',
            email: email,
            password: password,
            passwordConfirm: password,
            phone: '1234567890'
        });
        console.log('✅ Registration Status:', regResponse.status);
        console.log('   User ID:', regResponse.data.data.user._id);

        // 2. Login
        console.log(`\n2. Logging in...`);
        const loginResponse = await axios.post(`${API_URL}/auth/login`, {
            email: email,
            password: password
        });
        console.log('✅ Login Status:', loginResponse.status);
        console.log('   Token received:', !!loginResponse.data.token);

    } catch (error) {
        console.error('❌ FAILED');
        if (error.response) {
            console.error('   Status:', error.response.status);
            console.error('   Data:', error.response.data);
        } else {
            console.error('   Error:', error.message);
        }
    }
}

testAuthFlow();
