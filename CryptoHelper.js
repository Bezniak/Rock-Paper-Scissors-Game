const crypto = require('crypto');

class CryptoHelper {
    static generateKey(length) {
        return crypto.randomBytes(Math.ceil(length / 8)).toString('hex');
    }

    static calculateHMAC(message, key) {
        const hmac = crypto.createHmac('sha256', key);
        hmac.update(message);
        return hmac.digest('hex');
    }
}

module.exports = CryptoHelper;