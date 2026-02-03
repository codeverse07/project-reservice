const axios = require('axios');

const API_URL = 'http://localhost:5000/api/v1';

async function createDemoUser() {
    const email = 'demo@reservice.com';
    const password = 'Password123!';

    console.log('--- Creating Demo User ---');

    try {
        // 1. Register
        console.log(`\n1. Creating user: ${email}`);
        try {
            const regResponse = await axios.post(`${API_URL}/auth/register`, {
                name: 'Demo User',
                email: email,
                password: password,
                passwordConfirm: password,
                phone: '9876543210'
            });
            console.log('✅ Registration SUCCESS');
        } catch (regError) {
            console.log('ℹ️ Registration note:', regError.response?.data?.message || regError.message);
        }

        // 2. Login verification
        console.log(`\n2. Verifying Login...`);
        const loginResponse = await axios.post(`${API_URL}/auth/login`, {
            email: email,
            password: password
        });

        if (loginResponse.status === 200 && loginResponse.data.token) {
            console.log('✅ Login VERIFIED successfully!');
            console.log('------------------------------------------------');
            console.log('   Email:    ' + email);
            console.log('   Password: ' + password);
            console.log('------------------------------------------------');

            // 3. Get Profile (Me)
            console.log(`\n3. Fetching Profile (User Me)...`);
            const token = loginResponse.data.token;
            const profileResponse = await axios.get(`${API_URL}/users/me`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log('✅ Profile Fetch SUCCESS');
            try {
                console.log('   User Name:', profileResponse.data.data.user.name);
            } catch (e) { console.log('   (User data format might differ)'); }
        }

    } catch (error) {
        console.error('❌ FAILED');
        if (error.response) {
            console.error('   Status:', error.response.status);
            console.error('   Data:', JSON.stringify(error.response.data, null, 2));
        } else {
            console.error('   Error:', error);
        }
    }
}

createDemoUser();
