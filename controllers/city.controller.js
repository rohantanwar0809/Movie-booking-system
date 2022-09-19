const City = require('../models/city.model');

class CityController {

    async getCities(req, res) {
        try {
            const cities = await City.find();
            return res.status(200).send(cities);
        } catch (error) {
            return res.status(500).send({ message: error.message });
        }
    }

    async addMovie(req, res) {
        try {
            const { city: cityId, movie, date } = req.body;
            const city = await City.findById(cityId);
            if (!city) {
                return res.status(400).send({ message: 'City not found' });
            }
            await city.addRunningMovie(movie, date);
            return res.status(200).send(city);
        } catch (error) {
            return res.status(500).send({ message: error.message });
        }
    }


}

const cityController = new CityController();

module.exports = cityController;