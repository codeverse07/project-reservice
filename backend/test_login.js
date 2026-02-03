const axios = require('axios');

async function testLogin() {
    try {
        console.log('Testing login as demo@reservice.com...');
        const res = await axios.post('http://localhost:5000/api/v1/auth/login', {
            email: 'demo@reservice.com',
            password: 'Password123!'
        });
        console.log('✅ Login Successful!');
        console.log('User Role:', res.data.data.user.role);
        console.log('Token Length:', res.headers['set-cookie'] ? 'Found Cookie' : 'No Cookie');
    } catch (e) {
        console.error('❌ Login Failed:', e.response?.data?.message || e.message);
        if (e.response) {
            console.error('Status:', e.response.status);
            console.error('Data:', JSON.stringify(e.response.data));
        }
    }
}

testLogin();
