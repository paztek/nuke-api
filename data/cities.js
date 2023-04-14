const crypto = require('crypto');
module.exports = [
    {
        id: 1,
        name: 'Nantes',
        location: {
            lat: 47.2180556,
            lng: -1.5527777777777778,
        },
        casualtiesRange: [320, 656],
        code: generateRandomCode(),
        status: 'Still not nuked',
        casualties: 0,
    },
    {
        id: 2,
        name: 'Paris',
        location: {
            lat: 48.8566667,
            lng: 2.3519444444444444,
        },
        casualtiesRange: [2145, 10858],
        code: generateRandomCode(),
        status: 'Still not nuked',
        casualties: 0,
    },
];

function generateRandomCode() {
    return crypto.randomBytes(32).toString('hex');
}
