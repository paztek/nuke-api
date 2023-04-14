const crypto = require('crypto');

const originalMasterCode = process.env.MASTER_CODE;

const salt = crypto.randomBytes(128).toString('base64');

module.exports = crypto
    .createHash('sha256')
    .update(originalMasterCode + salt)
    .digest('hex');
