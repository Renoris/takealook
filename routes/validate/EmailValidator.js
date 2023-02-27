const dns = require('dns').promises;


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
        const array = await dns.resolveMx(domain);
        return !!array[0];
    } catch (error) {
        return false;
    }
}


module.exports = {
    validateEmail
}