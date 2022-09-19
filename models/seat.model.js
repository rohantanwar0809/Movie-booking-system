const mongoose = require('mongoose');


const seatSchema = new mongoose.Schema({
    city: { type: mongoose.Schema.Types.ObjectId, ref: 'City' },
    movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie' },
    time: { type: String, enum: ['12pm', '3pm', '6pm'] },
    date: Date,
    seatsBooked: { type: Number, default: 0, max: 200 }
});

seatSchema.virtual("availableSeats").get(function () {
    return 200 - this.seatsBooked;
})

seatSchema.pre("find", function () {
    this.select("-__v");
})

seatSchema.methods.updateSeatCount = async function (cityId, movieId, time, date, seatsBooked) {
    const seat = await Seat.findOne({ city: cityId, movie: movieId, time, date });
    if (!seat) {
        return null
    }
    seat.seatsBooked = seatsBooked;
    await seat.save();
    return seat;
}


const Seat = mongoose.model('Seat', seatSchema);


module.exports = Seat;