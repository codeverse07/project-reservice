const axios = require('axios');

const API_URL = 'http://localhost:5000/api/v1';

async function verifyWorker() {
    const email = 'worker@reservice.com';
    const password = 'password123';

    console.log(`Verifying login for: ${email}`);

    try {
        const loginResponse = await axios.post(`${API_URL}/auth/login`, {
            email: email,
            password: password
        });

        if (loginResponse.status === 200 && loginResponse.data.token) {
            console.log('✅ Login SUCCESS!');
            console.log('   Email:    ' + email);
            console.log('   Password: ' + password);
            console.log('   Role:     ' + loginResponse.data.data.user.role);
            console.log('   Id:       ' + loginResponse.data.data.user._id);
        }
    } catch (error) {
        console.error('❌ Login FAILED');
        if (error.response) {
            console.error('   Status:', error.response.status);
            console.error('   Message:', error.response.data.message);
        } else {
            console.error('   Error:', error.message);
        }
    }
}

verifyWorker();
