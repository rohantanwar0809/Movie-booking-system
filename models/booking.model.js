const mongoose = require('mongoose');
const Seat = require('./seat.model');

const bookingSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    city: { type: mongoose.Schema.Types.ObjectId, ref: 'City' },
    movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie' },
    time: { type: String, enum: ['12pm', '3pm', '6pm'] },
    date: Date,
    seat: Number,
})
bookingSchema.pre("find", function () {
    this.select("-__v");
})

bookingSchema.pre("save", async function () {
    const seat = await Seat.findOne({ city: this.city, movie: this.movie, time: this.time, date: this.date });
    if (!seat) {
        const s = new Seat({ city: this.city, movie: this.movie, time: this.time, date: this.date, seatsBooked: this.seat || 1 });
        await s.save();
    }
    else {
        seat.seatsBooked = seat.seatsBooked + (this.seat || 1);
        await seat.save();
    }

})

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;