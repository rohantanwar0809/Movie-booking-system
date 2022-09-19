const mongoose = require('mongoose');

const runningMoviesSchema = new mongoose.Schema({
    movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie'
    },
    date: Date,
})

runningMoviesSchema.pre("find", function () {
    this.select("-__v");
})
const RunningMovies = mongoose.model('RunningMovies', runningMoviesSchema);

const citySchema = new mongoose.Schema({
    name: String,
    seats: Number,
    runningMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'RunningMovies' }],
});

citySchema.methods.addCity = async function (city) {
    const newCity = new City(city);
    await newCity.save();
    return newCity;
}


citySchema.methods.addRunningMovie = async function (movie, date) {
    const newRunningMovie = new RunningMovies({ movie, date });
    await newRunningMovie.save();
    this.runningMovies.push(newRunningMovie);
    await this.save();
    return this;
}

citySchema.pre("find", function () {
    this.select("-__v");
})

const City = mongoose.model('City', citySchema);


const prefillCities = async () => {
    const cities = await City.find();
    if (cities.length === 0) {
        const cities = [
            { name: 'Delhi', seats: 200 },
            { name: 'Gurugram', seats: 200 },
            { name: 'Agra', seats: 200 },
            { name: 'Bangalore', seats: 200 },
            { name: 'Pune', seats: 200 },
            { name: 'Mumbai', seats: 200 },
            { name: 'Kolkata', seats: 200 },
        ];
        await City.insertMany(cities);
    }
}


prefillCities();




module.exports = City