const masterCode = require('../data/master-code');

module.exports = function (req, res, next) {
    const header = req.headers['authorization'];

    if (!header) {
        return res.status(401).json({ error: 'Missing authorization header' });
    }

    if (!header.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Invalid authorization header' });
    }

    const code = header.substring(7);

    if (code !== masterCode) {
        return res.status(401).json({ error: 'Invalid master code' });
    }

    next();
};
