const cities = require('../data/cities');

module.exports = function (req, res, next) {
    const id = parseInt(req.params.id, 10);
    const city = cities.find((city) => city.id === id);

    if (!city) {
        return res.status(404).json({ error: `City ${id} not found` });
    }

    req.city = city;
    next();
};
