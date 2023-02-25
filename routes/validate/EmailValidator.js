const dns = require('dns').promises;
const net = require('net');

async function checkSMTP(email) {
    const domain = email.split('@')[1];
    try {
        const mxRecords = await dns.resolveMx(domain);
        const smtpConnection = net.createConnection(25, mxRecords[0].exchange);
        let response = '';
        await new Promise((resolve, reject) => {
            smtpConnection.setEncoding('utf8');
            smtpConnection.on('data', data => (response += data));
            smtpConnection.on('error', reject);
            smtpConnection.on('end', resolve);
            smtpConnection.write('HELO example.com\r\n', 'utf8');
        });
        if (response.startsWith('220')) {
            smtpConnection.end();
            return true;
        }
        smtpConnection.end();
        return false;
    } catch (error) {
        return false;
    }
}

async function validateEmail(email) {
    const [user, domain] = email.split('@');
    if (!user || !domain) {
        return false;
    }
    const usernameRegex = /^[a-zA-Z0-9]+([.-][a-zA-Z0-9]+)*$/;
    if (!usernameRegex.test(user)) {
        return false;
    }
    try {
        const [mx] = await dns.resolveMx(domain);
        return await checkSMTP(mx.exchange, email);
    } catch (error) {
        console.error(error);
        return false;
    }
}

module.exports = {
    validateEmail
}