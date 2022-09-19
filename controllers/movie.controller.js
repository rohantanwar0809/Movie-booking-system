const Movie = require("../models/movie.model");
const City = require("../models/city.model");

class MovieController {

    async getMovies(req, res) {
        try {
            const movies = await Movie.find();
            return res.status(200).send(movies);
        } catch (error) {
            return res.status(500).send({ message: error.message });
        }
    }

    async getMovie(req, res) {
        if (!req.params.id) {
            return res.status(400).send({ message: 'Invalid request' });
        }

        try {
            const movie = await Movie.findById(req.params.id);
            return res.status(200).send(movie);
        } catch (error) {
            return res.status(500).send({ message: error.message });
        }
    }

    async filterMovies(req, res) {
        if (!req.body) {
            return res.status(400).send({ message: 'Invalid request' });
        }

        try {
            const movies = await Movie.find(req.body);
            return res.status(200).send(movies);
        } catch (error) {
            return res.status(500).send({ message: error.message });
        }

    }

    async getMoviesByCity(req, res) {
        if (!req.params.id) {
            return res.status(400).send({ message: 'Invalid request' });
        }

        try {
            const movies = await City.find({ _id: req.params.id }).populate(
                {
                    path: 'runningMovies',
                    populate: {
                        path: 'movie'
                    }
                });
            return res.status(200).send(movies);
        } catch (error) {
            return res.status(500).send({ message: error.message });
        }
    }

    async getCityByMovie(req, res) {
        if (!req.params.id) {
            return res.status(400).send({ message: 'Invalid request' });
        }

        try {
            const cities = await City.find({ RunningMovies: req.params.id }).populate('RunningMovies');
            return res.status(200).send(cities);
        } catch (error) {
            return res.status(500).send({ message: error.message });
        }
    }
}

const movieController = new MovieController();

module.exports = movieController;