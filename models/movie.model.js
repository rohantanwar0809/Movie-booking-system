const mongoose = require("mongoose")


const movieSchema = new mongoose.Schema({
    name: String,
    type: { type: String, enum: ['comedy', 'action', 'drama'] },
});

movieSchema.pre("find", function () {
    this.select("-__v");
})

const Movie = mongoose.model('Movie', movieSchema);

const prefillMovies = async () => {
    const movies = await Movie.find();
    if (movies.length === 0) {
        const movies = [
            { name: 'The Shawshank Redemption', type: 'drama' },
            { name: 'The Godfather', type: 'drama' },
            { name: 'The Godfather: Part II', type: 'drama' },
            { name: 'The Dark Knight', type: 'action' },
            { name: "The Lord of the Rings: The Return of the King", type: "action" },
            { name: "Pulp Fiction", type: "comedy" },
        ]
        await Movie.insertMany(movies);
    }
}

prefillMovies();

module.exports = Movie