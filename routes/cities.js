const express = require('express');
const _ = require('lodash');
const router = express.Router();
const cities = require('../data/cities');
const checkMasterCode = require('../middlewares/check-master-code');
const getCity = require('../middlewares/get-city');

router.get('', checkMasterCode, function (req, res) {
    return res.json(cities);
});

router.get('/:id', checkMasterCode, getCity, function (req, res) {
    const city = _.omit(req.city, ['status', 'casualties']);
    return res.json(city);
});

router.get('/:id/status', checkMasterCode, getCity, function (req, res) {
    const city = _.pick(req.city, ['id', 'name', 'status', 'casualties']);
    return res.json(city);
});

router.post('/:id/nuke', checkMasterCode, getCity, function (req, res) {
    // Check city code
    const { code } = req.body;

    if (!code) {
        return res.status(400).json({ error: 'Missing city code' });
    }

    if (code !== req.city.code) {
        return res.status(400).json({ error: 'Invalid city code' });
    }

    const missileFlightDuration =
        parseInt(process.env.MISSILE_FLIGHT_DURATION, 10) * 1000;

    setTimeout(function () {
        // Compute casualties
        req.city.casualties =
            Math.floor(
                Math.random() *
                    (req.city.casualtiesRange[1] - req.city.casualtiesRange[0]),
            ) + req.city.casualtiesRange[0];

        // Update city status
        req.city.status = getRandomNuclearStatus();
    }, missileFlightDuration);

    return res.status(201).json({
        message: `You successfully launched a nuclear missile at the city of ${req.city.name}! Check the status of the city in a few seconds to see how many casualties you made!`,
    });
});

function getRandomNuclearStatus() {
    const statuses = [
        'Extra Crispy',
        'Kaboom Town',
        'Blasted into History',
        'Gone Fission',
        'Nuked to Oblivion',
        'Atomic City',
        'Nuclear Nightmare',
        'Nuked to the Ground',
        'Radiant Ruins',
    ];

    return statuses[Math.floor(Math.random() * statuses.length)];
}

module.exports = router;
